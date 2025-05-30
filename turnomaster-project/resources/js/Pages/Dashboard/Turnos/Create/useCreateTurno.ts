import { useState } from "react";
import axios from "axios";

const useCreateTurno = (form: any, setForm: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | Record<string, string>>({});
    const [success, setSuccess] = useState("");

    const handleFieldChange = (name: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const getFieldError = (field: string) => {
        if (error && typeof error === 'object' && error[field]) {
            return error[field];
        }
        return null;
    };

    const handleValidateAndSubmit = async () => {
        setError({});
        setSuccess("");

        const {
            name,
            description,
            startHour,
            startMinute,
            lunchHour,
            lunchMinute,
            endHour,
            endMinute,
            hasLunch
        } = form;

        const errors: any = {};

        if (!name || name.trim() === "") {
            errors.name = "El nombre es obligatorio.";
        }
        if (!description || description.trim() === "") {
            errors.description = "La descripción es obligatoria.";
        }

        const validateHour = (value: string) => !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 23;
        const validateMinute = (value: string) => !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 59;


        if (startHour === "") {
            errors.startHour = "Debe ingresar la hora de inicio.";
        } else if (!validateHour(startHour)) {
            errors.startHour = "Hora de inicio inválida.";
        }
        if (startMinute === "" && startHour !== "") {
            errors.startMinute = "Debe ingresar el minuto de inicio.";
        } else if (startMinute !== "" && !validateMinute(startMinute)) {
            errors.startMinute = "Minuto de inicio inválido.";
        }


        if (hasLunch) {
            if (lunchHour === "") {
                errors.lunchHour = "Debe ingresar la hora de almuerzo.";
            } else if (!validateHour(lunchHour)) {
                errors.lunchHour = "Hora de almuerzo inválida.";
            }
            if (lunchMinute === "" && lunchHour !== "") {
                errors.lunchMinute = "Debe ingresar el minuto de almuerzo.";
            } else if (lunchMinute !== "" && !validateMinute(lunchMinute)) {
                errors.lunchMinute = "Minuto de almuerzo inválido.";
            }
        }

        if (endHour === "") {
            errors.endHour = "Debe ingresar la hora de término.";
        } else if (!validateHour(endHour)) {
            errors.endHour = "Hora de término inválida.";
        }
        if (endMinute === "" && endHour !== "") {
            errors.endMinute = "Debe ingresar el minuto de término.";
        } else if (endMinute !== "" && !validateMinute(endMinute)) {
            errors.endMinute = "Minuto de término inválido.";
        }


        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name,
                description,
                start_time: `${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')}`,
                has_lunch: hasLunch,
                end_time: `${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')}`,
                ...(hasLunch && {
                    lunch_time: `${lunchHour.padStart(2, '0')}:${lunchMinute.padStart(2, '0')}`,
                })
            };

            const response = await axios.post("/api/turnos", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });


            setSuccess(response.data?.message || "Turno creado exitosamente.");


            setForm({
                name: "",
                description: "",
                startHour: "",
                startMinute: "",
                lunchHour: "",
                lunchMinute: "",
                endHour: "",
                endMinute: "",
                hasLunch: false
            });
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Ocurrió un error al crear el turno.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        handleFieldChange,
        handleValidateAndSubmit,
        getFieldError,
    };
};

export default useCreateTurno;