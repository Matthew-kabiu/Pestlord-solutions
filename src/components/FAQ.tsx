import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem { q: string; a: string }

export default function FAQ({ faqs, title, subtitle }: { faqs: FAQItem[]; title?: string; subtitle?: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          </div>
        )}

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 bg-white rounded-lg shadow">
          {faqs.map((item, idx) => (
            <div key={idx} className="p-4">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left"
                aria-expanded={openFaq === idx}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900">{item.q}</span>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="mt-3 text-gray-600 text-sm md:text-base">
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


