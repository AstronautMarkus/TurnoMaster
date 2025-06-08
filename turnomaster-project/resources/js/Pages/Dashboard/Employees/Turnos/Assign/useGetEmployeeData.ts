import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface EmployeeRole {
    id: number;
    name: string;
    description: string;
}

interface EmployeeData {
    id: number;
    first_name: string;
    last_name: string;
    rut: number;
    rut_dv: string;
    email: string;
    role: EmployeeRole;
    profile_photo: string;
}

interface ShiftUser {
    id: number;
    user_id: number;
    shift_id: number;
    days: string; // JSON string
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Shift {
    id: number;
    name: string;
    description: string;
    start_time: string;
    lunch_time: string | null;
    end_time: string;
}

interface AssignedShift {
    shift_user: ShiftUser;
    shift: Shift;
}

interface ShiftsResponse {
    message: string;
    data: {
        current_page: number;
        data: AssignedShift[];
        first_page_url: string;
        last_page: number;
        last_page_url: string;
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
        total: number;
    };
    user: EmployeeData;
}

export function useGetEmployeeData(page: number = 1, perPage: number = 10) {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<EmployeeData | null>(null);
    const [assignedShifts, setAssignedShifts] = useState<AssignedShift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        next_page_url: null as string | null,
        prev_page_url: null as string | null,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<ShiftsResponse>(
                    `/api/employees/${id}/shifts?page=${page}&per_page=${perPage}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEmployee(response.data.user);
                setAssignedShifts(response.data.data.data);
                setPagination({
                    current_page: response.data.data.current_page,
                    last_page: response.data.data.last_page,
                    per_page: response.data.data.per_page,
                    total: response.data.data.total,
                    next_page_url: response.data.data.next_page_url,
                    prev_page_url: response.data.data.prev_page_url,
                });
            } catch (err: any) {
                setError("Error al obtener datos del empleado");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id, page, perPage]);

    return { employee, assignedShifts, loading, error, pagination };
}