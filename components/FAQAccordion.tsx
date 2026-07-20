'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy-700/10 rounded-xl2 border border-navy-700/10 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
            >
              {item.question}
              <ChevronDown size={18} className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-navy-700/80">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
