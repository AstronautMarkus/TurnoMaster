import { NavLink } from "react-router-dom";

const AboutProject = () => {
  return (
      <div className="flex flex-col w-full h-full">

                  <section className="w-full py-12">
                        <div className="mt-12 container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

                            <div className="flex flex-col justify-center items-start space-y-4">
                                <div className="flex items-start mb-2">
                                  <div className="w-2 h-20 bg-[#e01d1d] mr-4"></div>
                                  <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                      Sobre TurnoMaster
                                    </h2>
                                    <p className="text-lg text-gray-600 font-medium mt-1">
                                      “El maestro de los turnos”… quizás.
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

                            <div className="flex flex-col items-center border-2 border-gray-300">
                                <img
                                    src="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
                                    alt="Personas"
                                    className="object-cover object-center w-full h-full shadow-lg"
                                />
                            </div>

                        </div>
                </section>

                


      </div>
  );
};

export default AboutProject;
