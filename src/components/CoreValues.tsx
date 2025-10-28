// Core Values component - displays company values
import { Shield, Award, Users, Leaf } from 'lucide-react';

export default function CoreValues() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize the safety of our clients, their families, and the environment in every service we provide.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards of service quality and professional expertise in pest management.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our clients\' satisfaction is at the heart of everything we do. We listen, respond, and deliver.'
    },
    {
      icon: Leaf,
      title: 'Environmental Responsibility',
      description: 'We use eco-friendly methods and products that are effective yet gentle on the environment.'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600">The principles that guide our work every day</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

