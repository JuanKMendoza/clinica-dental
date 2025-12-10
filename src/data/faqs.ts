// src/data/faqs.ts

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "general" | "tratamientos" | "pagos" | "emergencias" | "primera-cita";
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "¿Cuál es el horario de atención?",
    answer: "Atendemos de lunes a viernes de 8:00 AM a 7:00 PM y sábados de 8:00 AM a 2:00 PM. También ofrecemos citas de emergencia fuera de horario según disponibilidad.",
    category: "general"
  },
  {
    id: 2,
    question: "¿Aceptan mi seguro dental?",
    answer: "Trabajamos con las principales EPS y seguros dentales de Colombia. Contáctanos con tu seguro específico y te confirmamos si está en nuestra red. También ofrecemos planes de financiamiento propios.",
    category: "pagos"
  },
  {
    id: 3,
    question: "¿El blanqueamiento dental duele?",
    answer: "No, nuestro blanqueamiento dental con tecnología LED es completamente indoloro. Algunos pacientes pueden experimentar sensibilidad leve temporal, pero utilizamos gel desensibilizante para minimizar cualquier molestia.",
    category: "tratamientos"
  },
  {
    id: 4,
    question: "¿Cuánto dura un implante dental?",
    answer: "Con el cuidado adecuado, los implantes dentales pueden durar toda la vida. Tienen una tasa de éxito del 98% y están diseñados para ser una solución permanente. Incluimos garantía de 5 años en todos nuestros implantes.",
    category: "tratamientos"
  },
  {
    id: 5,
    question: "¿Qué debo hacer en caso de emergencia dental?",
    answer: "Llámanos inmediatamente al teléfono del consultorio. Atendemos emergencias dentales el mismo día: dolor severo, dientes rotos, sangrado, abscesos. Tenemos horarios de emergencia disponibles.",
    category: "emergencias"
  },
  {
    id: 6,
    question: "¿Qué incluye la primera cita?",
    answer: "La primera cita incluye examen dental completo, radiografías digitales, diagnóstico detallado y plan de tratamiento personalizado. Todo esto sin costo adicional. La consulta inicial tiene un valor de $50,000 COP.",
    category: "primera-cita"
  },
  {
    id: 7,
    question: "¿Ofrecen planes de pago?",
    answer: "Sí, ofrecemos múltiples opciones de financiamiento: pagos con tarjetas de crédito hasta 12 meses sin intereses, convenios con entidades financieras, y planes de pago flexibles directos con el consultorio.",
    category: "pagos"
  },
  {
    id: 8,
    question: "¿Cada cuánto debo hacerme limpieza dental?",
    answer: "Recomendamos limpieza dental profesional cada 6 meses para mantener una salud bucal óptima. Si tienes enfermedad periodontal o historial de caries, podríamos recomendar cada 3-4 meses.",
    category: "tratamientos"
  },
  {
    id: 9,
    question: "¿Los niños pueden venir al consultorio?",
    answer: "¡Por supuesto! Tenemos un área especializada de odontopediatría con ambiente amigable para niños. Recomendamos la primera visita al dentista cuando aparece el primer diente o máximo al primer año de edad.",
    category: "general"
  },
  {
    id: 10,
    question: "¿Qué tecnología utilizan?",
    answer: "Utilizamos tecnología de punta: radiografías digitales (90% menos radiación), escaneo intraoral 3D, láser dental, blanqueamiento LED, anestesia computarizada para inyecciones indoloras, y software de diseño de sonrisa digital.",
    category: "general"
  },
  {
    id: 11,
    question: "¿Cuánto cuesta la ortodoncia?",
    answer: "El costo de ortodoncia varía según la complejidad del caso. Brackets metálicos desde $3,500,000 COP, brackets estéticos desde $4,500,000 COP, y ortodoncia invisible desde $6,000,000 COP. Incluye todos los controles mensuales y retenedores.",
    category: "pagos"
  },
  {
    id: 12,
    question: "¿Puedo agendar cita online?",
    answer: "Sí, puedes agendar tu cita directamente desde nuestra página web las 24 horas. Elige fecha, hora y tipo de tratamiento. Recibirás confirmación inmediata por email y WhatsApp.",
    category: "general"
  },
  {
    id: 13,
    question: "¿Qué pasa si no puedo asistir a mi cita?",
    answer: "Entendemos que surgen imprevistos. Por favor, cancela o reagenda con mínimo 24 horas de anticipación llamando al consultorio o por WhatsApp. Así liberamos el espacio para otros pacientes.",
    category: "general"
  },
  {
    id: 14,
    question: "¿Es doloroso el tratamiento de conducto?",
    answer: "No, con la anestesia moderna el tratamiento de conducto es prácticamente indoloro. De hecho, eliminamos el dolor que causa la infección del nervio. Utilizamos técnicas mínimamente invasivas y tecnología rotato ria para mayor comodidad.",
    category: "tratamientos"
  },
  {
    id: 15,
    question: "¿Qué garantía ofrecen en los tratamientos?",
    answer: "Ofrecemos garantías específicas según el tratamiento: Implantes 5 años, carillas y coronas 3 años, blanqueamiento 1 año (con cuidados adecuados). Todos los tratamientos incluyen seguimiento sin costo adicional.",
    category: "tratamientos"
  }
];

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter(faq => faq.category === category);
}

export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery)
  );
}
