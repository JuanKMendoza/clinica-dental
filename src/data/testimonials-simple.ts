// Testimonios simplificados de pacientes

export interface Testimonial {
  author: string;
  service: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    author: "María González",
    service: "Blanqueamiento Dental",
    text: "¡Increíble el cambio que vi en mi sonrisa! El Dr. es muy profesional y me explicó todo el proceso. Los resultados superaron mis expectativas. Ahora sonrío con mucha más confianza. 100% recomendado.",
    rating: 5
  },
  {
    author: "Carlos Ramírez",
    service: "Implantes Dentales",
    text: "Después de perder un diente en un accidente, pensé que nunca volvería a sonreír igual. El implante quedó perfecto, se ve y se siente como mi diente natural. Muy agradecido con todo el equipo.",
    rating: 5
  },
  {
    author: "Ana Sofía Martínez",
    service: "Carillas de Porcelana",
    text: "Siempre quise tener una sonrisa perfecta. Con las carillas lo logré. El resultado es súper natural, nadie nota que son carillas. ¡Estoy feliz con mi nueva sonrisa!",
    rating: 5
  },
  {
    author: "Roberto Silva",
    service: "Ortodoncia",
    text: "Usé brackets por 18 meses y valió totalmente la pena. Mi mordida mejoró, mis dientes están perfectamente alineados. El seguimiento mensual fue excelente.",
    rating: 5
  },
  {
    author: "Laura Pérez",
    service: "Diseño de Sonrisa",
    text: "El diseño de sonrisa digital me permitió ver el resultado antes de empezar. Combinaron blanqueamiento y carillas. El resultado es espectacular. Me siento otra persona.",
    rating: 5
  },
  {
    author: "Diego Torres",
    service: "Endodoncia",
    text: "Tenía mucho miedo al tratamiento de conducto, pero fue totalmente indoloro. El dentista fue muy paciente y usó tecnología moderna. Salvaron mi diente.",
    rating: 5
  },
  {
    author: "Valentina (mamá)",
    service: "Odontopediatría",
    text: "Mi hija le tenía pánico al dentista. El consultorio tiene un ambiente super amigable para niños. Ahora mi hija hasta se emociona cuando toca cita dental.",
    rating: 5
  },
  {
    author: "Andrés Moreno",
    service: "Limpieza Dental",
    text: "Vengo cada 6 meses para mi limpieza. El servicio es excelente, siempre puntual y profesional. Me detectaron una caries a tiempo. Recomiendo 100%.",
    rating: 5
  }
];
