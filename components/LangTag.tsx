type Lang = 'R' | 'L' | 'G' | 'N' | 'O';

const styles: Record<Lang, string> = {
  R: 'bg-red-600 text-white',
  L: 'bg-amber-600 text-white',
  G: 'bg-emerald-600 text-white',
  N: 'bg-violet-600 text-white',
  O: 'bg-sky-700 text-white',
};

export default function LangTag({ lang }: { lang: Lang }) {
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold leading-none align-middle ${styles[lang]}`}>
      {lang}
    </span>
  );
}
