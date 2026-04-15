type CalloutType = 'info' | 'warning' | 'tip' | 'note';

const styles: Record<CalloutType, { container: string; border: string }> = {
  info:    { container: 'bg-orange-50 text-orange-900',  border: 'border-orange-400' },
  warning: { container: 'bg-yellow-50 text-yellow-900', border: 'border-yellow-400' },
  tip:     { container: 'bg-green-50 text-green-900',   border: 'border-green-400'  },
  note:    { container: 'bg-stone-50 text-stone-800',   border: 'border-stone-400'  },
};

export default function Callout({
  type = 'note',
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { container, border } = styles[type] ?? styles.note;
  return (
    <div className={`my-6 rounded-xl border-l-4 px-5 py-4 ${container} ${border}`}>
      {children}
    </div>
  );
}
