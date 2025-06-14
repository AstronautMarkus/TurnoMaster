import HelmetHelper from "../../../hooks/HelmetHelper/HelmetHelper";

const AboutProject = () => {
  return (
    <>
      <HelmetHelper path="/about-project"/>
      <div className="flex flex-col w-full h-full">
        <section className="w-full py-12">
            <div className="mt-12 container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center items-start space-y-4">
                <div className="flex items-start mb-2">
                  <div className="w-2 h-20 bg-reyes-light mr-4"></div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                         Sobre TurnoMaster
                      </h2>
                      <p className="text-lg text-gray-600 font-medium mt-1">
                        El maestro de los turnos”… quizás.
                        </p>
                      </div>
                    </div>
                  <p className="text-lg text-gray-700">
                    TurnoMaster nació como propuesta a una problemática que afecta a muchos trabajadores, especialmente en el área de trabajo remoto o a distancia. El registro de horarios.
                  </p>
                  <p className="text-lg text-gray-700">
                   Una idea simple, pero efectiva. TurnoMaster permite a los trabajadores registrar sus horarios de entrada, colación y salida de manera rápida y sencilla, sin complicaciones. Con una interfaz intuitiva y fácil de usar, los usuarios pueden registrar su tiempo de trabajo en cuestión de segundos.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/img/TurnoMasterScreenshots/turnos-turnomaster.png" className="object-cover object-center w-full h-full shadow-lg"/>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Imagen referencial de la interfaz de TurnoMaster.
                  </p>
                </div>
              </div>
          </section>
       </div>    
    </>
  );
};

export default AboutProject;
