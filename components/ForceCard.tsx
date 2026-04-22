export default function ForceCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-4 rounded-xl border border-stone-200 bg-stone-50 p-4">
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-stone-500">{label}</p>
      <p className="text-stone-700 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
