import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

interface User {
    first_name: string;
    last_name: string;
    rut: number;
    rut_dv: string;
    email: string;
    role_id: number;
}

interface ShiftUserWithUser {
    shift_user: ShiftUser;
    user: User;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface ShiftUsersResponse {
    current_page: number;
    data: ShiftUserWithUser[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Shift{
    name: string;
    description: string;
    start_time: string;
    lunch_time: string;
    end_time: string;
}

export function useGetTurnoDetailsList(page: number) {
    const { shiftId } = useParams<{ shiftId: string }>();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [shift, setShift] = useState<Shift | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!shiftId) return;
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        axios
            .get(`/api/turnos/shift/${shiftId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUsers(Array.isArray(res.data.data?.data) ? res.data.data.data : []);
                setPagination(res.data.data || null);
                setShift(res.data.shift || null);
            })
            .catch(() => {
                setError("Error al cargar usuarios");
                setLoading(false);
            })
            .then(() => setLoading(false));
    }, [page, shiftId]);

    return { loading, users, pagination, shift, error };
}

