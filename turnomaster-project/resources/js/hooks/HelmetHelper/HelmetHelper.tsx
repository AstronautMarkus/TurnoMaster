import { Helmet } from 'react-helmet';

interface HelmetProps {
  path: string;
}

const helmetData: Record<string, {
  title: string;
  description: string;
  image?: string;
}> = {
  '/': {
    title: 'TurnoMaster | Gestión de Turnos Inteligente',
    description: 'Optimiza la gestión de turnos y reservas con TurnoMaster. Plataforma profesional para empresas y clientes. ¡Descubre la mejor experiencia en organización!',
  },
  '/prices': {
    title: 'Planes de TurnoMaster',
    description: 'Compara los planes y elige el que mejor se adapte a las necesidades de tu negocio.',
  },
  
  
};

const HelmetHelper: React.FC<HelmetProps> = ({ path }) => {
  const meta = helmetData[path] || {
    title: 'TurnoMaster',
    description: 'Plataforma profesional de gestión de turnos.'
  };


  const baseUrl = 'https://turnomaster.cl';
  const url = `${baseUrl}${path}`;


  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="es" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default HelmetHelper;
