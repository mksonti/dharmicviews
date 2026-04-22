export default function EpicCompare({
  ramayana,
  mahabharata,
}: {
  ramayana: string;
  mahabharata: string;
}) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Ramayana</p>
        <p className="text-stone-700 text-sm leading-relaxed">{ramayana}</p>
      </div>
      <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Mahabharata</p>
        <p className="text-stone-700 text-sm leading-relaxed">{mahabharata}</p>
      </div>
    </div>
  );
}
