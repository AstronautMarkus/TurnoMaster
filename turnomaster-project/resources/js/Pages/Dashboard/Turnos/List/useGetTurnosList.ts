import { useState, useEffect } from "react";
import axios from "axios";

interface Turno {
  id: number;
  name: string;
  description: string;
  start_time: string;
  has_lunch:boolean;
  lunch_time: string;
  end_time: string;
  company_id: number;
  created_at: string;
  updated_at: string;
  assigned_users_count: number;
}

const useGetTurnosList = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        let url = `/api/turnos?page=${page}`;
        if (searchName) {
          url += `&name=${encodeURIComponent(searchName)}`;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data, last_page } = response.data;
        setTurnos(data);
        setTotalPages(last_page || 1);
      } catch (error) {
        console.error("Error fetching turnos:", error);
        setTurnos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [page, searchName]);

  const search = (name: string) => {
    setSearchName(name);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchName("");
    setPage(1);
  };

  return { turnos, page, setPage, totalPages, loading, searchName, search, clearSearch };
};

export default useGetTurnosList;

