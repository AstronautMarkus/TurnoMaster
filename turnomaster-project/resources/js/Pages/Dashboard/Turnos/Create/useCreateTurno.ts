import axios from "axios";
import { useState } from "react";

type TurnoPayload = {
    name: string;
    description: string;
    start_time: string;
    lunch_time: string;
    end_time: string;
};

type ValidationErrors = Record<string, string[]>;

const useCreateTurno = (
    form?: {
        name: string;
        description: string;
        startHour: string;
        startMinute: string;
        lunchHour: string;
        lunchMinute: string;
        endHour: string;
        endMinute: string;
    },
    setForm?: (form: any) => void
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

    const handleFieldChange = (name: string, value: string) => {
        if (setForm && form) {
            setForm({ ...form, [name]: value });
            setFieldErrors({ ...fieldErrors, [name]: null });
        }
    };

    const validateFields = (form: any) => {
        let valid = true;
        let errors: Record<string, string | null> = {};
        const hourFields = [
            { value: form.startHour, label: "Hora de inicio", name: "startHour" },
            { value: form.lunchHour, label: "Hora de almuerzo", name: "lunchHour" },
            { value: form.endHour, label: "Hora de fin", name: "endHour" },
        ];
        const minuteFields = [
            { value: form.startMinute, label: "Minuto de inicio", name: "startMinute" },
            { value: form.lunchMinute, label: "Minuto de almuerzo", name: "lunchMinute" },
            { value: form.endMinute, label: "Minuto de fin", name: "endMinute" },
        ];
        for (const field of hourFields) {
            if (!field.value || isNaN(Number(field.value)) || Number(field.value) < 0 || Number(field.value) > 23) {
                errors[field.name] = `${field.label} debe ser un número entre 0 y 23.`;
                valid = false;
            }
        }
        for (const field of minuteFields) {
            if (!field.value || isNaN(Number(field.value)) || Number(field.value) < 0 || Number(field.value) > 59) {
                errors[field.name] = `${field.label} debe ser un número entre 0 y 59.`;
                valid = false;
            }
        }
        return { valid, errors };
    };

    const getFieldError = (field: string) => {
        if (fieldErrors[field]) return fieldErrors[field];
        if (validationErrors) {
            if (field === "name" && validationErrors.name) return validationErrors.name[0];
            if (field === "description" && validationErrors.description) return validationErrors.description[0];
            if (field === "startHour" && validationErrors.start_time) return validationErrors.start_time[0];
            if (field === "startMinute" && validationErrors.start_time) return validationErrors.start_time[0];
            if (field === "lunchHour" && validationErrors.lunch_time) return validationErrors.lunch_time[0];
            if (field === "lunchMinute" && validationErrors.lunch_time) return validationErrors.lunch_time[0];
            if (field === "endHour" && validationErrors.end_time) return validationErrors.end_time[0];
            if (field === "endMinute" && validationErrors.end_time) return validationErrors.end_time[0];
        }
        return null;
    };

    const createTurno = async (payload: TurnoPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        setValidationErrors({});
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post("/api/turnos", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess(res.data?.message || "Turno creado exitosamente.");
            setError(null);
            setValidationErrors({});
            return { ok: true, message: res.data?.message };
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setError(err.response.data?.message || "La validación ha fallado.");
                setValidationErrors(err.response.data?.errors || {});
            } else {
                setError(err?.response?.data?.message || "Error al crear el turno");
            }
            setSuccess(null);
            return { ok: false, message: err?.response?.data?.message, errors: err?.response?.data?.errors };
        } finally {
            setLoading(false);
        }
    };

    const handleValidateAndSubmit = async () => {
        if (!form) return;

        let valid = true;
        let errors: Record<string, string | null> = {};


        if (!form.name.trim()) {
            errors.name = "El nombre es obligatorio.";
            valid = false;
        }
        if (!form.description.trim()) {
            errors.description = "La descripción es obligatoria.";
            valid = false;
        }

        const { valid: validFields, errors: fieldValidationErrors } = validateFields(form);
        if (!validFields) {
            errors = { ...errors, ...fieldValidationErrors };
            valid = false;
        }
        setFieldErrors(errors);
        if (!valid) {
            setFormErrors("Corrige los errores en los campos.");
            return;
        } else {
            setFormErrors(null);
        }

        const start_time = `${form.startHour}:${form.startMinute}`;
        const lunch_time = `${form.lunchHour}:${form.lunchMinute}`;
        const end_time = `${form.endHour}:${form.endMinute}`;
        const result = await createTurno({
            name: form.name,
            description: form.description,
            start_time,
            lunch_time,
            end_time,
        });
        if (result && result.errors) {
            const backendFieldErrors: Record<string, string | null> = {};
            if (result.errors.name) backendFieldErrors.name = result.errors.name[0];
            if (result.errors.description) backendFieldErrors.description = result.errors.description[0];
            if (result.errors.start_time) backendFieldErrors.start_time = result.errors.start_time[0];
            if (result.errors.lunch_time) backendFieldErrors.lunch_time = result.errors.lunch_time[0];
            if (result.errors.end_time) backendFieldErrors.end_time = result.errors.end_time[0];
            setFieldErrors(backendFieldErrors);
        }
    };

    return {
        createTurno,
        loading,
        error,
        success,
        validationErrors,
        formErrors,
        fieldErrors,
        handleFieldChange,
        handleValidateAndSubmit,
        getFieldError,
        validateFields,
    };
};

export default useCreateTurno;