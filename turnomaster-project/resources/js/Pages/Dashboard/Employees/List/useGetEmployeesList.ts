import { useState } from "react";

interface Employee {
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
  const [employees] = useState<Employee[]>([
    { first_name: "Juan", last_name: "Pérez", rut: "12.345.678-9", email: "juan.perez@example.com", role: "Administrador", image: getRandomImage() },
    { first_name: "María", last_name: "González", rut: "98.765.432-1", email: "maria.gonzalez@example.com", role: "Empleado", image: getRandomImage() },
    { first_name: "Carlos", last_name: "López", rut: "11.223.344-5", email: "carlos.lopez@example.com", role: "Supervisor", image: getRandomImage() },
  ]);

  return employees;
};

export default useGetEmployeesList;
