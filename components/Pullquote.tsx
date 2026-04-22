export default function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-orange-400 pl-6 pr-4 py-2 not-prose">
      <p className="font-serif italic text-xl md:text-2xl text-orange-900 leading-snug">
        {children}
      </p>
    </blockquote>
  );
}
