import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";

interface ActivityLog {
  id: number;
  actor_name: string;
  actor_email: string | null;
  action: string;
  target_name: string | null;
  description: string;
  created_at: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = (
    customPage: number = page,
    customStartDate: string = startDate,
    customEndDate: string = endDate
  ) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("/api/activity-logs", {
      params: {
        page: customPage,
        start_date: customStartDate || undefined,
        end_date: customEndDate || undefined,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
      setLogs(res.data.data);
      setTotalPages(res.data.last_page);
      setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    setTimeout(() => fetchLogs(1, startDate, endDate), 0);
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
    fetchLogs(1, "", "");
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800 flex items-center">
              <FaBook className="mr-3" />
              Registro de Actividades
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Desde</label>
          <input
        type="date"
        className="border px-2 py-1 w-full"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Hasta</label>
          <input
        type="date"
        className="border px-2 py-1 w-full"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="dashboard-button-secondary flex items-center px-4 py-2 text-white text-sm w-full sm:w-auto"
          onClick={handleFilter}
          disabled={!startDate || !endDate}
        >
          <FaSearch className="mr-2" /> Filtrar
        </button>
        {(startDate && endDate) && (
          <button
        className="ml-0 sm:ml-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm w-full sm:w-auto"
        onClick={handleClearFilter}
          >
        Limpiar filtro
          </button>
        )}
      </div>
      <div className="bg-white shadow w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <h1>Cargando...</h1>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              <table className="table-auto w-full border-collapse">
                <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider z-10">
                  <tr>
                    <th className="px-4 py-3 text-left w-12"></th>
                    <th className="px-4 py-3 text-left">Fecha</th>
                    <th className="px-4 py-3 text-left">Actor</th>
                    <th className="px-4 py-3 text-left">Acción</th>
                    <th className="px-4 py-3 text-left">Objetivo</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <><tr
                      key={log.id}
                      className="hover:bg-gray-100 transition-colors border-b"
                    >
                      <td className="px-4 py-2 align-top">
                        <button
                          className="focus:outline-none"
                          onClick={() => toggleRow(log.id)}
                          aria-label={expandedRows.includes(log.id) ? "Ocultar detalles" : "Mostrar detalles"}
                        >
                          {expandedRows.includes(log.id) ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-2 align-top">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="px-4 py-2 align-top">
                        <span className="font-semibold">{log.actor_name}</span>
                        <br />
                        <span className="text-xs text-gray-500">{log.actor_email || "-"}</span>
                      </td>
                      <td className="px-4 py-2 align-top">{log.action}</td>
                      <td className="px-4 py-2 align-top font-semibold">{log.target_name || "-"}</td>
                    </tr>
                    {expandedRows.includes(log.id) && (
                      <tr className="bg-gray-50">
                        <td />
                        <td colSpan={4} className="px-6 py-4">
                          <div>
                            <span className="font-semibold">Descripción:</span>
                            <div className="mt-1 text-gray-700">{log.description}</div>
                          </div>
                        </td>
                      </tr>
                    )}</>
                  ))}
                  {logs.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No se encontraron registros de actividad.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
          </>
        )}
      </div>
      <div className="flex justify-end items-center mt-4">
              <span className="text-gray-700 mr-4">Página {page} de {totalPages}</span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className={`px-4 py-2 ${page === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                >
                  Anterior
                </button>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className={`px-4 py-2 ${page === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                >
                  Siguiente
                </button>
              </div>
      </div>
    </div>
  );
}
