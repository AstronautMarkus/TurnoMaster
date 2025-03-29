import React from 'react';

const AboutProject = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <section className="bg-gray-700 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">TurnoMaster</h1>
          <p className="text-lg">
            TurnoMaster nació con la misión de optimizar la gestión de turnos y horarios en equipos de trabajo. 
            Inspirado por la necesidad de simplificar procesos y mejorar la productividad, nuestro proyecto busca 
            ofrecer soluciones tecnológicas innovadoras.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestro Equipo</h2>
          <div className="space-y-12">

            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://github.com/astronautmarkus.png" 
                  alt="Líder de Equipo" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Líder de Equipo</h3>
                  <p className="text-gray-600">Marcos Reyes - Jefe del proyecto y desarrollador principal. Encargado de las decisiones y supervición del desarrollo.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <img 
                  src="https://github.com/ki4ra1109.png" 
                  alt="Segunda al Mando" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Segunda al Mando</h3>
                  <p className="text-gray-600">Kiara Rubio - Encargada de la gestión y toma de decisiones clave. Desarrolladora del proyecto y cofundadora de la idea.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Desarrolladores</h3>
              <ul className="space-y-4 mt-8">
                <li className="flex flex-col items-center space-y-2">
                  <img 
                    src="/path-to-dev1-photo.jpg" 
                    alt="Desarrollador 1" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <p className="text-gray-600">Nombre del Desarrollador 1 - Especialista en frontend.</p>
                </li>
                <li className="flex flex-col items-center space-y-2">
                  <img 
                    src="/path-to-dev2-photo.jpg" 
                    alt="Desarrollador 2" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <p className="text-gray-600">Nombre del Desarrollador 2 - Especialista en backend.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutProject;
