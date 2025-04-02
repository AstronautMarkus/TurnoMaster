import { FaChessKnight, FaChessRook, FaChessBishop } from "react-icons/fa6";

const useSpecialMentions = () => {
  return [
    {
      name: 'Sergio Neira',
      contribution: 'Contribución destacada en diseño UX/UI.',
      icon: FaChessKnight,
      role: 'support',
      links: {
        linkedin: 'https://www.linkedin.com/in/sergio-neira-mansilla/',
        github: 'https://github.com/Sergio-Neira'
      },
    },
    {
      name: 'Fernando Catalán',
      contribution: 'Apoyo técnico sobre el desarrollo del sistema.',
      icon: FaChessRook,
      role: 'support',
      links: {
        github: 'https://github.com/anzar2',
      },
    },
    {
      name: 'Pablo Lara',
      contribution: 'Contribución y sugerencias de diseño UI/UX.',
      icon: FaChessBishop,
      role: 'support',
      links: {
      }
    }
  ];
};

export default useSpecialMentions;
