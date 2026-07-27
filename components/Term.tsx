'use client';

import { useState, useId } from 'react';

const definitions: Record<string, string> = {
  'real-apparent-motions': "Earth spins about its axis; the axis wobbles (precession); Earth revolves around the Sun; the Moon spins about its own axis (negligible); the Moon revolves around Earth; the stars appear to 'revolve' in the background",
  synodic: 'A spin or revolution as experienced from a relative location, such as Earth',
  sidereal: 'A spin or revolution as seen from an absolute location, such as a distant star',
  precession: "Earth's spin axis wobbles, completing the cycle in about 26,000 years. Saayana accounts for it; nirayana does not",
  'tropical-solar-calendar': '~365 days per Earth revolution around the Sun, accounting for precession, divided into months and weeks from Earth\'s spin. Similar to the Gregorian Calendar',
  'sidereal-solar-calendar': 'One complete absolute revolution of Earth around the Sun, ignoring precession. Exists, but of little practical value',
  'luni-solar-calendar': "~365 days per year, accounting for precession, with fixed-size months from the Moon's Synodic revolution, weeks (vaasarah) from Earth's spin, and tithi dividing each lunar month into 30 units. The most commonly used calendar",
  panchanga: 'A Sidereal-Synodic calendar of five limbs: tithi (30 divisions of the Moon\'s Synodic revolution), vaara (7-day week from the graha), nakshatra (27 divisions of the Moon\'s Sidereal revolution), yoga (27 divisions combining both Sidereal revolutions), and karana (half-tithi units, 11 types)',
  sankranthi: "From 'sankramana' — to cross over or transit. Earth's transit from one raasi to another; there are 12 sankranthi in a year. A Sidereal event, so it stays pegged to the fixed celestial scale and drifts on Tropical calendars like the Gregorian by about 20 minutes a year (roughly one day every 72 years)",
};

type TermKey = keyof typeof definitions;

export default function Term({ id, children }: { id: TermKey; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const definition = definitions[id];

  return (
    <span className="relative inline-block group">
      <button
        type="button"
        aria-describedby={tooltipId}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onBlur={() => setOpen(false)}
        className="underline decoration-dotted decoration-orange-400 underline-offset-2 text-inherit font-inherit cursor-help"
      >
        {children}
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="not-prose absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 max-w-[80vw] rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-normal leading-snug text-stone-700 shadow-lg"
        >
          {definition}
          <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 h-2 w-2 rotate-45 border-b border-r border-orange-200 bg-white" />
        </span>
      )}
    </span>
  );
}
