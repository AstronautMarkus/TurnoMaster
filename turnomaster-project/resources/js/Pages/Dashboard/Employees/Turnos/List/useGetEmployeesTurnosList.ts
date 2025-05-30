import axios from "axios";
import { useEffect, useState } from "react";

interface ShiftUser {
    id: number;
    user_id: number;
    shift_id: number;
    days: string;
    is_active: boolean;
    created_by: number;
    created_at: string;
    updated_at: string;
}

interface Shift {
    id: number;
    name: string;
    description: string;
    start_time: string;
    lunch_time: string;
    end_time: string;
}

interface ShiftData {
    shift_user: ShiftUser;
    shift: Shift;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    rut: number;
    rut_dv: string;
    email: string;
    role: {
        id: number;
        name: string;
        description: string;
    };
}

interface ApiResponse {
    message: string;
    data: {
        current_page: number;
        data: ShiftData[];
    };
    user: User;
}

// Format RUT
function formatRut(rut: number, rut_dv: string): string {
    const rutStr = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${rutStr}-${rut_dv}`;
}

export const useGetEmployeesTurnosList = (employeeId: number) => {
    const [loading, setLoading] = useState(true);
    const [shifts, setShifts] = useState<ShiftData[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get<ApiResponse>(`/api/employees/${employeeId}/shifts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setShifts(res.data.data.data);
                
                const userData = res.data.user;
                setUser({
                    ...userData,
                    rut: formatRut(userData.rut, userData.rut_dv) as unknown as any,
                });
            } catch (err: any) {
                setError("Error al obtener los turnos del empleado.");
            } finally {
                setLoading(false);
            }
        };
        if (employeeId) fetchData();
    }, [employeeId]);

    return { loading, shifts, user, error };
};

