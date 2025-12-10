// Servicios dentales simplificados para el consultorio

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  benefits?: string[];
  duration?: string;
  procedure?: string;
}

export const services: Service[] = [
  {
    id: "limpieza",
    name: "Limpieza Dental",
    description: "Profilaxis completa con ultrasonido, pulido y fluorización",
    icon: "✨",
    price: 80000,
    benefits: [
      "Elimina placa y sarro acumulado",
      "Previene caries y enfermedades de encías",
      "Aliento más fresco",
      "Sonrisa más brillante"
    ],
    duration: "45 minutos",
    procedure: "Limpieza profunda con ultrasonido, pulido dental, aplicación de flúor y evaluación completa de salud bucal."
  },
  {
    id: "blanqueamiento",
    name: "Blanqueamiento Dental",
    description: "Sonrisa hasta 8 tonos más blanca con tecnología LED",
    icon: "🦷",
    price: 450000,
    benefits: [
      "Resultados visibles en una sola sesión",
      "Hasta 8 tonos más blanco",
      "Sin sensibilidad con tecnología LED",
      "Duración de 1-2 años con cuidados",
      "Aumenta tu confianza"
    ],
    duration: "60-90 minutos",
    procedure: "Aplicación de gel blanqueador profesional activado con luz LED, seguido de tratamiento desensibilizante."
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia / Brackets",
    description: "Corrige alineación y mordida con brackets metálicos o estéticos",
    icon: "😁",
    price: 4500000,
    benefits: [
      "Sonrisa perfectamente alineada",
      "Mejora función de masticación",
      "Previene desgaste dental irregular",
      "Opciones metálicas o estéticas",
      "Incluye retenedores finales"
    ],
    duration: "12-24 meses",
    procedure: "Estudio completo con radiografías, colocación de brackets, ajustes mensuales y seguimiento continuo."
  },
  {
    id: "implantes",
    name: "Implantes Dentales",
    description: "Solución permanente para reemplazar dientes perdidos",
    icon: "🔧",
    price: 3500000,
    benefits: [
      "Aspecto 100% natural",
      "Solución permanente (vida útil de 20+ años)",
      "Preserva hueso maxilar",
      "Come con confianza",
      "No afecta dientes adyacentes",
      "98% tasa de éxito"
    ],
    duration: "3-6 meses proceso completo",
    procedure: "Cirugía de colocación de implante de titanio, período de osteointegración, colocación de corona personalizada."
  },
  {
    id: "resinas",
    name: "Resinas Estéticas",
    description: "Restauraciones del color del diente para caries y fracturas",
    icon: "💎",
    price: 120000,
    benefits: [
      "Aspecto completamente natural",
      "Preserva estructura dental sana",
      "Procedimiento en una sola sesión",
      "Sin metal (libre de amalgama)",
      "Resistente y duradero"
    ],
    duration: "30-60 minutos",
    procedure: "Remoción de caries, preparación del diente, aplicación de resina composite del color del diente."
  },
  {
    id: "endodoncia",
    name: "Endodoncia / Conductos",
    description: "Tratamiento de conducto para salvar dientes infectados",
    icon: "🩺",
    price: 350000,
    benefits: [
      "Salva el diente natural",
      "Elimina dolor severo",
      "Previene infecciones graves",
      "Procedimiento indoloro con anestesia",
      "Alta tasa de éxito (95%)",
      "Evita extracción"
    ],
    duration: "1-2 sesiones de 90 minutos",
    procedure: "Remoción de pulpa infectada, limpieza y desinfección de conductos, sellado hermético."
  },
  {
    id: "protesis",
    name: "Prótesis Dentales",
    description: "Prótesis removibles totales o parciales",
    icon: "🦷",
    price: 800000,
    benefits: [
      "Restaura función masticatoria",
      "Mejora estética facial",
      "Cómoda y ajustada",
      "Fácil mantenimiento",
      "Opciones flexibles o rígidas"
    ],
    duration: "3-4 sesiones",
    procedure: "Toma de impresiones, pruebas de ajuste, fabricación personalizada, entrega y ajustes finales."
  },
  {
    id: "cirugia",
    name: "Cirugía / Extracción",
    description: "Extracción de muelas del juicio y cirugías orales",
    icon: "⚕️",
    price: 250000,
    benefits: [
      "Elimina dolor y molestias",
      "Previene infecciones",
      "Sedación disponible",
      "Recuperación rápida",
      "Seguimiento post-operatorio incluido"
    ],
    duration: "30-60 minutos",
    procedure: "Evaluación con radiografía, anestesia local, extracción cuidadosa, sutura si necesario, medicación."
  }
];
