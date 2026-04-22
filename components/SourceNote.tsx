export default function SourceNote({
  href,
  label,
  date,
}: {
  href: string;
  label: string;
  date: string;
}) {
  return (
    <div className="not-prose mt-10 pt-6 border-t border-orange-100 flex flex-wrap items-center gap-2 text-sm text-stone-500">
      <span>Originally published:</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:text-orange-700 underline underline-offset-2"
      >
        {label}
      </a>
      <span>&bull;</span>
      <span>{date}</span>
    </div>
  );
}
