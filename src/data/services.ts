// src/data/services.ts

export interface DentalService {
  id: number;
  slug: string;
  name: string;
  category: "preventiva" | "estetica" | "restauradora" | "cirugia" | "ortodoncia" | "infantil";
  shortDescription: string;
  longDescription: string;
  icon: string; // Ionicon name
  benefits: string[];
  duration: string;
  priceRange: string;
  featured: boolean;
  image?: string;
}

export const dentalServices: DentalService[] = [
  {
    id: 1,
    slug: "limpieza-dental",
    name: "Limpieza Dental Profesional",
    category: "preventiva",
    shortDescription: "Elimina placa, sarro y manchas para una sonrisa saludable y brillante",
    longDescription: "La limpieza dental profesional es fundamental para mantener una salud bucal óptima. Nuestro procedimiento incluye remoción de sarro, pulido dental y aplicación de flúor. Recomendamos realizarla cada 6 meses para prevenir enfermedades periodontales y caries.",
    icon: "sparkles",
    benefits: [
      "Previene caries y enfermedades de las encías",
      "Elimina manchas superficiales",
      "Aliento más fresco",
      "Detección temprana de problemas dentales",
      "Sonrisa más brillante y saludable"
    ],
    duration: "45-60 minutos",
    priceRange: "$80,000 - $120,000 COP",
    featured: true
  },
  {
    id: 2,
    slug: "blanqueamiento-dental",
    name: "Blanqueamiento Dental",
    category: "estetica",
    shortDescription: "Sonrisa hasta 8 tonos más blanca con tecnología láser de última generación",
    longDescription: "Nuestro blanqueamiento dental profesional utiliza tecnología LED de última generación para lograr resultados visibles desde la primera sesión. El tratamiento es seguro, indoloro y los resultados pueden durar hasta 2 años con el cuidado adecuado.",
    icon: "moon",
    benefits: [
      "Resultados visibles en una sola sesión",
      "Hasta 8 tonos más blanco",
      "Tecnología LED sin sensibilidad",
      "Resultados duraderos (1-2 años)",
      "Aumenta tu confianza y autoestima"
    ],
    duration: "60-90 minutos",
    priceRange: "$350,000 - $550,000 COP",
    featured: true
  },
  {
    id: 3,
    slug: "implantes-dentales",
    name: "Implantes Dentales",
    category: "cirugia",
    shortDescription: "Solución permanente para reemplazar dientes perdidos con aspecto natural",
    longDescription: "Los implantes dentales son la mejor solución para reemplazar dientes perdidos. Utilizamos implantes de titanio de grado médico que se integran completamente con el hueso. El resultado es un diente que se ve, siente y funciona como natural.",
    icon: "construct",
    benefits: [
      "Solución permanente y duradera",
      "Aspecto 100% natural",
      "Preserva el hueso maxilar",
      "No afecta dientes adyacentes",
      "Come y habla con confianza",
      "Tasa de éxito del 98%"
    ],
    duration: "3-6 meses (proceso completo)",
    priceRange: "$2,500,000 - $4,000,000 COP por implante",
    featured: true
  },
  {
    id: 4,
    slug: "ortodoncia-brackets",
    name: "Ortodoncia con Brackets",
    category: "ortodoncia",
    shortDescription: "Corrige la posición de tus dientes con brackets metálicos o estéticos",
    longDescription: "La ortodoncia con brackets es el tratamiento más efectivo para corregir problemas de alineación y mordida. Ofrecemos brackets metálicos tradicionales y estéticos (cerámica) según tus preferencias. Incluye seguimiento mensual y ajustes.",
    icon: "grid",
    benefits: [
      "Sonrisa perfectamente alineada",
      "Mejora la función de masticación",
      "Previene desgaste dental",
      "Facilita la higiene bucal",
      "Opciones estéticas disponibles",
      "Incluye retenedores post-tratamiento"
    ],
    duration: "12-24 meses",
    priceRange: "$3,500,000 - $6,000,000 COP",
    featured: true
  },
  {
    id: 5,
    slug: "carillas-dentales",
    name: "Carillas de Porcelana",
    category: "estetica",
    shortDescription: "Transforma tu sonrisa con láminas ultrafinas de porcelana",
    longDescription: "Las carillas de porcelana son láminas delgadas que se adhieren a la superficie frontal de los dientes. Ideales para corregir forma, color, tamaño y alineación menor. Resultados instantáneos con apariencia totalmente natural.",
    icon: "layers",
    benefits: [
      "Transformación inmediata de la sonrisa",
      "Aspecto natural y duradero",
      "Resistentes a manchas",
      "Duración de 10-15 años",
      "Procedimiento mínimamente invasivo",
      "Personaliza forma y color"
    ],
    duration: "2-3 sesiones",
    priceRange: "$800,000 - $1,200,000 COP por carilla",
    featured: false
  },
  {
    id: 6,
    slug: "endodoncia",
    name: "Endodoncia (Tratamiento de Conducto)",
    category: "restauradora",
    shortDescription: "Salva tu diente natural eliminando la infección del nervio",
    longDescription: "La endodoncia o tratamiento de conducto es necesaria cuando la pulpa dental está infectada o dañada. El procedimiento elimina el tejido infectado, limpia y sella los conductos. Con tecnología moderna, el tratamiento es prácticamente indoloro.",
    icon: "medical",
    benefits: [
      "Salva el diente natural",
      "Elimina dolor severo",
      "Previene infecciones graves",
      "Procedimiento indoloro con anestesia",
      "Alta tasa de éxito",
      "Evita extracciones"
    ],
    duration: "1-2 sesiones de 60-90 minutos",
    priceRange: "$250,000 - $450,000 COP",
    featured: false
  },
  {
    id: 7,
    slug: "coronas-dentales",
    name: "Coronas Dentales",
    category: "restauradora",
    shortDescription: "Restaura dientes dañados con coronas de porcelana o zirconio",
    longDescription: "Las coronas dentales cubren completamente un diente dañado, fracturado o con endodoncia previa. Utilizamos porcelana de alta calidad o zirconio para resultados estéticos y funcionales óptimos. Duración de 10-15 años.",
    icon: "shield-checkmark",
    benefits: [
      "Protege dientes debilitados",
      "Aspecto natural",
      "Restaura función completa",
      "Altamente duraderas",
      "Previene fracturas",
      "Mejora estética dental"
    ],
    duration: "2-3 sesiones",
    priceRange: "$600,000 - $1,200,000 COP",
    featured: false
  },
  {
    id: 8,
    slug: "extraccion-muelas-juicio",
    name: "Extracción de Muelas del Juicio",
    category: "cirugia",
    shortDescription: "Extracción segura y sin dolor de terceros molares problemáticos",
    longDescription: "La extracción de muelas del juicio es necesaria cuando causan dolor, infección o problemas de alineación. Utilizamos técnicas modernas y sedación consciente para tu comodidad. Recuperación rápida con nuestro protocolo post-operatorio.",
    icon: "cut",
    benefits: [
      "Elimina dolor y molestias",
      "Previene infecciones",
      "Protege dientes adyacentes",
      "Sedación disponible",
      "Protocolo de recuperación rápida",
      "Seguimiento post-operatorio incluido"
    ],
    duration: "30-60 minutos por muela",
    priceRange: "$150,000 - $350,000 COP por muela",
    featured: false
  },
  {
    id: 9,
    slug: "odontopediatria",
    name: "Odontopediatría",
    category: "infantil",
    shortDescription: "Cuidado dental especializado para niños en ambiente amigable",
    longDescription: "Nuestro servicio de odontopediatría crea experiencias positivas para los más pequeños. Atención especializada, ambiente amigable y técnicas adaptadas a cada edad. Incluye prevención, tratamiento y educación en salud bucal infantil.",
    icon: "happy",
    benefits: [
      "Atención especializada en niños",
      "Ambiente amigable y divertido",
      "Prevención temprana de problemas",
      "Educación en higiene bucal",
      "Sellantes de fosas y fisuras",
      "Experiencia positiva para el niño"
    ],
    duration: "30-45 minutos",
    priceRange: "$60,000 - $150,000 COP",
    featured: false
  },
  {
    id: 10,
    slug: "diseno-sonrisa",
    name: "Diseño de Sonrisa Digital",
    category: "estetica",
    shortDescription: "Planifica tu sonrisa perfecta con tecnología 3D antes del tratamiento",
    longDescription: "El diseño de sonrisa digital utiliza software avanzado para crear una vista previa 3D de tu sonrisa ideal. Combinamos múltiples tratamientos (carillas, coronas, blanqueamiento) en un plan personalizado. Ve tu resultado final antes de comenzar.",
    icon: "color-wand",
    benefits: [
      "Visualiza tu sonrisa antes del tratamiento",
      "Plan personalizado completo",
      "Combina múltiples procedimientos",
      "Tecnología 3D de última generación",
      "Garantía de resultados",
      "Coordinación perfecta de tratamientos"
    ],
    duration: "Consulta de 90 minutos + tratamientos",
    priceRange: "$5,000,000 - $15,000,000 COP (plan completo)",
    featured: true
  }
];

// Helper functions
export function getServiceBySlug(slug: string): DentalService | undefined {
  return dentalServices.find(s => s.slug === slug);
}

export function getServicesByCategory(category: string): DentalService[] {
  return dentalServices.filter(s => s.category === category);
}

export function getFeaturedServices(): DentalService[] {
  return dentalServices.filter(s => s.featured);
}
