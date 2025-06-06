import { useEffect } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import { DataSet } from "vis-data";

interface TurnoItem {
  shift: {
    name: string;
    description: string;
    start_time: string;
    lunch_time: string;
    end_time: string;
  };
  shift_user: {
    id: number;
    days: string[] | string;
  };
}

const useTurnoListGraph = (containerRef: React.RefObject<HTMLDivElement | null>, shifts: TurnoItem[]) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    const groups = new DataSet<{ id: string; content: string }>();
    for (const day of daysOfWeek) {
      groups.add({ id: day, content: day });
    }

    const toDateTime = (time: string): Date => {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date("2025-01-01T00:00:00");
      date.setHours(hour);
      date.setMinutes(minute);
      return date;
    };

    const items = new DataSet<{
      id: string;
      group: string;
      start: Date;
      end: Date;
      content: string;
      className?: string;
    }>();

    for (const item of shifts) {
      let days: string[] = [];
      if (Array.isArray(item.shift_user.days)) {
        days = item.shift_user.days;
      } else if (typeof item.shift_user.days === "string") {
        try {
          days = JSON.parse(item.shift_user.days);
        } catch {
          days = [item.shift_user.days];
        }
      }

      for (const day of days) {
        items.add({
          id: `${item.shift_user.id}-${day}`,
          group: day,
          start: toDateTime(item.shift.start_time),
          end: toDateTime(item.shift.end_time),
          content: item.shift.name,
          className: "item"
        });
      }
    }

    const timeline = new Timeline(containerRef.current, items, groups, {
      start: new Date("2025-01-01T06:00:00"),
      end: new Date("2025-01-01T22:00:00"),
      min: new Date("2025-01-01T06:00:00"),
      max: new Date("2025-01-01T23:00:00"),
      zoomMin: 1000 * 60 * 60,
      stack: false,
      orientation: { axis: "top" },
      margin: { item: 10 },
      groupOrder: (a, b) => daysOfWeek.indexOf(a.id) - daysOfWeek.indexOf(b.id),
    });

    return () => timeline.destroy();
  }, [containerRef, shifts]);
};

export default useTurnoListGraph;