import { Calendar, Users, Award, Clock } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function CompanyStats() {
  const stats = [
    { icon: Calendar, value: '10+', label: 'Years Experience' },
    { icon: Users, value: '5000+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Expert Team' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
  ];

  return (
    <section id="about-section" className="py-20 md:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="section-divider mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-surface-500 leading-relaxed">
              <p>
                Pestlord Fumigation is a leading pest management company in Kenya, providing comprehensive pest control services to residential, commercial, and institutional clients since our establishment.
              </p>
              <p>
                We combine cutting-edge technology, proven methods, and extensive expertise to deliver effective pest solutions that protect your property, health, and peace of mind.
              </p>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden shadow-soft-lg">
              <img src={IMAGES.placeholders.team} alt="Pestlord Solutions Team" className="w-full h-56 object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 stagger-children">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="reveal bg-white p-6 rounded-2xl border border-surface-100 card-hover text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="text-3xl font-display font-bold text-brand-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-surface-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
