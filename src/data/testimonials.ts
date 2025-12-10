// src/data/testimonials.ts

export interface Testimonial {
  id: number;
  name: string;
  age: number;
  treatment: string;
  text: string;
  rating: number;
  date: string;
  image?: string; // Avatar del paciente
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    age: 32,
    treatment: "Blanqueamiento Dental",
    text: "¡Increíble! Mi sonrisa cambió completamente. El Dr. y su equipo son super profesionales y me explicaron todo el proceso. Los resultados superaron mis expectativas. Ahora sonrío con mucha más confianza.",
    rating: 5,
    date: "2025-09-15"
  },
  {
    id: 2,
    name: "Carlos Ramírez",
    age: 45,
    treatment: "Implantes Dentales",
    text: "Después de perder un diente en un accidente, pensé que nunca volvería a sonreír igual. El implante quedó perfecto, se ve y se siente como mi diente natural. El proceso fue más rápido de lo que esperaba.",
    rating: 5,
    date: "2025-08-22"
  },
  {
    id: 3,
    name: "Ana Sofía Martínez",
    age: 28,
    treatment: "Carillas de Porcelana",
    text: "Siempre quise tener una sonrisa perfecta como las de las revistas. Con las carillas lo logré. El resultado es súper natural, nadie nota que son carillas. ¡Estoy feliz con mi nueva sonrisa!",
    rating: 5,
    date: "2025-09-01"
  },
  {
    id: 4,
    name: "Roberto Silva",
    age: 38,
    treatment: "Ortodoncia",
    text: "Usé brackets por 18 meses y valió totalmente la pena. Mi mordida mejoró, mis dientes están perfectamente alineados y el seguimiento mensual fue excelente. El equipo siempre fue muy atento.",
    rating: 5,
    date: "2025-07-10"
  },
  {
    id: 5,
    name: "Laura Pérez",
    age: 25,
    treatment: "Diseño de Sonrisa",
    text: "El diseño de sonrisa digital me permitió ver cómo quedaría mi sonrisa antes de empezar. Combinaron blanqueamiento y carillas, el resultado es espectacular. Me siento otra persona.",
    rating: 5,
    date: "2025-08-05"
  },
  {
    id: 6,
    name: "Diego Torres",
    age: 42,
    treatment: "Endodoncia",
    text: "Tenía mucho miedo al tratamiento de conducto, pero fue totalmente indoloro. El dentista fue muy paciente, me explicó todo y usó tecnología moderna. Salvaron mi diente y estoy muy agradecido.",
    rating: 5,
    date: "2025-09-20"
  },
  {
    id: 7,
    name: "Valentina Ruiz",
    age: 7,
    treatment: "Odontopediatría",
    text: "Mi hija le tenía pánico al dentista. El consultorio tiene un ambiente super amigable para niños y la doctora es increíble. Ahora mi hija hasta se emociona cuando toca cita dental.",
    rating: 5,
    date: "2025-09-12"
  },
  {
    id: 8,
    name: "Andrés Moreno",
    age: 29,
    treatment: "Limpieza Dental",
    text: "Vengo cada 6 meses para mi limpieza. El servicio es excelente, siempre puntual y profesional. Me detectaron una caries a tiempo en una de las limpiezas. Recomiendo 100% este consultorio.",
    rating: 5,
    date: "2025-09-25"
  }
];

export function getTestimonialsByTreatment(treatment: string): Testimonial[] {
  return testimonials.filter(t => 
    t.treatment.toLowerCase().includes(treatment.toLowerCase())
  );
}

export function getRandomTestimonials(count: number = 3): Testimonial[] {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRecentTestimonials(count: number = 5): Testimonial[] {
  return testimonials
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
