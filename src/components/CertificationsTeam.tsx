import { CheckCircle, Wrench, Bug, Headphones } from 'lucide-react';

export default function CertificationsTeam() {
  const certifications = [
    'Licensed by Pest Control Products Board (PCPB)',
    'ISO 9001:2015 Quality Management Certified',
    'Occupational Safety and Health Act (OSHA) Compliant',
    'National Environment Management Authority (NEMA) Approved',
    'Member of Kenya Pest Control Association (KPCA)',
  ];

  const team = [
    { icon: Wrench, role: 'Certified Technicians', description: 'Trained and certified in the latest pest control methods and safety protocols.' },
    { icon: Bug, role: 'Expert Entomologists', description: 'Pest biology experts who develop effective treatment strategies.' },
    { icon: Headphones, role: 'Customer Service', description: 'Dedicated support staff available to address your questions and schedule services.' },
  ];

  return (
    <section className="py-20 md:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="reveal">
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-display font-bold text-surface-900 tracking-tight mb-4">Certifications & Compliance</h2>
            <p className="text-surface-500 text-sm leading-relaxed mb-8">
              We maintain the highest industry standards and comply with all regulatory requirements for safe, legal, and effective pest management.
            </p>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-surface-100 card-hover">
                  <CheckCircle className="h-4 w-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-surface-700">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="reveal reveal-delay-2">
            <div className="section-divider mb-6" />
            <h2 className="text-2xl font-display font-bold text-surface-900 tracking-tight mb-4">Our Team</h2>
            <p className="text-surface-500 text-sm leading-relaxed mb-8">
              Our success is built on the expertise, dedication, and professionalism of our team.
            </p>
            <div className="space-y-4">
              {team.map((member, index) => {
                const Icon = member.icon;
                return (
                  <div key={index} className="bg-white p-5 rounded-xl border border-surface-100 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-surface-900 mb-1">{member.role}</h3>
                        <p className="text-surface-500 text-sm leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
