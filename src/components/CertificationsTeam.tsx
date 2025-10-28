// Certifications and Team component
import { CheckCircle, Wrench, Bug, Headphones } from 'lucide-react';

export default function CertificationsTeam() {
  const certifications = [
    { name: 'Licensed by Pest Control Products Board (PCPB)' },
    { name: 'ISO 9001:2015 Quality Management Certified' },
    { name: 'Occupational Safety and Health Act (OSHA) Compliant' },
    { name: 'National Environment Management Authority (NEMA) Approved' },
    { name: 'Member of Kenya Pest Control Association (KPCA)' }
  ];

  const team = [
    {
      icon: Wrench,
      role: 'Certified Technicians',
      description: 'Our field technicians are trained and certified in the latest pest control methods and safety protocols.'
    },
    {
      icon: Bug,
      role: 'Expert Entomologists',
      description: 'Our team includes pest biology experts who develop effective treatment strategies.'
    },
    {
      icon: Headphones,
      role: 'Customer Service',
      description: 'Dedicated support staff available to address your questions and schedule services promptly.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Certifications & Compliance</h2>
            <p className="text-gray-600 mb-6">
              We maintain the highest industry standards and comply with all regulatory requirements to ensure safe, legal, and effective pest management services.
            </p>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="h-5 w-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{cert.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our success is built on the expertise, dedication, and professionalism of our team members.
            </p>
            <div className="space-y-6">
              {team.map((member, index) => {
                const Icon = member.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.role}</h3>
                        <p className="text-gray-600">{member.description}</p>
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

