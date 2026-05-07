'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play, AlertTriangle } from 'lucide-react';
import {
  elections,
  seat2026,
  eras,
  headlineStats,
  populationContext,
  demographics,
  sourceVideo,
  type Election,
} from './data';

const ORANGE = '#ea7c1c';
const GREEN = '#1f7a4d';
const STONE = '#78716c';

function Pill({ children, tone = 'orange' }: { children: React.ReactNode; tone?: 'orange' | 'stone' }) {
  const cls =
    tone === 'orange'
      ? 'bg-orange-50 text-orange-700 border-orange-200'
      : 'bg-stone-50 text-stone-600 border-stone-200';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${cls}`}>
      {children}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16 border-t border-orange-100/70 first:border-t-0">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.22em] text-orange-600 font-bold mb-3">{eyebrow}</p>
      )}
      <h2 className="font-serif italic text-3xl md:text-4xl text-stone-900 mb-6 leading-tight">{title}</h2>
      {children}
    </section>
  );
}

function VoteShareLineChart() {
  const points = elections.filter(e => e.type === 'Assembly');
  const width = 720;
  const height = 320;
  const padding = { top: 24, right: 24, bottom: 44, left: 44 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const xs = (i: number) => padding.left + (i * innerW) / (points.length - 1);
  const yMax = 60;
  const y = (v: number) => padding.top + innerH - (v / yMax) * innerH;

  const aitcPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${y(p.aitcVote ?? 0)}`).join(' ');
  const bjpPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${y(p.bjpVote ?? 0)}`).join(' ');

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-serif italic text-xl text-stone-900">BJP Vote Share — All Assembly Elections</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full" style={{ background: GREEN }} />AITC</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full" style={{ background: ORANGE }} />BJP</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[560px]">
          {[0, 15, 30, 45, 60].map(g => (
            <g key={g}>
              <line x1={padding.left} x2={width - padding.right} y1={y(g)} y2={y(g)} stroke="#f5f5f4" />
              <text x={padding.left - 8} y={y(g) + 4} textAnchor="end" fontSize="10" fill={STONE}>{g}%</text>
            </g>
          ))}
          <motion.path d={aitcPath} fill="none" stroke={GREEN} strokeWidth={2.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <motion.path d={bjpPath} fill="none" stroke={ORANGE} strokeWidth={2.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
          {points.map((p, i) => (
            <g key={p.key} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={xs(i) - 24} y={padding.top} width={48} height={innerH} fill="transparent" />
              <circle cx={xs(i)} cy={y(p.aitcVote ?? 0)} r={hover === i ? 6 : 4} fill={GREEN} />
              <circle cx={xs(i)} cy={y(p.bjpVote ?? 0)} r={hover === i ? 6 : 4} fill={ORANGE} />
              <text x={xs(i)} y={height - 22} textAnchor="middle" fontSize="11" fill={STONE}>{p.shortLabel}</text>
              {hover === i && (
                <g>
                  <rect x={xs(i) - 56} y={padding.top - 4} width={112} height={48} rx={6} fill="white" stroke="#fed7aa" />
                  <text x={xs(i)} y={padding.top + 12} textAnchor="middle" fontSize="11" fill={GREEN} fontWeight={600}>AITC {p.aitcVote}%</text>
                  <text x={xs(i)} y={padding.top + 28} textAnchor="middle" fontSize="11" fill={ORANGE} fontWeight={600}>BJP {p.bjpVote}%</text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>
      <p className="text-xs text-stone-500 mt-3">Hover any election to see exact vote shares. The orange line tracks BJP from a fringe 1.93% in 2006 to a commanding 45.85% in 2026.</p>
    </div>
  );
}

function SeatDonut2026() {
  const total = seat2026.reduce((s, p) => s + p.seats, 0);
  let cumulative = 0;
  const radius = 90;
  const stroke = 28;
  const C = 2 * Math.PI * radius;
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
      <h3 className="font-serif italic text-xl text-stone-900 mb-4">2026 Seat Distribution (294 Total)</h3>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <svg viewBox="0 0 240 240" className="w-56 h-56 -rotate-90">
            {seat2026.map((p, i) => {
              const frac = p.seats / total;
              const dash = frac * C;
              const offset = -cumulative * C;
              cumulative += frac;
              const isActive = active === i;
              return (
                <circle
                  key={p.party}
                  cx={120}
                  cy={120}
                  r={radius}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={isActive ? stroke + 6 : stroke}
                  strokeDasharray={`${dash} ${C - dash}`}
                  strokeDashoffset={offset}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{ cursor: 'pointer', transition: 'stroke-width 150ms' }}
                />
              );
            })}
            <text x={120} y={118} textAnchor="middle" fontSize="14" fill={STONE} transform="rotate(90 120 120)">
              {active !== null ? seat2026[active].party : 'Total'}
            </text>
            <text x={120} y={138} textAnchor="middle" fontSize="22" fontWeight={700} fill="#1c1917" transform="rotate(90 120 120)">
              {active !== null ? seat2026[active].seats : 294}
            </text>
          </svg>
        </div>
        <ul className="space-y-2">
          {seat2026.map((p, i) => (
            <li
              key={p.party}
              className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${active === i ? 'bg-orange-50' : 'hover:bg-stone-50'}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: p.color }} />
                <span className="font-medium text-stone-800">{p.party}</span>
              </span>
              <span className="text-stone-600 tabular-nums">{p.seats} · {p.share.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SeatTrend() {
  const points = elections.filter(e => e.type === 'Assembly');
  const width = 720;
  const height = 280;
  const padding = { top: 24, right: 24, bottom: 44, left: 44 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const xs = (i: number) => padding.left + (i * innerW) / (points.length - 1);
  const yMax = 250;
  const y = (v: number) => padding.top + innerH - (v / yMax) * innerH;

  const aitcPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${y(p.aitcSeats ?? 0)}`).join(' ');
  const bjpPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${y(p.bjpSeats ?? 0)}`).join(' ');

  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-serif italic text-xl text-stone-900">Seats Won — Assembly Elections</h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full" style={{ background: GREEN }} />AITC</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full" style={{ background: ORANGE }} />BJP</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[560px]">
          {[0, 50, 100, 150, 200, 250].map(g => (
            <g key={g}>
              <line x1={padding.left} x2={width - padding.right} y1={y(g)} y2={y(g)} stroke="#f5f5f4" />
              <text x={padding.left - 8} y={y(g) + 4} textAnchor="end" fontSize="10" fill={STONE}>{g}</text>
            </g>
          ))}
          <line x1={padding.left} x2={width - padding.right} y1={y(148)} y2={y(148)} stroke="#fdba74" strokeDasharray="4 4" />
          <text x={width - padding.right} y={y(148) - 6} textAnchor="end" fontSize="10" fill="#c2410c">148 = majority</text>
          <motion.path d={aitcPath} fill="none" stroke={GREEN} strokeWidth={2.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <motion.path d={bjpPath} fill="none" stroke={ORANGE} strokeWidth={2.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
          {points.map((p, i) => (
            <g key={p.key}>
              <circle cx={xs(i)} cy={y(p.aitcSeats ?? 0)} r={4} fill={GREEN} />
              <circle cx={xs(i)} cy={y(p.bjpSeats ?? 0)} r={4} fill={ORANGE} />
              <text x={xs(i)} y={y(p.bjpSeats ?? 0) - 10} textAnchor="middle" fontSize="11" fontWeight={600} fill={ORANGE}>{p.bjpSeats}</text>
              <text x={xs(i)} y={y(p.aitcSeats ?? 0) + 16} textAnchor="middle" fontSize="11" fontWeight={600} fill={GREEN}>{p.aitcSeats}</text>
              <text x={xs(i)} y={height - 22} textAnchor="middle" fontSize="11" fill={STONE}>{p.shortLabel}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function VoterRegistrationChart() {
  // Voter rolls grew ~3x faster than population. Dual-bar comparison.
  const data = [
    { label: 'India population', from: 1173, to: 1442, unit: 'M', growth: 22.9 },
    { label: 'WB population',    from: 85,   to: 100,  unit: 'M', growth: 17.7 },
    { label: 'WB registered voters', from: 48, to: 76, unit: 'M', growth: 58.3, highlight: true },
  ];
  const maxGrowth = 60;
  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
      <h3 className="font-serif italic text-xl text-stone-900 mb-1">Voter rolls grew nearly 3× faster than population</h3>
      <p className="text-sm text-stone-500 mb-5">2006 → 2024/2025 percentage change.</p>
      <div className="space-y-4">
        {data.map((d) => {
          const pct = (d.growth / maxGrowth) * 100;
          return (
            <div key={d.label}>
              <div className="flex items-baseline justify-between text-sm mb-1">
                <span className={`font-medium ${d.highlight ? 'text-orange-700' : 'text-stone-700'}`}>{d.label}</span>
                <span className="text-stone-500 tabular-nums">{d.from}{d.unit} → {d.to}{d.unit}</span>
              </div>
              <div className="relative h-7 bg-stone-100 rounded-md overflow-hidden">
                <motion.div
                  className={`h-full ${d.highlight ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-stone-400'}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-700 tabular-nums">+{d.growth}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 rounded-lg bg-orange-50 border-l-4 border-orange-400 px-4 py-3">
        <p className="text-sm text-orange-900">
          <strong>The gap:</strong> registrations climbed 58.3% while WB population grew only 17.7% — an estimated <strong>~20 M</strong> excess names on the rolls. The government has removed roughly 8 M flagged entries; analysts argue at least 12 M remain.
        </p>
      </div>
    </div>
  );
}

function MetricsTable() {
  const [activeRow, setActiveRow] = useState<keyof Election | null>(null);
  const rows: Array<{ key: keyof Election; label: string; format?: (v: unknown) => string }> = [
    { key: 'turnout',          label: 'Turnout',          format: v => v == null ? '—' : `${v}%` },
    { key: 'registeredVotersM',label: 'Registered Voters',format: v => v == null ? '—' : `${v} M` },
    { key: 'aitcSeats',        label: 'AITC Seats' },
    { key: 'aitcVote',         label: 'AITC Vote %',      format: v => v == null ? '—' : `${v}%` },
    { key: 'bjpSeats',         label: 'BJP Seats' },
    { key: 'bjpVote',          label: 'BJP Vote %',       format: v => v == null ? '—' : `${v}%` },
    { key: 'incSeats',         label: 'INC Seats' },
    { key: 'cpmSeats',         label: 'CPI(M) Seats' },
  ];

  const visibleElections = elections.filter(e => e.year >= 2016);

  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-stone-600">
            <tr>
              <th className="text-left font-semibold px-4 py-3 sticky left-0 bg-stone-50">Metric</th>
              {visibleElections.map(e => (
                <th key={e.key} className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                  {e.label}
                  <span className="block text-[10px] font-normal text-stone-400">[{e.totalSeats}]</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr
                key={r.key as string}
                className={`border-t border-stone-100 transition-colors ${activeRow === r.key ? 'bg-orange-50/50' : 'hover:bg-stone-50/50'}`}
                onMouseEnter={() => setActiveRow(r.key)}
                onMouseLeave={() => setActiveRow(null)}
              >
                <td className="px-4 py-2.5 font-medium text-stone-700 sticky left-0 bg-white">{r.label}</td>
                {visibleElections.map(e => {
                  const raw = e[r.key];
                  const v = r.format ? r.format(raw) : (raw ?? '—');
                  return <td key={e.key} className="px-4 py-2.5 text-stone-700 tabular-nums">{String(v)}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EraTimeline() {
  const [active, setActive] = useState(eras.length - 1);
  const era = eras[active];
  return (
    <div className="not-prose rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
      <h3 className="font-serif italic text-xl text-stone-900 mb-1">Bengal&rsquo;s ruling parties since 1950</h3>
      <p className="text-sm text-stone-500 mb-5">Click an era to see context. Bengal has voted for its fourth ruling party in 76 years of independence.</p>
      <div className="relative mb-6">
        <div className="flex h-14 rounded-xl overflow-hidden border border-stone-200">
          {eras.map((e, i) => {
            const widths = [27, 34, 15, 10];
            return (
              <button
                key={e.key}
                onClick={() => setActive(i)}
                className={`relative flex items-center justify-center px-3 transition-all ${active === i ? 'ring-2 ring-offset-2 ring-orange-400' : 'opacity-80 hover:opacity-100'}`}
                style={{ background: e.color, color: 'white', flexBasis: `${widths[i]}%` }}
              >
                <span className="text-xs font-bold uppercase tracking-wider truncate">{e.party}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-medium">
          <span>1950</span>
          <span>1977</span>
          <span>2011</span>
          <span>2026</span>
          <span>→</span>
        </div>
      </div>
      <motion.div
        key={era.key}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border-l-4 px-5 py-4"
        style={{ borderColor: era.color, background: `${era.color}10` }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: era.color }}>{era.party}</p>
        <p className="text-sm font-semibold text-stone-800">{era.range} · {era.duration}</p>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">{era.note}</p>
      </motion.div>
    </div>
  );
}

function DemographicVectors() {
  const [open, setOpen] = useState(0);
  return (
    <div className="not-prose space-y-2">
      {demographics.vectors.map((v, i) => {
        const isOpen = open === i;
        return (
          <button
            key={v.title}
            onClick={() => setOpen(isOpen ? -1 : i)}
            className={`w-full text-left rounded-xl border transition-colors ${isOpen ? 'border-orange-300 bg-orange-50/40' : 'border-stone-200 bg-white hover:border-orange-200'}`}
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <span className="text-xs font-bold tabular-nums text-orange-600 w-6">0{i + 1}</span>
              <span className="flex-1 font-semibold text-stone-800">{v.title}</span>
              <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </div>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="px-5 pb-4 text-sm text-stone-600 leading-relaxed"
              >
                {v.body}
              </motion.p>
            )}
          </button>
        );
      })}
    </div>
  );
}

const chapters = [
  { id: 'overview',     label: 'Overview',          t: 0 },
  { id: 'rolls',        label: 'Voter rolls anomaly', t: 390 },
  { id: 'metrics',      label: 'Election metrics',  t: 0 },
  { id: 'rise',         label: "BJP's rise",        t: 0 },
  { id: 'maps',         label: 'Electoral maps',    t: 0 },
  { id: 'seats',        label: '2026 seat map',     t: 0 },
  { id: 'eras',         label: 'Ruling-party eras', t: 0 },
  { id: 'demographics', label: 'Demographics',      t: 1000 },
];

const mapImages = [
  {
    src: '/insights/wb-2026/assembly-2006.png',
    label: 'Assembly 2006',
    note: 'Left Front dominance — CPI(M) controls the map. TMC is a minor urban presence. BJP is statistically invisible at 1.93%.',
  },
  {
    src: '/insights/wb-2026/assembly-2011.png',
    label: 'Assembly 2011',
    note: 'Historic Left Front collapse. TMC sweeps to power with 184 seats. The 34-year Communist rule ends. A new political era begins.',
  },
  {
    src: '/insights/wb-2026/assembly-2016.png',
    label: 'Assembly 2016',
    note: 'TMC consolidates power with 211 seats. BJP edges to 3 seats and 10.16% vote share. Left Front continues its slow collapse statewide.',
  },
  {
    src: '/insights/wb-2026/assembly-2021.png',
    label: 'Assembly 2021',
    note: 'BJP surges to 77 seats and 37.97% — predominantly in northern and western districts. TMC holds urban and minority-concentration zones.',
  },
];

function MapsGallery() {
  const [active, setActive] = useState(0);
  const map = mapImages[active];
  return (
    <div className="not-prose">
      <div className="grid lg:grid-cols-[2fr,1fr] gap-6 items-start">
        <div className="rounded-2xl border border-orange-100 bg-white p-4 md:p-6 shadow-sm">
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-stone-50 rounded-xl overflow-hidden">
            <Image
              src={map.src}
              alt={map.label}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain"
            />
          </div>
          <p className="mt-4 font-serif italic text-2xl text-stone-900">{map.label}</p>
          <p className="text-sm text-stone-600 leading-relaxed mt-2">{map.note}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {mapImages.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setActive(i)}
              className={`group rounded-xl border overflow-hidden text-left transition-all ${active === i ? 'border-orange-400 ring-2 ring-orange-200' : 'border-stone-200 hover:border-orange-200'}`}
            >
              <div className="relative w-full aspect-[3/4] bg-stone-50">
                <Image
                  src={m.src}
                  alt={m.label}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
              <div className={`px-3 py-2 text-xs font-semibold ${active === i ? 'bg-orange-50 text-orange-700' : 'bg-white text-stone-700 group-hover:bg-orange-50/40'}`}>
                {m.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WBInsightsClient() {
  const videoUrl = useMemo(() => `https://www.youtube.com/embed/${sourceVideo.videoId}`, []);
  const [activeChapter, setActiveChapter] = useState('overview');

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-orange-100">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-stone-50" />
        <div className="relative px-6 lg:px-12 py-16 md:py-24 max-w-6xl mx-auto">
          <Pill>West Bengal · Assembly 2026</Pill>
          <h1 className="font-serif italic text-4xl md:text-6xl text-stone-900 mt-4 leading-[1.05]">
            A decade of Bengal&rsquo;s political transformation
          </h1>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl leading-relaxed">
            Five elections from 2016 to 2026 reveal a seismic realignment — TMC&rsquo;s dominance eroding while BJP surges from a fringe presence to the largest party. This page distills the data behind that shift.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-orange-200 text-stone-700">
              2016 → 2019 → 2021 → 2024 → 2026
            </span>
            <Pill tone="stone">294 Assembly Constituencies</Pill>
            <Pill tone="stone">42 Lok Sabha Seats</Pill>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#metrics" className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 text-sm font-semibold shadow-md shadow-orange-100 transition-colors">
              Explore the analysis <ChevronRight className="w-4 h-4" />
            </a>
            <a href={sourceVideo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-200 hover:border-orange-300 text-stone-800 px-5 py-3 text-sm font-semibold transition-colors">
              <Play className="w-4 h-4" /> Watch the source discussion
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 max-w-6xl mx-auto pb-16">
        {/* Chapter rail */}
        <nav className="sticky top-0 z-20 -mx-6 lg:-mx-12 px-6 lg:px-12 py-3 bg-white/90 backdrop-blur border-b border-orange-100">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-xs">
            {chapters.map(c => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setActiveChapter(c.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition-colors ${activeChapter === c.id ? 'bg-orange-600 text-white' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}
              >
                {c.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Headline stats */}
        <Section id="overview" eyebrow="Headline numbers" title="What the 2026 result delivered">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {headlineStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
              >
                <p className="font-serif text-4xl text-stone-900">{s.figure}</p>
                <p className="text-xs uppercase tracking-wider text-orange-600 font-bold mt-1">{s.label}</p>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Voter rolls anomaly */}
        <Section id="rolls" eyebrow="The data anomaly" title="Voter rolls vs. population growth">
          <p className="text-stone-600 leading-relaxed mb-6 max-w-3xl">
            Between 2006 and 2024, West Bengal&rsquo;s registered voters grew from roughly 48 M to 76 M — a 58.3% increase. Over the same window, the state&rsquo;s population grew by only 17.7%. The deck argues the ~20 M registration gap is a structural anomaly central to any honest electoral analysis.
          </p>
          <VoterRegistrationChart />
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {populationContext.map(c => (
              <div key={c.label} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-wider text-stone-500 font-bold mb-1">{c.label}</p>
                <p className="text-stone-800 text-sm font-medium">{c.from} <span className="text-stone-400">→</span> {c.to}</p>
                <p className="text-orange-700 font-bold text-sm mt-1">{c.delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">Roll revision, 2024 → 2026</p>
                <p className="text-sm text-yellow-900/90 mt-1 leading-relaxed">
                  Registered voters dropped from 76 M (2024) to 68.25 M (2026) — a 10% decline even as population grew. This roll revision warrants close scrutiny for its impact on seat outcomes.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Metrics table */}
        <Section id="metrics" eyebrow="The full picture" title="Election-by-election metrics">
          <p className="text-stone-600 leading-relaxed mb-6 max-w-3xl">
            Hover any row to highlight it. Lok Sabha years are interleaved to show how national-election results foreshadowed Assembly outcomes — particularly the 2019 BJP breakthrough.
          </p>
          <MetricsTable />
        </Section>

        {/* BJP's rise */}
        <Section id="rise" eyebrow="Vote-share trajectory" title="BJP's rise: from fringe to first party">
          <p className="text-stone-600 leading-relaxed mb-6 max-w-3xl">
            No political trajectory in modern Indian democracy matches BJP&rsquo;s Bengal surge. From under 2% in 2006 to 45.85% in 2026, the party&rsquo;s vote-share growth is historic — driven by 2019&rsquo;s Lok Sabha breakthrough and consolidated in 2026&rsquo;s Assembly result.
          </p>
          <div className="space-y-6">
            <VoteShareLineChart />
            <SeatTrend />
          </div>
        </Section>

        {/* 2026 seat map */}
        <Section id="seats" eyebrow="The 2026 verdict" title="Seat distribution & political geography">
          <div className="grid lg:grid-cols-2 gap-6">
            <SeatDonut2026 />
            <div className="rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-sm">
              <h3 className="font-serif italic text-xl text-stone-900 mb-3">First-past-the-post distortion</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                BJP&rsquo;s 45.85% vote share converted to <strong>70.41%</strong> of seats. AITC&rsquo;s 40.80% returned only <strong>27.21%</strong> of seats. A 5-point vote gap produced a 43-point seat gap — the same FPTP amplification that worked against BJP in 2024 (39.10% / 12 seats vs AITC&rsquo;s 46.02% / 29 seats) now works in their favour.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-orange-50 p-3">
                  <p className="text-xs uppercase tracking-wider text-orange-700 font-bold">BJP vote → seats</p>
                  <p className="font-serif text-2xl text-stone-900 mt-1">45.85% → 70.41%</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-3">
                  <p className="text-xs uppercase tracking-wider text-stone-600 font-bold">AITC vote → seats</p>
                  <p className="font-serif text-2xl text-stone-900 mt-1">40.80% → 27.21%</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Eras */}
        <Section id="eras" eyebrow="Historical context" title="Four ruling-party eras since 1950">
          <EraTimeline />
          <p className="text-xs text-stone-500 mt-4">
            World-title context: West Bengal&rsquo;s CPI(M) holds two global records — the longest democratically elected communist government and the longest uninterrupted elected communist rule.
          </p>
        </Section>

        {/* Demographics */}
        <Section id="demographics" eyebrow="Beyond the numbers" title="Demographic dimensions">
          <p className="text-stone-600 leading-relaxed mb-6 max-w-3xl">
            Muslim population distribution is a critical — and often underanalyzed — variable in Bengal&rsquo;s electoral calculus. Higher fertility rates, cross-border immigration, and constituency-level migration patterns all interact with the political map in ways that shape outcomes across every cycle analyzed here.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-800 text-white p-6 shadow-md">
              <p className="text-[11px] uppercase tracking-widest opacity-80 mb-2 font-bold">West Bengal</p>
              <h3 className="font-serif italic text-2xl mb-3">Muslim population dynamics</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li><strong>2011 Census:</strong> 28% Muslim</li>
                <li><strong>2031 Projection:</strong> ~31%</li>
                <li className="opacity-90 pt-2">Concentrated in border districts — Murshidabad, Malda, North Dinajpur — where demographic shifts most directly influence seat outcomes.</li>
                <li className="opacity-90">Over 70% of all Bengalis globally (including Bangladesh) are Muslim — a transnational context with direct bearing on immigration analysis.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {demographics.comparisons.map(c => (
                <div key={c.name} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-bold text-stone-900">{c.name}</p>
                  {c.m2011 !== '—' && (
                    <p className="text-xs text-stone-600 mt-1">2011: <strong>{c.m2011}</strong> · 2031 est: <strong>{c.est2031}</strong></p>
                  )}
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">{c.migrants}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="font-serif italic text-2xl text-stone-900 mb-4">Migration, immigration & extirpation: key vectors</h3>
          <DemographicVectors />
          <div className="mt-6 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-700 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-900 leading-relaxed">
                <strong>Analyst note:</strong> the convergence of fertility growth, ~20 M undocumented immigrants, internal migration, and constituency delimitation creates compounding demographic pressure that no single election cycle fully captures. Longitudinal analysis across 2011–2031 census windows is essential for accurate electoral modeling.
              </p>
            </div>
          </div>
        </Section>

        {/* Source */}
        <section className="mt-8 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <Pill>Source</Pill>
              <h3 className="font-serif italic text-2xl text-stone-900 mt-3">PGurus live discussion</h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Hosted by {sourceVideo.hosts}. The video walks through these data anomalies in detail, including additional analysis of Tamil Nadu polling and the broader demographic forces at play.
              </p>
              <a href={sourceVideo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 rounded-lg bg-stone-900 hover:bg-black text-white px-4 py-2 text-sm font-semibold transition-colors">
                <Play className="w-4 h-4" /> Watch on YouTube
              </a>
            </div>
            <div className="w-full md:w-80 aspect-video rounded-xl overflow-hidden border border-stone-200 shrink-0">
              <iframe
                src={videoUrl}
                title="PGurus discussion"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-5 text-xs text-stone-400 leading-relaxed">
            Figures presented here are drawn from the source deck. Some entries (illegal-immigration estimates, projection percentages, pre-2011 vote shares) are widely-cited analyst figures rather than official statistics — interpret accordingly.
          </p>
        </section>
      </div>
    </div>
  );
}
