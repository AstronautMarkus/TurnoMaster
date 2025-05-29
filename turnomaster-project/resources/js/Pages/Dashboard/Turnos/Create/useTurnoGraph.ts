import { useEffect } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

const useTurnoGraph = (form: any, chartRef: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
        if (!chartRef.current) return;

        const {
            startHour,
            startMinute,
            lunchHour,
            lunchMinute,
            endHour,
            endMinute,
            hasLunch
        } = form;

        if (!startHour || !startMinute || !endHour || !endMinute) return;
        if (hasLunch && (!lunchHour || !lunchMinute)) return;

        const startTime = new Date();
        startTime.setHours(Number(startHour));
        startTime.setMinutes(Number(startMinute));

        const endTime = new Date();
        endTime.setHours(Number(endHour));
        endTime.setMinutes(Number(endMinute));

        let items: any[] = [];

        if (hasLunch) {
            const lunchStart = new Date();
            lunchStart.setHours(Number(lunchHour));
            lunchStart.setMinutes(Number(lunchMinute));

            const lunchEnd = new Date(lunchStart.getTime() + 60 * 60 * 1000);

            items = [
                {
                    id: 1,
                    content: "Inicio laboral",
                    start: startTime,
                    end: lunchStart,
                    type: "range",
                    className: "inicio-range"
                },
                {
                    id: 2,
                    content: "Almuerzo",
                    start: lunchStart,
                    end: lunchEnd,
                    type: "range",
                    className: "lunch-range"
                },
                {
                    id: 3,
                    content: "Fin laboral",
                    start: lunchEnd,
                    end: endTime,
                    type: "range",
                    className: "fin-range"
                }
            ];
        } else {
            items = [
                {
                    id: 1,
                    content: "Jornada completa",
                    start: startTime,
                    end: endTime,
                    type: "range",
                    className: "workday-range"
                }
            ];
        }

        const options = {
            stack: false,
            showCurrentTime: false,
            min: new Date(startTime.getTime() - 60 * 60 * 1000),
            max: new Date(endTime.getTime() + 60 * 60 * 1000),
            zoomMin: 1000 * 60 * 60,
            zoomMax: 1000 * 60 * 60 * 24,
            orientation: 'top'
        };

        const timeline = new Timeline(chartRef.current, items, options);

        return () => {
            timeline.destroy();
        };
    }, [form, chartRef]);

    return `Vista previa de ${form.name || "actividad sin nombre"}`;
};

export default useTurnoGraph;
