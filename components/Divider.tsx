export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-8 not-prose" aria-hidden="true">
      <span className="flex-1 border-t border-orange-100" />
      <span className="text-orange-300 text-lg select-none">✦</span>
      <span className="flex-1 border-t border-orange-100" />
    </div>
  );
}
