// Company statistics component - displays key metrics
import { Calendar, Users, Award, Clock } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function CompanyStats() {
  const stats = [
    { icon: Calendar, value: '10+', label: 'Years Experience' },
    { icon: Users, value: '5000+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Expert Team' },
    { icon: Clock, value: '24/7', label: 'Support Available' }
  ];

  return (
    <section id="about-section" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Pestlord Fumigation is a leading pest management company in Kenya, providing comprehensive pest control services to residential, commercial, and institutional clients since our establishment.
              </p>
              <p className="text-lg">
                We combine cutting-edge technology, proven methods, and extensive expertise to deliver effective pest solutions that protect your property, health, and peace of mind.
              </p>
              <p className="text-lg">
                Our team of certified professionals is committed to excellence, safety, and environmental responsibility in every service we provide.
              </p>
            </div>
            
            {/* Team Image */}
            <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={IMAGES.placeholders.team} 
                alt="Pestlord Solutions Team"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-all shadow-md hover:shadow-xl">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-green-700 mb-2">{stat.value}</div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

