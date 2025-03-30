import React from 'react';
import { FaGithubSquare } from "react-icons/fa";

const AboutProject = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">TurnoMaster</h1>
          <p className="text-lg">
            TurnoMaster nació con la misión de optimizar la gestión de turnos y horarios en equipos de trabajo.
            Inspirado por la necesidad de simplificar procesos y mejorar la productividad, nuestro proyecto busca
            ofrecer soluciones tecnológicas innovadoras.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Nuestro Equipo</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#5C5AD6] hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://github.com/astronautmarkus.png"
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">Líder de Equipo</h3>
                  <p className="text-gray-600">
                    Marcos Reyes - Jefe del proyecto y desarrollador principal. Encargado de las decisiones y
                    supervisión del desarrollo.
                  </p>
                  <a
                    href="https://github.com/astronautmarkus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-indigo-600 hover:underline"
                  >
                    <FaGithubSquare className="mr-2" /> Ver GitHub
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-[#5C5AD6] hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://github.com/ki4ra1109.png"
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">Segunda al Mando</h3>
                  <p className="text-gray-600">
                    Kiara Rubio - Encargada de la gestión y toma de decisiones clave. Desarrolladora del proyecto y
                    cofundadora de la idea.
                  </p>
                  <a
                    href="https://github.com/ki4ra1109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-indigo-600 hover:underline"
                  >
                    <FaGithubSquare className="mr-2" /> Ver GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-indigo-800 mb-6">Desarrolladores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                    D1
                  </div>
                  <p className="text-gray-600">Nombre del Desarrollador 1 - Especialista en frontend.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-indigo-50 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                    D2
                  </div>
                  <p className="text-gray-600">Nombre del Desarrollador 2 - Especialista en backend.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutProject;
