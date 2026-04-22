export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex items-center gap-3 mt-10 mb-4">
      <span className="w-1 h-6 rounded-full bg-orange-400 shrink-0" />
      <h2 className="font-serif text-xl md:text-2xl font-bold text-orange-950 leading-snug">
        {children}
      </h2>
    </div>
  );
}
