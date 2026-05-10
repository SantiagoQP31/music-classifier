import type { Genre } from '../types';

export interface GenreInfo {
    color: string;
    description: string;
    tracks: { artist: string; title: string }[];
}

export const GENRE_INFO: Record<Genre, GenreInfo> = {
    'Clásica': {
    color: '#C9A96E',
    description:
      'Música de tradición europea con estructuras formales complejas y gran riqueza orquestal. Su lenguaje armónico ha servido de base para prácticamente todos los géneros modernos.',
    tracks: [
      { artist: 'Ludwig van Beethoven', title: 'Sinfonía No. 9' },
      { artist: 'Claude Debussy',       title: 'Clair de Lune' },
      { artist: 'Johann Sebastian Bach', title: 'Cello Suite No. 1' },
    ],
  },
  'Electrónica': {
    color: '#00F5D4',
    description:
      'Género construido desde la síntesis de sonido y la tecnología como instrumento principal. Abarca desde el minimalismo del ambient hasta la intensidad del techno.',
    tracks: [
      { artist: 'Daft Punk',        title: 'Get Lucky' },
      { artist: 'Aphex Twin',       title: 'Windowlicker' },
      { artist: 'Boards of Canada', title: 'Roygbiv' },
    ],
  },
  'Hip-Hop': {
    color: '#FF6B35',
    description:
      'Nacido en el Bronx en los años 70, el hip-hop combina beats sincopados, samples y una tradición lírica que documenta la realidad urbana con precisión poética.',
    tracks: [
      { artist: 'Kendrick Lamar', title: 'HUMBLE.' },
      { artist: 'Nas',            title: 'N.Y. State of Mind' },
      { artist: 'Jay-Z',          title: 'Empire State of Mind' },
    ],
  },
  'Jazz': {
    color: '#A855F7',
    description:
      'Música de improvisación y diálogo entre músicos. El jazz transformó permanentemente la noción occidental de ritmo, armonía y expresión individual dentro de un conjunto.',
    tracks: [
      { artist: 'Miles Davis',   title: 'So What' },
      { artist: 'John Coltrane', title: 'A Love Supreme' },
      { artist: 'Bill Evans',    title: 'Waltz for Debby' },
    ],
  },
  'Pop': {
    color: '#FF3F8E',
    description:
      'El pop no es un género de instrumentación sino de intención: canciones diseñadas para ser inmediatas, memorables y universales. Su aparente simplicidad esconde producción altamente sofisticada.',
    tracks: [
      { artist: 'Michael Jackson', title: 'Billie Jean' },
      { artist: 'The Weeknd',      title: 'Blinding Lights' },
      { artist: 'Dua Lipa',        title: 'Levitating' },
    ],
  },
  'Rock': {
    color: '#E63946',
    description:
      'Construido sobre la guitarra eléctrica y la tensión entre distorsión y melodía. El rock abarca desde la delicadeza del folk-rock hasta la agresividad del metal, pero siempre con energía como eje.',
    tracks: [
      { artist: 'Led Zeppelin',       title: 'Stairway to Heaven' },
      { artist: 'Nirvana',            title: 'Smells Like Teen Spirit' },
      { artist: 'The Rolling Stones', title: 'Paint It Black' },
    ],
  },
  'Vallenato': {
    color: '#F4D03F',
    description:
      'Patrimonio cultural de Colombia y la Costa Caribe. El vallenato narra historias cotidianas con acordeón, caja y guacharaca, combinando melancolía y celebración en la misma canción.',
    tracks: [
      { artist: 'Carlos Vives',  title: 'La Bicicleta' },
      { artist: 'Diomedes Díaz', title: 'La Inconformidad' },
      { artist: 'Carlos Vives',  title: 'Volví a Nacer' },
    ],
  },
};

export const RECORDING_DURATION_MS = 8000;
export const API_BASE_URL = 'http://localhost:8000';
