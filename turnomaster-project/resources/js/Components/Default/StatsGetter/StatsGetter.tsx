import React, { useEffect, useState } from "react";
import { getStats } from "./stats_getter";
import { FaPerson, FaBuilding, FaBook } from "react-icons/fa6";

const StatsGetter = () => {
  const stats = getStats();
  const [animatedStats, setAnimatedStats] = useState({
    registeredUsers: 0,
    companiesUsingTurnoMaster: 0,
    sessionsManaged: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const increment = {
      registeredUsers: stats.registeredUsers / steps,
      companiesUsingTurnoMaster: stats.companiesUsingTurnoMaster / steps,
      sessionsManaged: stats.sessionsManaged / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedStats((prev) => ({
        registeredUsers: Math.min(
          stats.registeredUsers,
          prev.registeredUsers + increment.registeredUsers
        ),
        companiesUsingTurnoMaster: Math.min(
          stats.companiesUsingTurnoMaster,
          prev.companiesUsingTurnoMaster + increment.companiesUsingTurnoMaster
        ),
        sessionsManaged: Math.min(
          stats.sessionsManaged,
          prev.sessionsManaged + increment.sessionsManaged
        ),
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-4/5 mx-auto mb-4">
      <div className="bg-white p-4 rounded shadow text-center">
        <FaPerson className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Usuarios Registrados</h3>
        <p className="text-2xl font-bold">
          +{Math.round(animatedStats.registeredUsers)}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <FaBuilding className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">
          Compañías que usan TurnoMaster
        </h3>
        <p className="text-2xl font-bold">
          +{Math.round(animatedStats.companiesUsingTurnoMaster)}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <FaBook className="text-4xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Sesiones gestionadas</h3>
        <p className="text-2xl font-bold">
          +{Math.round(animatedStats.sessionsManaged)}
        </p>
      </div>
    </div>
  );
};

export default StatsGetter;
