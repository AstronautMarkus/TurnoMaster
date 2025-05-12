import { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  rut: string;
  email: string;
  role: string;
  image: string;
}

const getRandomNumber = () => Math.floor(Math.random() * 5) + 1;

const getRandomImage = () => {
  const randomNumber = getRandomNumber();
  return `/img/profile/default${randomNumber}.png`;
};

const useGetEmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/employees?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data, last_page } = response.data;
        const employeesData = data.map((employee: any) => ({
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          rut: `${employee.rut}-${employee.rut_dv}`,
          email: employee.email,
          role: employee.role,
          image: getRandomImage(),
        }));
        setEmployees(employeesData);

        const uniqueRoles = Array.from(new Set(data.map((employee: any) => employee.role))) as string[];
        setRoles(uniqueRoles);

        setTotalPages(last_page || 1); // Fallback to 1 if last_page is undefined
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page]);

  return { employees, roles, page, setPage, totalPages, loading };
};

export default useGetEmployeesList;
