type ForceColor = 'red' | 'blue' | 'green';

const ACCENTS: Record<ForceColor, { bg: string; border: string; label: string }> = {
  red:   { bg: 'bg-red-50',   border: 'border-red-200',   label: 'text-red-600'   },
  blue:  { bg: 'bg-blue-50',  border: 'border-blue-200',  label: 'text-blue-600'  },
  green: { bg: 'bg-green-50', border: 'border-green-200', label: 'text-green-700' },
};

export default function ForceCard({
  label,
  color = 'red',
  children,
}: {
  label: string;
  color?: ForceColor;
  children: React.ReactNode;
}) {
  const { bg, border, label: labelColor } = ACCENTS[color] ?? ACCENTS.red;
  return (
    <div className={`not-prose my-4 rounded-xl border ${border} ${bg} p-4`}>
      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${labelColor}`}>{label}</p>
      <p className="text-stone-700 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
