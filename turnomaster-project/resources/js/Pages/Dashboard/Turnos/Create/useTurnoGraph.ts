import { useEffect } from "react";
import { Timeline, DataSet } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

type FormType = {
    name: string;
    description: string;
    startHour: string;
    startMinute: string;
    lunchHour: string;
    lunchMinute: string;
    endHour: string;
    endMinute: string;
};

function toDate(hour: number, minute: number) {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
}

function useTurnoGraph(form: FormType, chartRef: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        const container = chartRef.current;
        if (!container) return;

        container.innerHTML = "";

        const items = new DataSet<any>();
        const groups = new DataSet<any>([
            { id: 1, content: "Entrada" },
            { id: 2, content: "Almuerzo" },
            { id: 3, content: "Salida" },
        ]);

        const sHour = parseInt(form.startHour || "", 10);
        const sMin = parseInt(form.startMinute || "", 10);
        const lHour = parseInt(form.lunchHour || "", 10);
        const lMin = parseInt(form.lunchMinute || "", 10);
        const eHour = parseInt(form.endHour || "", 10);
        const eMin = parseInt(form.endMinute || "", 10);

        if (
            isNaN(sHour) || isNaN(sMin) ||
            isNaN(eHour) || isNaN(eMin)
        ) return;

        const start = toDate(sHour, sMin);
        const end = toDate(eHour, eMin);


        const inicio = sHour * 60 + sMin;
        const almuerzo = lHour * 60 + lMin;
        const fin = eHour * 60 + eMin;
        if (!isNaN(lHour) && !isNaN(lMin)) {
            if (inicio >= almuerzo || almuerzo >= fin) return;
        } else {
            if (inicio >= fin) return;
        }

        function formatHourMin(date: Date) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        if (!isNaN(lHour) && !isNaN(lMin)) {
            const lunch = toDate(lHour, lMin);
            const lunchEnd = toDate(lHour + 1, lMin);

            items.add([
                {
                    id: 1,
                    content: `${formatHourMin(start)} - ${formatHourMin(lunch)}`,
                    start,
                    end: lunch,
                    group: 1,
                    style: "background-color: #3b82f6;"
                },
                {
                    id: 2,
                    content: `${formatHourMin(lunch)} - ${formatHourMin(lunchEnd)}`,
                    start: lunch,
                    end: lunchEnd,
                    group: 2,
                    style: "background-color: #facc15;"
                },
                {
                    id: 3,
                    content: `${formatHourMin(lunchEnd)} - ${formatHourMin(end)}`,
                    start: lunchEnd,
                    end,
                    group: 3,
                    style: "background-color: #3b82f6;"
                },
            ]);
        } else {
            items.add([
                {
                    id: 1,
                    content: `${formatHourMin(start)} - ${formatHourMin(end)}`,
                    start,
                    end,
                    group: 1,
                    style: "background-color: #3b82f6;"
                }
            ]);
        }

        const options = {
            stack: false,
            groupOrder: "id",
            orientation: "top",
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date().setHours(24, 0, 0, 0),
            min: new Date().setHours(0, 0, 0, 0),
            max: new Date().setHours(24, 0, 0, 0),
            zoomMin: 1000 * 60 * 60,
            zoomMax: 1000 * 60 * 60 * 24,
            format: {
                minorLabels: {
                    hour: 'HH:mm'
                },
                majorLabels: {
                    hour: ''
                }
            }
        };

        new Timeline(container, items, groups, options);
    }, [
        form.startHour, form.startMinute,
        form.lunchHour, form.lunchMinute,
        form.endHour, form.endMinute
    ]);

    return "";
}

export default useTurnoGraph;
