import { useEffect, useState } from "react";
import axios from "axios";

export interface Turno {
    id: number;
    name: string;
    description: string;
    has_lunch: number;
    start_time: string;
    lunch_time: string | null;
    end_time: string;
    total_hours: number;
    company_id: number;
    created_at: string;
    updated_at: string | null;
}

interface TurnosResponse {
    current_page: number;
    data: Turno[];
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    total: number;
}

export function useGetTurnos(page: number = 1, perPage: number = 10) {
    const [turnos, setTurnos] = useState<Turno[]>([]);
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
        const fetchTurnos = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get<TurnosResponse>(
                    `/api/turnos?page=${page}&per_page=${perPage}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTurnos(res.data.data);
                setPagination({
                    current_page: res.data.current_page,
                    last_page: res.data.last_page,
                    per_page: res.data.per_page,
                    total: res.data.total,
                    next_page_url: res.data.next_page_url,
                    prev_page_url: res.data.prev_page_url,
                });
            } catch (err: any) {
                setError("Error al obtener turnos");
            } finally {
                setLoading(false);
            }
        };
        fetchTurnos();
    }, [page, perPage]);

    return { turnos, loading, error, pagination };
}
