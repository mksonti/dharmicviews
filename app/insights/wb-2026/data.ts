// Source: West Bengal Assembly Election 2026 — Gamma deck + PGurus video analysis
// (Mohan Sonti / Sree Iyer). Figures as presented in the deck; some are widely-cited
// estimates rather than official statistics — see analyst notes in the page itself.

export type Election = {
  key: string;
  label: string;
  shortLabel: string;
  type: 'Assembly' | 'Lok Sabha';
  year: number;
  turnout: number | null;
  registeredVotersM: number | null;
  aitcSeats: number | null;
  aitcVote: number | null;
  bjpSeats: number | null;
  bjpVote: number | null;
  incSeats: number | null;
  cpmSeats: number | null;
  totalSeats: number;
  videoTimestamp?: number;
};

export const elections: Election[] = [
  {
    key: 'a2006',
    label: 'Assembly 2006',
    shortLabel: '2006',
    type: 'Assembly',
    year: 2006,
    turnout: null,
    registeredVotersM: 48,
    aitcSeats: 30,
    aitcVote: 26.4,
    bjpSeats: 0,
    bjpVote: 1.93,
    incSeats: 21,
    cpmSeats: 176,
    totalSeats: 294,
  },
  {
    key: 'a2011',
    label: 'Assembly 2011',
    shortLabel: '2011',
    type: 'Assembly',
    year: 2011,
    turnout: null,
    registeredVotersM: 56,
    aitcSeats: 184,
    aitcVote: 38.9,
    bjpSeats: 0,
    bjpVote: 4.06,
    incSeats: 42,
    cpmSeats: 40,
    totalSeats: 294,
  },
  {
    key: 'a2016',
    label: 'Assembly 2016',
    shortLabel: '2016',
    type: 'Assembly',
    year: 2016,
    turnout: 83.02,
    registeredVotersM: 65.94,
    aitcSeats: 211,
    aitcVote: 44.91,
    bjpSeats: 3,
    bjpVote: 10.16,
    incSeats: 44,
    cpmSeats: 26,
    totalSeats: 294,
  },
  {
    key: 'l2019',
    label: 'Lok Sabha 2019',
    shortLabel: 'LS 2019',
    type: 'Lok Sabha',
    year: 2019,
    turnout: 81.76,
    registeredVotersM: 70,
    aitcSeats: 22,
    aitcVote: 43.28,
    bjpSeats: 18,
    bjpVote: 40.25,
    incSeats: 2,
    cpmSeats: 0,
    totalSeats: 42,
  },
  {
    key: 'a2021',
    label: 'Assembly 2021',
    shortLabel: '2021',
    type: 'Assembly',
    year: 2021,
    turnout: 82.30,
    registeredVotersM: 73.41,
    aitcSeats: 215,
    aitcVote: 48.02,
    bjpSeats: 77,
    bjpVote: 37.97,
    incSeats: 0,
    cpmSeats: 0,
    totalSeats: 294,
  },
  {
    key: 'l2024',
    label: 'Lok Sabha 2024',
    shortLabel: 'LS 2024',
    type: 'Lok Sabha',
    year: 2024,
    turnout: 79.59,
    registeredVotersM: 76.0,
    aitcSeats: 29,
    aitcVote: 46.02,
    bjpSeats: 12,
    bjpVote: 39.10,
    incSeats: 1,
    cpmSeats: 0,
    totalSeats: 42,
  },
  {
    key: 'a2026',
    label: 'Assembly 2026',
    shortLabel: '2026',
    type: 'Assembly',
    year: 2026,
    turnout: 92.93,
    registeredVotersM: 68.25,
    aitcSeats: 80,
    aitcVote: 40.80,
    bjpSeats: 207,
    bjpVote: 45.85,
    incSeats: 2,
    cpmSeats: 1,
    totalSeats: 294,
  },
];

export const seat2026 = [
  { party: 'BJP',   seats: 207, color: '#ea7c1c', share: 70.41 },
  { party: 'AITC',  seats: 80,  color: '#1f7a4d', share: 27.21 },
  { party: 'INC',   seats: 2,   color: '#2563eb', share: 0.68 },
  { party: 'AJUP',  seats: 2,   color: '#a16207', share: 0.68 },
  { party: 'CPI(M)',seats: 1,   color: '#b91c1c', share: 0.34 },
  { party: 'ISF',   seats: 1,   color: '#1e3a8a', share: 0.34 },
  { party: 'Vacant',seats: 1,   color: '#d6d3d1', share: 0.34 },
];

export const eras = [
  {
    key: 'inc',
    party: 'INC Era',
    range: '1950 – 1977',
    duration: '~27 years in power',
    color: '#2563eb',
    note: 'Congress dominates post-independence Bengal in alliance with national political consensus.',
  },
  {
    key: 'cpm',
    party: 'CPI(M) Era',
    range: '1977 – 2011',
    duration: '~34 years in power',
    color: '#b91c1c',
    note: 'World record: longest democratically elected Communist government in history.',
  },
  {
    key: 'tmc',
    party: 'TMC Era',
    range: '2011 – 2026',
    duration: '15 years in power',
    color: '#1f7a4d',
    note: "Mamata Banerjee's Trinamool breaks the Left's grip, then consolidates dominance — until 2026.",
  },
  {
    key: 'bjp',
    party: 'BJP Era',
    range: '2026 →',
    duration: '207 seats / 45.85%',
    color: '#ea7c1c',
    note: 'Sweeps to power on highest-ever Assembly turnout of 92.93% — a historic mandate.',
  },
];

export const headlineStats = [
  {
    figure: '207',
    label: 'BJP Seats 2026',
    sub: 'Up from just 3 in 2016 — a 69× increase in seat count over a single decade.',
  },
  {
    figure: '+35.69%',
    label: 'BJP Vote Share Gain',
    sub: 'From 10.16% (2016 Assembly) to 45.85% (2026 Assembly) — the steepest climb by any party in WB history.',
  },
  {
    figure: '80',
    label: 'TMC Seats 2026',
    sub: 'Down from 215 in 2021 — a collapse of 135 seats despite holding ~40% of the popular vote.',
  },
  {
    figure: '92.93%',
    label: 'Turnout 2026',
    sub: 'Record-high Assembly turnout, nearly 10 points above the national average — reflecting intense mobilization on both sides.',
  },
];

export const populationContext = [
  { label: 'India population (2006 → 2025)', from: '1.173 B', to: '1.442 B', delta: '+22.9%' },
  { label: 'West Bengal population (2006 → 2025)', from: '85 M', to: '100 M', delta: '+17.7%' },
  { label: 'Registered voters (2006 → 2024)', from: '~48 M', to: '~76 M', delta: '+58.3%' },
];

export const demographics = {
  comparisons: [
    { name: 'Assam',        m2011: '35%', est2031: '39%',   migrants: '~5 M migrants (15% of population)' },
    { name: 'West Bengal',  m2011: '28%', est2031: '31%',   migrants: '~5.7 M migrants (5% of population)' },
    { name: 'Bangladesh',   m2011: '92%', est2031: '—',     migrants: 'Hindu population (2022): 7.95% — down from ~28% at Partition (1947)' },
    { name: 'Kashmir',      m2011: '—',   est2031: '—',     migrants: '1990 Hindu population: 350K–500K+ (8.75%+) of 4 M total' },
  ],
  vectors: [
    {
      title: 'Growth (Fertility)',
      body: 'Higher fertility rates among Muslim communities in WB and Assam are the primary driver of long-term demographic shift — a structural trend, not a policy variable.',
    },
    {
      title: 'Illegal Immigration',
      body: 'Estimated ~20 million Bangladeshi immigrants in India (2016 estimate). Exact West Bengal share is unknown but widely assumed to be the largest receiving state.',
    },
    {
      title: 'Migration to New Constituencies',
      body: 'Internal migration into newly formed or low-density constituencies has altered the demographic baseline of seats — particularly in southern and eastern Bengal.',
    },
    {
      title: 'Extirpation of Natives',
      body: 'Displacement of Hindu minorities from border areas of WB mirrors patterns seen in Kashmir (1990) and Bangladesh over decades — a politically sensitive but data-documented trend.',
    },
    {
      title: 'Conversion',
      body: 'Documented conversions of native Hindu populations in border districts — a factor noted in ground-level reports but not captured in official census data.',
    },
  ],
};

export const sourceVideo = {
  videoId: 'xHxkAQYPpTM',
  url: 'https://www.youtube.com/live/xHxkAQYPpTM',
  channel: 'PGurus',
  hosts: 'Sree Iyer & Mohan Sonti',
};
