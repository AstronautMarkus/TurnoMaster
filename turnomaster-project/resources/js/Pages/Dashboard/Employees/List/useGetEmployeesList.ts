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
  const [employees, setEmployees] = useState<Employee[]>([
  { first_name: "Juan", last_name: "Pérez", rut: "12.345.678-9", email: "juan.perez@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "María", last_name: "González", rut: "98.765.432-1", email: "maria.gonzalez@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Ana", last_name: "Martínez", rut: "15.678.901-2", email: "ana.martinez@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Roberto", last_name: "Sánchez", rut: "17.890.123-4", email: "roberto.sanchez@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Luisa", last_name: "Rodríguez", rut: "14.567.890-3", email: "luisa.rodriguez@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Pedro", last_name: "Fernández", rut: "19.012.345-6", email: "pedro.fernandez@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Carmen", last_name: "Torres", rut: "16.789.012-5", email: "carmen.torres@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Miguel", last_name: "Díaz", rut: "20.123.456-7", email: "miguel.diaz@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Sofía", last_name: "Ruiz", rut: "18.901.234-8", email: "sofia.ruiz@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Javier", last_name: "Morales", rut: "21.234.567-9", email: "javier.morales@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Laura", last_name: "Vargas", rut: "22.345.678-0", email: "laura.vargas@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Diego", last_name: "Castro", rut: "23.456.789-1", email: "diego.castro@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Valentina", last_name: "Herrera", rut: "24.567.890-2", email: "valentina.herrera@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Gabriel", last_name: "Silva", rut: "25.678.901-3", email: "gabriel.silva@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Camila", last_name: "Rojas", rut: "26.789.012-4", email: "camila.rojas@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Andrés", last_name: "Flores", rut: "27.890.123-5", email: "andres.flores@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Daniela", last_name: "Espinoza", rut: "28.901.234-6", email: "daniela.espinoza@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Sebastián", last_name: "Reyes", rut: "29.012.345-7", email: "sebastian.reyes@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Alejandra", last_name: "Gutiérrez", rut: "30.123.456-8", email: "alejandra.gutierrez@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Matías", last_name: "Navarro", rut: "31.234.567-9", email: "matias.navarro@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Catalina", last_name: "Muñoz", rut: "32.345.678-0", email: "catalina.munoz@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Felipe", last_name: "Araya", rut: "33.456.789-1", email: "felipe.araya@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Javiera", last_name: "Cortés", rut: "34.567.890-2", email: "javiera.cortes@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Ignacio", last_name: "Fuentes", rut: "35.678.901-3", email: "ignacio.fuentes@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Constanza", last_name: "Sepúlveda", rut: "36.789.012-4", email: "constanza.sepulveda@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Nicolás", last_name: "Vega", rut: "37.890.123-5", email: "nicolas.vega@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Francisca", last_name: "Campos", rut: "38.901.234-6", email: "francisca.campos@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Benjamín", last_name: "Riquelme", rut: "39.012.345-7", email: "benjamin.riquelme@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Antonia", last_name: "Pizarro", rut: "40.123.456-8", email: "antonia.pizarro@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Vicente", last_name: "Cárdenas", rut: "41.234.567-9", email: "vicente.cardenas@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Isidora", last_name: "Ortiz", rut: "42.345.678-0", email: "isidora.ortiz@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Tomás", last_name: "Alarcón", rut: "43.456.789-1", email: "tomas.alarcon@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Macarena", last_name: "Valenzuela", rut: "44.567.890-2", email: "macarena.valenzuela@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Cristóbal", last_name: "Miranda", rut: "45.678.901-3", email: "cristobal.miranda@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Trinidad", last_name: "Bravo", rut: "46.789.012-4", email: "trinidad.bravo@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Martín", last_name: "Vera", rut: "47.890.123-5", email: "martin.vera@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Josefina", last_name: "Molina", rut: "48.901.234-6", email: "josefina.molina@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Lucas", last_name: "Contreras", rut: "49.012.345-7", email: "lucas.contreras@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Emilia", last_name: "Parra", rut: "50.123.456-8", email: "emilia.parra@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Agustín", last_name: "Soto", rut: "51.234.567-9", email: "agustin.soto@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Florencia", last_name: "Salazar", rut: "52.345.678-0", email: "florencia.salazar@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Maximiliano", last_name: "Peña", rut: "53.456.789-1", email: "maximiliano.pena@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Amanda", last_name: "Gómez", rut: "54.567.890-2", email: "amanda.gomez@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Joaquín", last_name: "Aguilera", rut: "55.678.901-3", email: "joaquin.aguilera@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Renata", last_name: "Vidal", rut: "56.789.012-4", email: "renata.vidal@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Santiago", last_name: "Mendoza", rut: "57.890.123-5", email: "santiago.mendoza@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Magdalena", last_name: "Leiva", rut: "58.901.234-6", email: "magdalena.leiva@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Alonso", last_name: "Jara", rut: "59.012.345-7", email: "alonso.jara@example.com", role: "Administrador", image: getRandomImage() },
  { first_name: "Isabella", last_name: "Carvajal", rut: "60.123.456-8", email: "isabella.carvajal@example.com", role: "Empleado", image: getRandomImage() },
  { first_name: "Mateo", last_name: "Tapia", rut: "61.234.567-9", email: "mateo.tapia@example.com", role: "RRHH", image: getRandomImage() },
  { first_name: "Fernanda", last_name: "Olivares", rut: "62.345.678-0", email: "fernanda.olivares@example.com", role: "Empleado", image: getRandomImage() },
  ]);

  return employees;
};

export default useGetEmployeesList;
