import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaUserGear } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const weekDays = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
];

const EmployeesEditTurno = () => {
    const { id: user_id, shift: shift_id } = useParams<{ id: string; shift: string }>();

    const [employee, setEmployee] = useState<{ first_name: string; last_name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [activateNow, setActivateNow] = useState(false);
    const [saving, setSaving] = useState(false);
    const [turno, setTurno] = useState<{
        name: string;
        description: string;
        start_time: string;
        end_time: string;
        has_lunch: boolean;
    } | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);
        Promise.all([
            axios.get(`/api/turnos/shift/${user_id}/${shift_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`/api/employees/${user_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`/api/turnos/${shift_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ]).then(([shiftRes, empRes, turnoRes]) => {
            const shiftUser = shiftRes.data.shift_user;
            try {
                setSelectedDays(JSON.parse(shiftUser.days));
            } catch {
                setSelectedDays([]);
            }
            setActivateNow(!!shiftUser.is_active);
            setEmployee(empRes.data);
            setTurno(turnoRes.data);
            setLoading(false);
        });
    }, [user_id, shift_id]);

    const handleDayChange = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        setMessageType(null);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.put(
                `/api/turnos/shift/${user_id}/${shift_id}`,
                {
                    is_active: activateNow,
                    days: selectedDays.length === 0 ? [] : selectedDays,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setMessage(res.data.message || "Actualización exitosa.");
            setMessageType("success");
        } catch (e: any) {
            setMessage(
                e?.response?.data?.message ||
                "Ocurrió un error al actualizar el turno."
            );
            setMessageType("error");
        }
        setSaving(false);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-left mb-2 mt-4 text-gray-800 flex items-center">
                        <FiUsers className="mr-3" />
                        Editar configuración de {turno ? turno.name : "Turno"}
                    </h1>
                    <p className="text-gray-600 mb-6 text-lg flex items-center gap-2">
                        {employee
                            ? `${employee.first_name} ${employee.last_name}`
                            : "Cargando..."}
                    </p>
                </div>
            </div>

            <div className="bg-white shadow w-full overflow-x-auto mb-6">
                <div className="max-h-96 overflow-y-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">Horario de entrada</th>
                                <th className="px-4 py-3 text-left">¿Tiene Almuerzo?</th>
                                <th className="px-4 py-3 text-left">Horario de Almuerzo</th>
                                <th className="px-4 py-3 text-left">Horario de salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100 transition-colors">
                                <td className="px-4 py-2">{turno ? turno.start_time : ""}</td>
                                <td className="px-4 py-2">
                                    {turno ? (turno.has_lunch ? "Sí" : "No") : ""}
                                </td>
                                <td className="px-4 py-2">
                                    {turno && turno.has_lunch && (turno as any).lunch_time
                                        ? (turno as any).lunch_time
                                        : "N/A"}
                                </td>
                                <td className="px-4 py-2">{turno ? turno.end_time : ""}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {message && (
                <div
                    className={`mb-4 px-4 py-3 ${
                        messageType === "success"
                            ? "text-black bg-green-400"
                            : "text-red-600 bg-red-100"
                    }`}
                >
                    {message}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className="w-full sm:w-1/2 bg-white shadow p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-4">
                        Selecciona los días que aplican al turno
                    </h2>
                    {loading ? (
                        <div className="text-gray-500">Cargando...</div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2">
                                {weekDays.map((day) => (
                                    <label key={day} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                        />
                                        {day}
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center mt-6">
                                <span className="mr-3 font-semibold">Activar turno inmediatamente</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-black">No</span>
                                    <div
                                        onClick={() => setActivateNow((v) => !v)}
                                        className={`relative inline-flex h-6 w-11 items-center cursor-pointer transition-colors duration-300 ${
                                            activateNow ? "dashboard-button-secondary" : "dashboard-button"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform bg-white transition-transform duration-300 ${
                                                activateNow ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-black">Sí</span>
                                </div>
                            </div>
                            <button
                                className="mt-6 dashboard-button-secondary text-white px-4 py-2 disabled:opacity-50"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </>
                    )}
                </div>
                <div className="w-full bg-white shadow p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-4">
                        Días asignados al turno
                    </h2>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-2 hover:bg-gray-100 transition-colors">
                            <div className="font-semibold text-lg">{turno ? turno.name : ""}</div>
                            <div className="text-base text-gray-600">{turno ? turno.description : ""}</div>
                            <div className="text-sm text-gray-500">
                                {turno ? `${turno.start_time} - ${turno.end_time}` : ""}
                            </div>
                            <div className="text-sm text-gray-700 mt-2">
                                <span className="font-semibold">Estado: </span>
                                <span className={activateNow ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                    {activateNow ? "Activado" : "Desactivado"}
                                </span>
                            </div>
                            <div className="text-sm text-gray-700 mt-2">
                                <span className="font-semibold">Días: </span>
                                {selectedDays.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 mt-1">
                                        {selectedDays.map((day) => (
                                            <span
                                                key={day}
                                                className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-sm text-center"
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span>No asignado</span>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex space-x-2 justify-end mt-4">
                <Link to={`/dashboard/employees/${user_id}/shifts`} className="text-white px-4 py-2 dashboard-button transition-colors">
                    Salir
                </Link>
            </div>
        </div>
    );
};

export default EmployeesEditTurno;