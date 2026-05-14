// =========================================================
// Reto Musicala Lite · js/results.js
// Resultados del mini juego según el puntaje obtenido.
// =========================================================

export const RESULTS = [
  {
    id: 'primer-acercamiento',
    minScore: 0,
    maxScore: 1,
    title: 'Ya sabes dónde empezar.',
    badge: 'Primer acercamiento',
    emoji: '🔎',
    description:
      'Estás empezando a familiarizarte con el pentagrama. Con una guía clara, las líneas y espacios dejan de sentirse como un código secreto.',
    whatsappMessage:
      'Hola Musicala, hice el Reto Musicala Lite y quiero empezar a aprender música desde cero.'
  },
  {
    id: 'buen-camino',
    minScore: 2,
    maxScore: 3,
    title: 'Vas por buen camino.',
    badge: 'Buen inicio',
    emoji: '🎵',
    description:
      'Ya reconoces algunas notas y empiezas a ubicarte mejor. El siguiente paso es practicar con patrones cortos y conectar la teoría con canciones reales.',
    whatsappMessage:
      'Hola Musicala, hice el Reto Musicala Lite y quiero fortalecer mis bases musicales.'
  },
  {
    id: 'base-solida',
    minScore: 4,
    maxScore: 4,
    title: 'Tienes una base sólida.',
    badge: 'Muy buen resultado',
    emoji: '🎼',
    description:
      'Reconoces la mayoría de notas del reto. Con práctica guiada puedes llevar esa lectura al instrumento, al ritmo y a repertorio musical.',
    whatsappMessage:
      'Hola Musicala, hice el Reto Musicala Lite y quiero seguir avanzando en lectura musical e instrumento.'
  },
  {
    id: 'reto-completado',
    minScore: 5,
    maxScore: 5,
    title: '¡Reto completado! ✨',
    badge: 'Puntaje perfecto',
    emoji: '✨',
    description:
      'Reconociste todas las notas. Ya tienes una base fuerte para subir de nivel con ritmo, lectura aplicada, oído e instrumento.',
    secretMessage:
      'Wow. Por lograr este puntaje te ganaste una clase de cortesía sin ningún costo. Reclámala escribiendo a nuestro WhatsApp con tu palabra secreta.',
    whatsappMessage:
      'Hola Musicala, logré 5/5 en el Reto Musicala Lectura. Palabra secreta: MANITO MUSICALA. Quiero reclamar mi clase de cortesía sin costo.'
  }
];

export const DEFAULT_RESULT = {
  id: 'resultado-general',
  minScore: 0,
  maxScore: 5,
  title: 'Ya sabes dónde empezar.',
  badge: 'Resultado final',
  emoji: '🎶',
  description:
    'Ya diste el primer paso para acercarte a la lectura musical. Esta fue una versión lite de una herramienta Musicala.',
  whatsappMessage:
    'Hola Musicala, hice el Reto Musicala Lite y quiero conocer las clases de música.'
};

export function getResultByScore(score) {
  const numericScore = Number(score);

  if (Number.isNaN(numericScore)) {
    return DEFAULT_RESULT;
  }

  return RESULTS.find((result) => {
    return numericScore >= result.minScore && numericScore <= result.maxScore;
  }) || DEFAULT_RESULT;
}
