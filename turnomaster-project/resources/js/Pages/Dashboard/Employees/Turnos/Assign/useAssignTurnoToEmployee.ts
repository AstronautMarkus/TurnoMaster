import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const dayMap: Record<string, string> = {
    L: "Lunes",
    M: "Martes",
    X: "Miercoles",
    J: "Jueves",
    V: "Viernes",
    S: "Sabado",
    D: "Domingo"
};

export default function useAssignTurnoToEmployee() {
    const { id } = useParams<{ id: string }>();
    const [showModal, setShowModal] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [isActiveSwitch, setIsActiveSwitch] = useState(true);
    const [assignLoading, setAssignLoading] = useState(false);
    const [lastAssignStatus, setLastAssignStatus] = useState<"success" | "error" | null>(null);
    const [lastAssignMessage, setLastAssignMessage] = useState<string | null>(null);
    const [lastAssignErrors, setLastAssignErrors] = useState<string[] | null>(null);
    const [selectedTurnoId, setSelectedTurnoId] = useState<number | null>(null);

    const openModal = (turnoId: number) => {
        setShowModal(true);
        setSelectedTurnoId(turnoId);
        setSelectedDays([]);
        setIsActiveSwitch(true);
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTurnoId(null);
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
    };

    const toggleDay = (dayKey: string) => {
        setSelectedDays(prev =>
            prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey]
        );
    };

    const toggleIsActiveSwitch = () => setIsActiveSwitch(v => !v);

    const assignTurno = async () => {
        if (!id || !selectedTurnoId || selectedDays.length === 0) return;
        setAssignLoading(true);
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
        const token = localStorage.getItem("token");
        const days = selectedDays.map(d => dayMap[d] || d);
        try {
            const body = {
                shift_id: selectedTurnoId,
                days,
                is_active: isActiveSwitch,
                employee_id: Number(id)
            };
            const res = await axios.post("/api/turnos/shift/", body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLastAssignStatus("success");
            setLastAssignMessage(res.data.message || "Turno asignado correctamente.");
            setLastAssignErrors(null);
        } catch (err: any) {
            if (err.response && err.response.status === 422) {
                const data = err.response.data;
                setLastAssignStatus("error");
                setLastAssignMessage(data.message || "Error al asignar turno.");
                let errorList: string[] = [];
                if (data.errors && typeof data.errors === "object") {
                    for (const key in data.errors) {
                        const errs = data.errors[key];
                        if (Array.isArray(errs)) {
                            errorList.push(...errs);
                        } else if (typeof errs === "string") {
                            errorList.push(errs);
                        }
                    }
                }
                setLastAssignErrors(errorList.length > 0 ? errorList : null);
            }
        }
        setAssignLoading(false);
    };

    return {
        showModal,
        openModal,
        closeModal,
        selectedDays,
        toggleDay,
        isActiveSwitch,
        toggleIsActiveSwitch,
        assignTurno,
        assignLoading,
        lastAssignStatus,
        lastAssignMessage,
        lastAssignErrors,
        selectedTurnoId
    };
}
