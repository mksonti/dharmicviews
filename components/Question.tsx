export default function Question({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 flex gap-3 items-start">
      <span className="mt-0.5 shrink-0 text-orange-400 font-bold text-lg leading-none">?</span>
      <p className="font-semibold text-stone-800 text-base leading-snug">{children}</p>
    </div>
  );
}
