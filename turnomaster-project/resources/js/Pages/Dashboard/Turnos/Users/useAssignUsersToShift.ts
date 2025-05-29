import { useState } from "react";
import axios from "axios";

const useAssignUsersToShift = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectMode, setSelectMode] = useState<"simple" | "multiple">("simple");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [modalPage, setModalPage] = useState(1);
    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesLoading, setEmployeesLoading] = useState(false);
    const [employeesPagination, setEmployeesPagination] = useState<{current_page: number, last_page: number, total: number} | null>(null);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

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
        setSelectMode("simple");
        setSelectedDays([]);
        setSelectedUsers([]);
        setModalPage(1);
        setSearch("");
        setSearchInput("");
        fetchEmployees(1, "");
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleDay = (dayKey: string) => {
        setSelectedDays(prev =>
            prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey]
        );
    };

    const handleUserSelect = (userId: number) => {
        if (selectMode === "simple") {
            setSelectedUsers([userId]);
        } else {
            setSelectedUsers(prev =>
                prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
            );
        }
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

    return {
        showModal,
        openModal,
        closeModal,
        selectMode,
        setSelectMode,
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
    };
};

export default useAssignUsersToShift;
