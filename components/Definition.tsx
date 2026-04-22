export default function Definition({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-3 pl-4 border-l-2 border-orange-200">
      <span className="font-semibold text-orange-800">{term}</span>
      <span className="text-stone-400 mx-2">—</span>
      <span className="text-stone-700">{children}</span>
    </div>
  );
}
