import React from "react";
import { getStats } from "./stats_getter";
import { FaPerson, FaBuilding, FaBook } from "react-icons/fa6";

const StatsGetter = () => {
  const stats = getStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-4/5 mx-auto">
      <div className="bg-gray-200 p-4 rounded shadow text-center">
        <FaPerson className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Usuarios Registrados</h3>
        <p className="text-2xl font-bold">+{stats.registeredUsers}</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow text-center">
        <FaBuilding className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Compañías que usan TurnoMaster</h3>
        <p className="text-2xl font-bold">+{stats.companiesUsingTurnoMaster}</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow text-center">
        <FaBook className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Sesiones gestionadas</h3>
        <p className="text-2xl font-bold">+{stats.sessionsManaged}</p>
      </div>
    </div>
  );
};

export default StatsGetter;
