import { FaChessKing, FaChessQueen } from "react-icons/fa6";

const useLeaders = () => {
  return [
    {
      name: 'Marcos Reyes',
      description: 'Líder del proyecto y desarrollador principal. Supervisa todas las decisiones de desarrollo y dirección general del sistema.',
      image: 'https://github.com/astronautmarkus.png',
      icon: FaChessKing,
      role: 'king',
      links: {
        github: 'https://github.com/astronautmarkus',
        linkedin: 'https://linkedin.com/in/markusreyes',
      },
    },
    {
      name: 'Kiara Rubio',
      description: 'Cofundadora del proyecto, encargada de decisiones clave y del desarrollo. Apoya activamente la gestión y evolución del sistema.',
      image: 'https://github.com/ki4ra1109.png',
      icon: FaChessQueen,
      role: 'queen',
      links: {
        github: 'https://github.com/ki4ra1109',
        linkedin: 'https://www.linkedin.com/in/kiara-rubio-a13389251/',
      },
    },
  ];
};

export default useLeaders;
