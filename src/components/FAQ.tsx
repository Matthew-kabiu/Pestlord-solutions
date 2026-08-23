import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem { q: string; a: string }

export default function FAQ({ faqs, title, subtitle }: { faqs: FAQItem[]; title?: string; subtitle?: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="reveal text-center mb-14">
            <div className="section-divider mx-auto mb-6" />
            {title && <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-3">{title}</h2>}
            {subtitle && <p className="text-surface-500 text-lg">{subtitle}</p>}
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="reveal bg-white rounded-2xl border border-surface-100 overflow-hidden transition-all hover:shadow-soft">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left p-5"
                aria-expanded={openFaq === idx}
              >
                <span className="font-display font-semibold text-surface-900 text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown className={`h-5 w-5 text-surface-400 flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-surface-500 text-sm leading-relaxed border-t border-surface-100 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
