import { Shield, Award, Users, Leaf } from 'lucide-react';

export default function CoreValues() {
  const values = [
    { icon: Shield, title: 'Safety First', description: 'We prioritize the safety of our clients, their families, and the environment in every service.' },
    { icon: Award, title: 'Excellence', description: 'We maintain the highest standards of service quality and professional expertise.' },
    { icon: Users, title: 'Customer Focus', description: "Our clients' satisfaction is at the heart of everything we do. We listen, respond, and deliver." },
    { icon: Leaf, title: 'Environmental Care', description: 'We use eco-friendly methods and products that are effective yet gentle on the environment.' },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-14">
          <div className="section-divider mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-3">
            Our Core Values
          </h2>
          <p className="text-surface-500 text-lg">The principles that guide our work every day</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="reveal bg-white p-7 rounded-2xl border border-surface-100 card-hover text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-brand-600" />
                </div>
                <h3 className="font-display font-semibold text-surface-900 text-lg mb-2">{value.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
