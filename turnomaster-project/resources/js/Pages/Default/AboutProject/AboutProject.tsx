import React from 'react';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import useSpecialMentions from './useSpecialMentions';
import useLeaders from './useLeaders';
import useDevelopers from './useDevelopers';

const AboutProject = () => {
  const specialMentions = useSpecialMentions();
  const leaders = useLeaders();
  const developers = useDevelopers();

  const renderSocialLinks = (links: { github?: string; linkedin?: string }) => (
    <div className="flex justify-center gap-2 mt-2">
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          <FaGithubSquare className="text-2xl" />
        </a>
      )}
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          <FaLinkedin className="text-2xl" />
        </a>
      )}
    </div>
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'king':
        return 'text-yellow-500';
      case 'queen':
        return 'text-pink-500';
      case 'pawn':
        return 'text-blue-700';
      case 'support':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col w-full h-full">

      <section className="bg-gray-50 text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Sobre el proyecto: <span className="text-indigo-600">TurnoMaster</span>
          </h1>
          <p className="text-lg text-gray-600">
            TurnoMaster nació con la misión de optimizar la gestión de turnos y horarios en equipos de trabajo. Inspirado por la necesidad
            de simplificar procesos y mejorar la productividad, nuestro proyecto busca ofrecer soluciones tecnológicas innovadoras para organizaciones modernas.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <div key={index} className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 mr-6"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <leader.icon className={`${getRoleColor(leader.role)} text-2xl`} />
                    <h3 className="text-xl font-semibold text-indigo-800">{leader.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{leader.description}</p>
                  {renderSocialLinks(leader.links)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-center text-indigo-800 mb-8">Desarrolladores del proyecto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developers.map((developer, index) => (
                <div key={index} className="flex flex-col items-center space-y-3 p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <developer.icon className={`${getRoleColor('pawn')} text-3xl`} />
                  <div className="text-center">
                    <p className="text-indigo-800 font-semibold">{developer.name}</p>
                    <p className="text-gray-600 text-sm">{developer.specialty}</p>
                    {renderSocialLinks(developer.links)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-center text-indigo-800 mb-6">Aliados y Menciones Especiales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialMentions.map((mention, index) => (
                <div
              key={index}
              className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
              <mention.icon className={`${getRoleColor('support')} text-3xl mr-4`} />
              <div>
                <p className="text-indigo-800 font-semibold">{mention.name}</p>
                <p className="text-gray-600 text-sm">{mention.contribution}</p>
                {renderSocialLinks(mention.links)}
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutProject;
