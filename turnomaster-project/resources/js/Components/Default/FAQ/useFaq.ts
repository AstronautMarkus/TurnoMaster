import { useState } from "react";

export const useFaq = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "❓ ¿Qué es TurnoMaster?",
      answer:
        "TurnoMaster es una herramienta para gestionar los turnos de tus empleados, incluyendo horarios de entrada, colación y salida. Es ideal tanto para pequeñas empresas como para grandes organizaciones, adaptándose a negocios simples o en crecimiento.",
      isOpen: false,
    },
    {
      question: "✅ ¿Cómo funciona TurnoMaster?",
      answer:
        "TurnoMaster permite a los empleados gestionar sus turnos de manera sencilla a través de una cuenta. Los empleados pueden ver sus horarios, solicitar peticiones especiales como un reporte o justificación y recibir notificaciones sobre sus turnos. Los administradores pueden gestionar todos los turnos y empleados desde una única plataforma.",
      isOpen: false,
    },
    {
      question: "🖥️ ¿Qué dispositivos son compatibles?",
      answer:
        "TurnoMaster es compatible con cualquier dispositivo que posea acceso a internet. Puedes utilizarlo desde tu computadora, tablet o smartphone. La plataforma está diseñada para ser responsiva y fácil de usar en cualquier dispositivo.",
      isOpen: false,
    },
    {
      question:"💲 ¿Cuánto cuesta TurnoMaster?",
      answer:"TurnoMaster posee distintos planes de pago, adaptándose a las necesidades de cada empresa. Puedes consultar los precios en nuestra página de precios o ponerte en contacto con nuestro equipo de ventas para obtener más información.",
      isOpen: false,
    },
    {
      question:"🤝 ¿Cómo adquiero una suscripción a TurnoMaster?",
      answer:'Para adquirir una suscripción a TurnoMaster, puedes dirigirte a nuestro apartado de "Planes y precios" ubicado en nuestra barra de navegación. Allí podrás elegir el plan que mejor se adapte a tus necesidades y seguir las instrucciones para completar la compra. Si tienes alguna duda, no dudes en ponerte en contacto con nuestro equipo de soporte.',
      isOpen: false,
    },
    {
      question:"💰 He adquirido una suscripción a TurnoMaster, ¿Ahora qué?",
      answer:"Una vez adquirida tu suscripción a TurnoMaster, recibirás un correo electrónico con las instrucciones para activar tu cuenta. Sigue los pasos indicados en el correo y podrás comenzar a utilizar la plataforma de inmediato. Recuerda que siempre podrás contactanos si tienes algún problema o duda.",
      isOpen: false,
    },
    {
      question:"📄 ¿Como entro al panel de trabajo?",
      answer:'Para acceder al panel de trabajo de TurnoMaster, dirígete a la opción "Acceder", este menú tiene dos opciones de acceso, una para empleados y otra para administradores. Selecciona la opción correspondiente a tu rol e ingresa tus credenciales.',
      isOpen: false,
    }
  ]);

  const toggleFaq = (index: number) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return { faqs, toggleFaq };
};
