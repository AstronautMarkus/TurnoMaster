import React, { useState, useRef } from "react";
import useCreateTurno from "./useCreateTurno";
import { FaPlus } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import useTurnoGraph from "./useTurnoGraph";

const CreateTurno = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        startHour: "",
        startMinute: "",
        lunchHour: "",
        lunchMinute: "",
        endHour: "",
        endMinute: "",
    });

    const onlyNumbers = (value: string) => /^[0-9]{0,2}$/.test(value);

    const {

        loading,
        error,
        success,
        handleFieldChange,
        handleValidateAndSubmit,
        getFieldError,
    } = useCreateTurno(form, setForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (
            [
                "startHour",
                "startMinute",
                "lunchHour",
                "lunchMinute",
                "endHour",
                "endMinute",
            ].includes(name)
        ) {
            if (onlyNumbers(value)) {
                handleFieldChange(name, value);
            }
        } else {
            handleFieldChange(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleValidateAndSubmit();
    };

    const chartRef = useRef(null) as unknown as React.RefObject<HTMLDivElement>;
    const turnoTitle = useTurnoGraph(form, chartRef);


const calcularHorasTrabajadas = () => {
    const { startHour, startMinute, lunchHour, lunchMinute, endHour, endMinute } = form;

    if (
        [startHour, startMinute, lunchHour, lunchMinute, endHour, endMinute].some(
            v => v === "" || isNaN(Number(v))
        )
    ) return null;

    const inicio = Number(startHour) * 60 + Number(startMinute);
    const almuerzo = Number(lunchHour) * 60 + Number(lunchMinute);
    const fin = Number(endHour) * 60 + Number(endMinute);

    if (inicio >= almuerzo || almuerzo >= fin) return "invalid";

    const duracionTotal = fin - inicio;
    const duracionAlmuerzo = 60;
    const minutosTrabajados = duracionTotal - duracionAlmuerzo;

        const secretMessages = [
        "¿Más de 16 horas? ¡Tus empleados no son robots! 🤖",
        "¡Eso es explotación laboral nivel jefe final! 😅",
        "¿Turno eterno? Recuerda que tus empleados también duermen. 💤",
        "¡Cuidado! Así solo lograrás que renuncien... o se conviertan en vampiros. 🧛‍♂️",
        "¿Buscas el récord Guinness de horas trabajadas? Tus empleados no te lo agradecerán. 🏆",
        "¡Wow! ¿Un turno o una maratón? Mejor cuida a tu equipo. ❤️",
        "Tus empleados necesitan descanso, no solo café. ☕",
        "Recuerda: empleados felices, empresa feliz. ¡No los mates de cansancio! 😉",
        "¡Eso no es un turno, es una condena! Dale un respiro a tu gente. 🌬️",
        "Ese Turno no es tan master que digamos... 😅",
        "Ni ChatGPT trabaja tanto. ¡Dale un respiro a tu equipo! 🤖"
    ];

    
    if (duracionTotal > 16 * 60) {
        return `${Math.floor(minutosTrabajados / 60)} hora${Math.floor(minutosTrabajados / 60) !== 1 ? "s" : ""}${minutosTrabajados % 60 > 0 ? ` ${minutosTrabajados % 60} minuto${minutosTrabajados % 60 !== 1 ? "s" : ""}` : ""} — ${secretMessages[Math.floor(Math.random() * secretMessages.length)]}`;
    }

    if (minutosTrabajados <= 0) return null;

    const horas = Math.floor(minutosTrabajados / 60);
    const minutos = minutosTrabajados % 60;

    return `${horas} hora${horas !== 1 ? "s" : ""}${minutos > 0 ? ` ${minutos} minuto${minutos !== 1 ? "s" : ""}` : ""}`;
};


    return (
        <div className="p-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 flex items-center gap-2">
                    <FaPlus />
                    Crear turno
                </h1>
            <div className="bg-white shadow-md w-full p-6 relative">
                <>
                    {success && (
                        <div className="p-4 mb-4 text-sm text-black bg-green-400">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-600 bg-red-100">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="max-w-1xl">
                        <div className="flex flex-col md:flex-row gap-8">

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-black">Nombre *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                    />
                                    {getFieldError("name") && (
                                        <p className="text-red-500 text-sm">{getFieldError("name")}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black">Descripción *</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                    />
                                    {getFieldError("description") && (
                                        <p className="text-red-500 text-sm">{getFieldError("description")}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-black">Hora de inicio *</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="startHour"
                                            value={form.startHour}
                                            onChange={handleChange}
                                            placeholder="HH"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            name="startMinute"
                                            value={form.startMinute}
                                            onChange={handleChange}
                                            placeholder="MM"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                    </div>
                                    {(getFieldError("startHour") || getFieldError("startMinute")) && (
                                        <p className="text-red-500 text-sm">
                                            {getFieldError("startHour") || getFieldError("startMinute")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-black">Hora de almuerzo *</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="lunchHour"
                                            value={form.lunchHour}
                                            onChange={handleChange}
                                            placeholder="HH"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            name="lunchMinute"
                                            value={form.lunchMinute}
                                            onChange={handleChange}
                                            placeholder="MM"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                    </div>
                                    {(getFieldError("lunchHour") || getFieldError("lunchMinute")) && (
                                        <p className="text-red-500 text-sm">
                                            {getFieldError("lunchHour") || getFieldError("lunchMinute")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-black">Hora de salida *</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="endHour"
                                            value={form.endHour}
                                            onChange={handleChange}
                                            placeholder="HH"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            name="endMinute"
                                            value={form.endMinute}
                                            onChange={handleChange}
                                            placeholder="MM"
                                            className="w-16 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                            maxLength={2}
                                        />
                                    </div>
                                    {(getFieldError("endHour") || getFieldError("endMinute")) && (
                                        <p className="text-red-500 text-sm">
                                            {getFieldError("endHour") && (
                                                <>
                                                    {getFieldError("endHour")}
                                                    <br />
                                                </>
                                            )}
                                            {getFieldError("endMinute") && (
                                                <>
                                                    {getFieldError("endMinute")}
                                                    <br />
                                                </>
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                                type="submit"
                                className={`mt-4 px-4 py-2 text-white ${
                                    loading
                                        ? error
                                            ? 'bg-red-600'
                                            : 'bg-gray-400'
                                        : 'dashboard-button-secondary'
                                } flex items-center justify-center`}
                                disabled={loading}
                            >
                                {!loading && !error && <FaPlus className="mr-2" />}
                                {loading ? (error ? 'Error' : 'Cargando...') : 'Crear turno'}
                        </button>
                    </form>
                </>
            </div>

            <div className="bg-white shadow-md w-full p-6 relative mt-4">
                <div className="mb-2 font-bold">Vista previa del turno</div>
                {!form.startHour || !form.startMinute || !form.lunchHour || !form.lunchMinute || !form.endHour || !form.endMinute ? (
                    <div className="text-gray-500 mb-4">
                        Para ver el gráfico, por favor rellene los campos de horario.
                    </div>
                ) : null}

                {calcularHorasTrabajadas() === "invalid" && (
                    <div className="mb-2 font-bold dashboard-text">
                        Este horario carece de lógica, por favor revise los campos.
                    </div>
                )}

                {calcularHorasTrabajadas() && calcularHorasTrabajadas() !== "invalid" && (
                    <div className="mb-2 font-bold dashboard-text">
                        Horas totales trabajadas: {calcularHorasTrabajadas()}
                    </div>
                )}
                <div className="mb-2 font-bold">{turnoTitle}</div>
                <div style={{ height: 200 }}>
                    <div ref={chartRef} style={{ height: "100px" }}></div>
                </div>
            </div>

                        <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/turnos" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>

        </div>
    );
};
export default CreateTurno;
