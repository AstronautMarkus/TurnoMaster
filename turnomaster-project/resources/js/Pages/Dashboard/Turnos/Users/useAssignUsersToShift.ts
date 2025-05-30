import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useAssignUsersToShift = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [modalPage, setModalPage] = useState(1);
    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesLoading, setEmployeesLoading] = useState(false);
    const [employeesPagination, setEmployeesPagination] = useState<{current_page: number, last_page: number, total: number} | null>(null);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [assignResults, setAssignResults] = useState<{ [userId: number]: { status: "success" | "error", message?: string } }>({});
    const [assignLoading, setAssignLoading] = useState(false);
    const [lastAssignStatus, setLastAssignStatus] = useState<"success" | "error" | null>(null);
    const [lastAssignMessage, setLastAssignMessage] = useState<string | null>(null);
    const [lastAssignErrors, setLastAssignErrors] = useState<string[] | null>(null);
    const { shiftId } = useParams<{ shiftId: string }>();

    const fetchEmployees = async (page = 1, searchName = "") => {
        setEmployeesLoading(true);
        try {
            const token = localStorage.getItem("token");
            const query = `/api/employees?page=${page}${searchName ? `&name=${encodeURIComponent(searchName)}` : ""}`;
            const res = await axios.get(query, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(res.data.data);
            setEmployeesPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
                total: res.data.total
            });
        } catch (e) {
            setEmployees([]);
            setEmployeesPagination(null);
        }
        setEmployeesLoading(false);
    };

    const openModal = () => {
        setShowModal(true);
        setSelectedDays([]);
        setSelectedUsers([]);
        setModalPage(1);
        setSearch("");
        setSearchInput("");
        setAssignResults({});
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
        fetchEmployees(1, "");
    };

    const closeModal = () => {
        setShowModal(false);
        setAssignResults({});
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
    };

    const toggleDay = (dayKey: string) => {
        setSelectedDays(prev =>
            prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey]
        );
    };

    const handleUserSelect = (userId: number) => {
        setSelectedUsers([userId]);
    };

    const handleModalPageChange = (newPage: number) => {
        setModalPage(newPage);
        fetchEmployees(newPage, search);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        setSearch(searchInput);
        setModalPage(1);
        fetchEmployees(1, searchInput);
    };

    const handleClearSearch = () => {
        setSearch("");
        setSearchInput("");
        setModalPage(1);
        fetchEmployees(1, "");
    };

    const assignUsers = async () => {
        if (!shiftId || selectedDays.length === 0 || selectedUsers.length === 0) return;
        setAssignLoading(true);
        setAssignResults({});
        setLastAssignStatus(null);
        setLastAssignMessage(null);
        setLastAssignErrors(null);
        const token = localStorage.getItem("token");
        const dayMap: Record<string, string> = {
            L: "Lunes",
            M: "Martes",
            X: "Miercoles",
            J: "Jueves",
            V: "Viernes",
            S: "Sabado"
        };
        const days = selectedDays.map(d => dayMap[d] || d);
        try {
            let body: any = {
                shift_id: Number(shiftId),
                days,
                is_active: false,
                employee_id: selectedUsers[0]
            };
            const res = await axios.post("/api/turnos/shift/", body, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignResults({
                [selectedUsers[0]]: { status: "success", message: res.data.message }
            });
            setLastAssignStatus("success");
            setLastAssignMessage(res.data.message || "Usuario asignado correctamente.");
            setLastAssignErrors(null);
        } catch (err: any) {
            if (err.response && err.response.status === 422) {
                const data = err.response.data;
                let results: any = {};
                results[selectedUsers[0]] = {
                    status: "error",
                    message: data.errors?.shift_id?.[0] || data.message
                };
                setAssignResults(results);
                setLastAssignStatus("error");
                setLastAssignMessage(data.message || "Error al asignar usuario.");
                let errorList: string[] = [];
                if (data.errors && typeof data.errors === "object") {
                    for (const key in data.errors) {
                        const errs = data.errors[key];
                        if (Array.isArray(errs)) {
                            errorList.push(...errs);
                        } else if (typeof errs === "string") {
                            errorList.push(errs);
                        }
                    }
                }
                setLastAssignErrors(errorList.length > 0 ? errorList : null);
            }
        }
        setAssignLoading(false);
    };

    return {
        showModal,
        openModal,
        closeModal,
        selectedDays,
        setSelectedDays,
        toggleDay,
        selectedUsers,
        setSelectedUsers,
        modalPage,
        setModalPage,
        employees,
        employeesLoading,
        employeesPagination,
        handleUserSelect,
        handleModalPageChange,
        search,
        searchInput,
        handleSearchInputChange,
        handleSearch,
        handleClearSearch,
        assignUsers,
        assignResults,
        assignLoading,
        lastAssignStatus,
        lastAssignMessage,
        lastAssignErrors,
    };
};

export default useAssignUsersToShift;
