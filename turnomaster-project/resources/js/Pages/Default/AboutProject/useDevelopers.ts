import { FaChessPawn } from "react-icons/fa6";

const useDevelopers = () => {
  return [
    {
      name: 'Cristian Acevedo',
      specialty: 'Especialista en frontend.',
      icon: FaChessPawn,
      role: 'pawn',
      links: {
        github: 'https://github.com/cristianacevedo',
        linkedin: 'https://linkedin.com/in/cristianacevedo',
      },
    },
    {
      name: 'Jordan Uribe',
      specialty: 'Especialista en backend.',
      icon: FaChessPawn,
      role: 'pawn',
      links: {
        github: 'https://github.com/jordanuribe',
        linkedin: 'https://linkedin.com/in/jordanuribe',
      },
    },
  ];
};

export default useDevelopers;
