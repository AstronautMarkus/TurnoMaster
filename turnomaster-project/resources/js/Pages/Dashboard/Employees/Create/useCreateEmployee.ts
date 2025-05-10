import { useState } from 'react';

type FormValues = {
    first_name: string;
    last_name: string;
    rut: string;
    rut_dv: string;
    email: string;
    role_id: string;
};

type Errors = Partial<Record<keyof FormValues | 'rut_general', string>>;

const useCreateEmployee = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        first_name: '',
        last_name: '',
        rut: '',
        rut_dv: '',
        email: '',
        role_id: '',
    });

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

        if (!formValues.first_name.trim()) newErrors.first_name = 'El nombre es obligatorio.';
        if (!formValues.last_name.trim()) newErrors.last_name = 'El apellido es obligatorio.';
        if (!formValues.email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
        if (!formValues.role_id.trim()) newErrors.role_id = 'El rol es obligatorio.';

        if (!formValues.rut.trim() || !formValues.rut_dv.trim()) {
            newErrors.rut_general = 'Por favor valide su RUT y dígito verificador.';
        } else if (formValues.rut.length > 8) {
            newErrors.rut_general = 'El RUT no puede tener más de 8 dígitos.';
        } else if (formValues.rut.length < 8) {
            newErrors.rut_general = 'El RUT no puede tener menos de 8 dígitos.';
        } else if (!isValidDV(formValues.rut, formValues.rut_dv)) {
            newErrors.rut_general = 'El dígito verificador ingresado no es válido.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log('Formulario válido:', formValues);
        }
    };

    const handleChange = (field: keyof FormValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));

        // Clear errors for the `rut_general` field if `rut` and `rut_dv` become valid
        if ((field === 'rut' || field === 'rut_dv') && errors.rut_general) {
            if (isValidDV(field === 'rut' ? value : formValues.rut, field === 'rut_dv' ? value : formValues.rut_dv)) {
                const updatedErrors = { ...errors };
                delete updatedErrors.rut_general;
                setErrors(updatedErrors);
            }
        }
    };

    return { formValues, errors, handleChange, handleSubmit };
};

export default useCreateEmployee;
