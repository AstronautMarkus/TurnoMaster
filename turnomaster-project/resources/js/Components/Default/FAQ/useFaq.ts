import { useState } from "react";

export const useFaq = () => {
  const [faqs, setFaqs] = useState([
    { question: "❓ ¿Qué es TurnoMaster?", answer: "TurnoMaster es una herramienta de gestión de horarios diseñada para pequeñas y medianas empresas. Permite registrar las asistencias de entrada, colación y salida de los empleados. Además, ofrece gráficos administrativos y diversas herramientas para facilitar la interacción entre empleados, RRHH y jefes.", isOpen: false },
    { question: "🛠️ ¿Cómo puedo usar TurnoMaster?", answer: "Puedes utilizarlo para gestionar tus horarios de manera eficiente.", isOpen: false },
    { question: "🔐 ¿TurnoMaster es gratuito?", answer: "Sí, contamos con un plan Freemium que te permite probar el sistema sin costo. Es ideal para conocer la plataforma, pero está limitado en funcionalidades. Si necesitas más opciones o manejar más empleados, puedes suscribirte a uno de nuestros planes pagados.", isOpen: false },
    { question: "💡 ¿Qué es un plan Freemium?", answer: "El plan Freemium es una opción gratuita que te permite probar el sistema sin costo. Es ideal para conocer la plataforma, pero está limitado en funcionalidades. Si necesitas más opciones o manejar más empleados, puedes suscribirte a uno de nuestros planes pagados.", isOpen: false },
    { question: "❌ ¿Cómo puedo cancelar mi suscripción?", answer: "Puedes cancelar tu suscripción desde la sección de configuración de tu cuenta. Si tienes alguna duda, no dudes en contactarnos.", isOpen: false },
    { question: "💳 ¿Qué métodos de pago aceptan?", answer: "Aceptamos tarjetas de crédito y débito, utilizamos plataformas de pago como Stripe, Webpay y MercadoPago.", isOpen: false },
    {question: "👥 ¿Cuántos empleados puedo gestionar?", answer: "Depende del plan que elijas: Freemium: hasta 3 empleados. Básico: hasta 10 empleados. Silver: hasta 30 empleados. Gold: hasta 50 empleados (o más con expansión)."},
    {question: "📆 ¿Puedo personalizar los horarios y turnos de mi empresa?", answer: "Sí. Desde el Plan Silver, puedes configurar horarios, tolerancias, plazos de justificación y mucho más. Esto te permite adaptar el sistema al funcionamiento real de tu empresa."},
    {question: "🛠️ ¿Qué pasa si me paso del límite de empleados en mi plan?", answer: "El sistema te notificará y no podrás agregar más empleados hasta que actualices a un plan superior o elimines/desactives algunos usuarios."},
    {question: "📤 ¿Puedo exportar los datos de asistencia?", answer: "Sí. Los planes pagados permiten exportar reportes en distintos formatos como PDF, Excel y CSV. En el plan Freemium no están disponibles estas opciones."},
    {question: "🔁 ¿Puedo cambiar de plan cuando quiera?", answer: "Sí. Puedes subir o bajar de plan en cualquier momento desde el panel de administración. Si bajas de plan, los datos fuera del nuevo límite quedarán bloqueados (pero no se eliminan, a menos que tú lo decidas o pase el tiempo de retención)."},
    {question: "⏳ ¿Qué pasa si no pago mi suscripción a tiempo?", answer: "Tu cuenta se congela parcialmente. Los empleados seguirán pudiendo registrar su asistencia, pero los administradores y RRHH perderán acceso a la gestión hasta que se regularice el pago. Tendrás 30 días antes de que los datos sean eliminados permanentemente."},
    {question: "🧾 ¿Hay descuentos por pago anual?", answer: "¡Sí! Al pagar de forma anual puedes acceder a descuentos especiales. Recomendado para empresas que ya conocen el sistema y quieren ahorrar a largo plazo."},
    {question: "🧩 ¿Puedo contratar funciones extras sin cambiar de plan?", answer: "No como tal, pero en el Plan Gold puedes añadir expansiones específicas (más negocios, más empleados, etc.) con un costo adicional."},
    {question: "📱 ¿TurnoMaster tiene app móvil?", answer: "Por ahora no, pero el sistema está diseñado para funcionar perfectamente desde cualquier navegador móvil. Además, estamos explorando integraciones con WhatsApp para facilitar aún más el uso."},
    {question: "📨 ¿Recibiré notificaciones si un empleado falta o justifica?", answer: "Sí, desde el Plan Silver puedes activar notificaciones por correo para distintos eventos: inasistencias, justificaciones, rechazos, y más."},
    {question: "🔒 ¿Es seguro TurnoMaster?", answer: "Sí, utilizamos protocolos de seguridad avanzados para proteger tus datos. Además, cumplimos con las normativas de protección de datos vigentes."},
    {question: "💬 ¿Ofrecen soporte técnico?", answer: "Sí. Todos los planes pagados tienen acceso a soporte por correo. El Plan Gold incluye soporte prioritario con tiempo de respuesta reducido."},
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
