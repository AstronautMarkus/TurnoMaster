import { useState } from 'react';
import { JSX } from "react";
import axios from 'axios';

type FormValues = {
    first_name: string;
    last_name: string;
    rut: string;
    rut_dv: string;
    email: string;
    role_id: string;
};

type Errors = Partial<Record<keyof FormValues | 'rut_general', string>>;

function parseJwt(token: string): { exp?: number; company_id?: string } | null {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

const useEditEmployee = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        first_name: '',
        last_name: '',
        rut: '',
        rut_dv: '',
        email: '',
        role_id: '',
    });

    const [initialValues, setInitialValues] = useState<FormValues | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const isValidDV = (rut: string, dv: string): boolean => {
        let sum = 0;
        let multiplier = 2;

        for (let i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut[i], 10) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const calculatedDV = 11 - (sum % 11);
        const validDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

        return dv.toUpperCase() === validDV;
    };

    const validate = () => {
        const newErrors: Errors = {};

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (id?: string): Promise<{ type: 'success' | 'error'; message: string } | null> => {
        if (validate()) {
            const token = localStorage.getItem('token');
            const parsedToken = token ? parseJwt(token) : null;
            const company_id = parsedToken?.company_id;

            const finalData = {
                ...formValues,
                company_id,
            };

            try {
                const response = id
                    ? await axios.put(`/api/employees/${id}`, finalData, {
                          headers: { Authorization: `Bearer ${token}` },
                      })
                    : await axios.post('/api/create/employee', finalData, {
                          headers: { Authorization: `Bearer ${token}` },
                      });

                if (response.status === 200 || response.status === 201) {
                    return { type: 'success', message: response.data.message };
                }
            } catch (error: any) {
                if (error.response?.status === 422) {
                    return { type: 'error', message: error.response.data.message };
                }
                return { type: 'error', message: 'Ocurrió un error inesperado. Por favor, intente más tarde.' };
            }
        }
        return null;
    };

    const handleChange = (field: keyof FormValues, value: string, skipValidation = false) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));

        if (!skipValidation && (field === 'rut' || field === 'rut_dv') && errors.rut_general) {
            if (isValidDV(field === 'rut' ? value : formValues.rut, field === 'rut_dv' ? value : formValues.rut_dv)) {
                const updatedErrors = { ...errors };
                delete updatedErrors.rut_general;
                setErrors(updatedErrors);
            }
        }
    };

    const setInitialFormValues = (values: FormValues) => {
        setFormValues(values);
        setInitialValues(values);
    };

    return { formValues, errors, handleChange, handleSubmit, setInitialFormValues };
};

export default useEditEmployee;
