'use client';

import React from 'react';

export function BinaryItem({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-2 text-sm border-b border-stone-100 last:border-0">
      <div className="px-4 py-2.5 bg-amber-50 text-amber-900 font-medium border-r border-stone-200">
        {left}
      </div>
      <div className="px-4 py-2.5 bg-orange-50 text-orange-900 font-medium">
        {right}
      </div>
    </div>
  );
}

export default function BinaryList({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
      {children}
    </div>
  );
}
