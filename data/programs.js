// =========================================================
// Reto Musicala Lite
// Archivo: data/programs.js
// Información de programas, modalidades y accesos comerciales
// =========================================================

export const PROGRAMS = [
  {
    id: "musicala-sede",
    icon: "🏫",
    title: "Musicala Sede",
    modality: "Presencial",
    audience: "Niños, jóvenes y adultos",
    shortDescription:
      "Clases presenciales en nuestra escuela, con espacios preparados para aprender música de forma cercana, creativa y progresiva.",
    description:
      "Ideal para estudiantes que quieren vivir su proceso artístico en un espacio musical, con acompañamiento docente, recursos pedagógicos y una experiencia completa dentro de la Escuela de Artes Musicala.",
    priceFrom: "$280.000 COP",
    priceNote: "Valor de referencia según intensidad y proceso.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero información sobre clases presenciales en sede.",
    ctaLabel: "Consultar sede",
    tags: ["Presencial", "Música", "Proceso guiado"]
  },

  {
    id: "musicala-hogar",
    icon: "🏡",
    title: "Musicala Hogar",
    modality: "A domicilio",
    audience: "Niños, jóvenes y adultos",
    shortDescription:
      "Clases personalizadas a domicilio para aprender desde casa con guía profesional y seguimiento.",
    description:
      "Pensado para estudiantes y familias que prefieren recibir la clase en casa, manteniendo una experiencia personalizada, flexible y conectada con sus objetivos artísticos.",
    priceFrom: "$288.000 COP",
    priceNote: "Valor de referencia según ubicación, intensidad y tipo de clase.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero información sobre clases a domicilio.",
    ctaLabel: "Consultar hogar",
    tags: ["A domicilio", "Personalizado", "Flexible"]
  },

  {
    id: "musicala-virtual",
    icon: "💻",
    title: "Musicala Virtual",
    modality: "Virtual en vivo",
    audience: "Niños, jóvenes y adultos",
    shortDescription:
      "Clases en vivo por videollamada para aprender desde cualquier lugar con acompañamiento personalizado.",
    description:
      "Una opción práctica para quienes quieren avanzar en música desde casa o desde otra ciudad, con clases en vivo, guía docente y recursos digitales de apoyo.",
    priceFrom: "$56.000 COP",
    priceNote: "Valor de referencia según plan, intensidad y formato.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero información sobre clases virtuales de música.",
    ctaLabel: "Consultar virtual",
    tags: ["Virtual", "En vivo", "Desde casa"]
  },

  {
    id: "musicalitos",
    icon: "🌈",
    title: "Musicalitos",
    modality: "Iniciación musical",
    audience: "Niños y niñas",
    shortDescription:
      "Procesos de iniciación musical para que los niños exploren ritmo, sonido, movimiento y creatividad.",
    description:
      "Un programa pensado para acercar a los niños al mundo musical desde el juego, la exploración sonora, el cuerpo, la creatividad y experiencias adaptadas a su edad.",
    priceFrom: "Consultar plan",
    priceNote: "El valor depende de modalidad, edad e intensidad.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero información sobre Musicalitos.",
    ctaLabel: "Consultar Musicalitos",
    tags: ["Niños", "Iniciación", "Creatividad"]
  },

  {
    id: "jovenes-adultos",
    icon: "🎹",
    title: "Música para jóvenes y adultos",
    modality: "Sede, hogar o virtual",
    audience: "Jóvenes y adultos",
    shortDescription:
      "Clases para empezar o retomar un proceso musical sin importar la edad o el nivel inicial.",
    description:
      "Ideal para quienes siempre han querido cantar, tocar un instrumento, componer o entender la música con más claridad. Porque aplazar sueños también cansa, aunque la agenda finja que no.",
    priceFrom: "Desde $56.000 COP",
    priceNote: "El valor depende de modalidad e intensidad.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero empezar o retomar mi proceso musical.",
    ctaLabel: "Quiero empezar",
    tags: ["Principiantes", "Adultos", "Instrumento o canto"]
  },

  {
    id: "preuniversitario",
    icon: "🎓",
    title: "Preuniversitario Musical",
    modality: "Preparación artística",
    audience: "Aspirantes a programas musicales",
    shortDescription:
      "Preparación para fortalecer teoría, instrumento, audición, lectura musical y procesos de admisión.",
    description:
      "Un proceso dirigido a estudiantes que quieren prepararse para ingresar a programas musicales o fortalecer sus bases antes de asumir un reto académico más exigente.",
    priceFrom: "Consultar plan",
    priceNote: "El valor depende del proceso, duración e intensidad.",
    whatsappMessage:
      "Hola Musicala, hice el Reto Musicala Lite y quiero información sobre el Preuniversitario Musical.",
    ctaLabel: "Consultar preuniversitario",
    tags: ["Preparación", "Teoría", "Admisiones"]
  }
];

export const PRICE_REFERENCES = [
  {
    id: "virtual",
    label: "Musicala Virtual",
    value: "Desde $56.000 COP",
    description: "Clases en vivo por videollamada."
  },
  {
    id: "sede",
    label: "Musicala Sede",
    value: "Desde $280.000 COP",
    description: "Clases presenciales en la escuela."
  },
  {
    id: "hogar",
    label: "Musicala Hogar",
    value: "Desde $288.000 COP",
    description: "Clases personalizadas a domicilio."
  },
  {
    id: "matricula",
    label: "Matrícula anual",
    value: "$60.000 COP",
    description: "Valor anual de matrícula Musicala."
  }
];

export const FEATURED_LINKS = [
  {
    id: "whatsapp",
    icon: "💬",
    title: "WhatsApp",
    description: "Habla con Musicala y recibe orientación sobre clases, planes y modalidades.",
    url: "https://wa.me/573195477475?text=Hola%20Musicala%2C%20hice%20el%20Reto%20Musicala%20Lite%20y%20quiero%20recibir%20informaci%C3%B3n.",
    ctaLabel: "Hablar por WhatsApp",
    isPrimary: true
  },
  {
    id: "musibot",
    icon: "🤖",
    title: "Musibot",
    description: "Pregunta por programas, horarios, modalidades, precios y más información.",
    url: "https://musicala.github.io/musibot/",
    ctaLabel: "Probar Musibot",
    isPrimary: false
  },
  {
    id: "website",
    icon: "🌐",
    title: "Página web",
    description: "Explora más información sobre Musicala y sus servicios artísticos.",
    url: "https://musicala.com.co",
    ctaLabel: "Ir a la página web",
    isPrimary: false
  }
];

export const PROGRAMS_COPY = {
  sectionEyebrow: "Programas Musicala",
  sectionTitle: "Elige cómo quieres empezar",
  sectionDescription:
    "Tenemos opciones para niños, jóvenes y adultos en diferentes modalidades. Cada proceso puede adaptarse según el nivel, la edad, la intensidad y los objetivos del estudiante.",

  pricingEyebrow: "Planes y valores",
  pricingTitle: "Planes desde",
  pricingDescription:
    "Los valores pueden variar según modalidad, intensidad, edad, ubicación y tipo de proceso. Te orientamos para elegir el plan que más sentido tenga para ti.",

  disclaimer:
    "Valores de referencia. La recomendación final depende del proceso artístico, la modalidad elegida y la intensidad de clases."
};