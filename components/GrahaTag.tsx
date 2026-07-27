type Graha = 'Ke' | 'Ve' | 'Su' | 'Mo' | 'Ma' | 'Ra' | 'Ju' | 'Sa' | 'Me';

const styles: Record<Graha, string> = {
  Su: 'bg-orange-600 text-white',
  Mo: 'bg-sky-500 text-white',
  Ma: 'bg-red-600 text-white',
  Me: 'bg-emerald-600 text-white',
  Ju: 'bg-amber-600 text-white',
  Ve: 'bg-pink-500 text-white',
  Sa: 'bg-slate-700 text-white',
  Ra: 'bg-violet-600 text-white',
  Ke: 'bg-stone-500 text-white',
};

const labels: Record<Graha, string> = {
  Su: 'Surya',
  Mo: 'Chandra',
  Ma: 'Mangala',
  Me: 'Budha',
  Ju: 'Guru',
  Ve: 'Shukra',
  Sa: 'Shani',
  Ra: 'Rahu',
  Ke: 'Ketu',
};

export default function GrahaTag({ graha }: { graha: Graha }) {
  return (
    <span
      title={labels[graha]}
      className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold leading-none align-middle ${styles[graha]}`}
    >
      {graha}
    </span>
  );
}
