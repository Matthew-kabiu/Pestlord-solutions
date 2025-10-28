import { Bug, Rat, Bird, Trash2, Shield, Home, Building2, School, CheckCircle, Sparkles, FileText, PhoneCall } from 'lucide-react';
import { IMAGES } from '../constants/images';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const serviceDetails = [
    {
      icon: Bug,
      title: 'Termite Control & Treatment',
      description: 'Comprehensive termite inspection, treatment, and prevention services. We use advanced detection methods and proven treatments to eliminate termite colonies and protect your property from future infestations.',
      features: [
        'Pre-construction soil treatment',
        'Post-construction termite barriers',
        'Regular inspection programs',
        'Structural fumigation',
        'Wood preservation treatments'
      ]
    },
    {
      icon: Rat,
      title: 'Rodent Management',
      description: 'Effective control of rats and mice using integrated pest management approaches. Our solutions include trapping, baiting, and proofing to eliminate current infestations and prevent future problems.',
      features: [
        'Comprehensive property inspection',
        'Strategic baiting programs',
        'Live and snap trapping',
        'Entry point identification and sealing',
        'Sanitation recommendations'
      ]
    },
    {
      icon: Sparkles,
      title: 'General Pest Control',
      description: 'Treatment for common household pests including ants, cockroaches, spiders, and other insects. Our integrated approach ensures long-lasting protection for your home or business.',
      features: [
        'Interior and exterior treatments',
        'Crack and crevice applications',
        'Residual barrier protection',
        'Targeted gel baiting',
        'Quarterly maintenance programs'
      ]
    },
    {
      icon: Bird,
      title: 'Bird Control Solutions',
      description: 'Humane bird deterrent systems to prevent nesting and roosting on buildings. We install effective barriers and deterrents that protect your property without harming birds.',
      features: [
        'Bird netting installation',
        'Spike systems',
        'Electric track systems',
        'Visual and audio deterrents',
        'Cleanup and sanitization'
      ]
    },
    {
      icon: Trash2,
      title: 'Fumigation Services',
      description: 'Professional fumigation for warehouses, stored products, shipping containers, and buildings. Our certified technicians use approved fumigants to eliminate all life stages of pests.',
      features: [
        'Commodity fumigation',
        'Container fumigation',
        'Structural fumigation',
        'Phosphine treatments',
        'Certification and documentation'
      ]
    },
    {
      icon: Shield,
      title: 'Integrated Pest Management',
      description: 'Comprehensive IPM programs that combine prevention, monitoring, and control methods. Ideal for businesses requiring ongoing pest management compliance.',
      features: [
        'Regular monitoring visits',
        'Detailed reporting and documentation',
        'Staff training and education',
        'Preventive measures',
        'Emergency response services'
      ]
    }
  ];

  const sectors = [
    {
      icon: Home,
      title: 'Residential Services',
      description: 'Protect your home and family with our residential pest control services. We provide safe, effective treatments tailored to home environments.',
      services: 'Termite protection, rodent control, general pest management, bed bug treatments'
    },
    {
      icon: Building2,
      title: 'Commercial Solutions',
      description: 'Keep your business pest-free with our commercial pest management programs. We work with restaurants, offices, retail stores, and warehouses.',
      services: 'Regular inspections, compliance documentation, discreet service, emergency response'
    },
    {
      icon: School,
      title: 'Institutional Services',
      description: 'Specialized pest control for schools, hospitals, hotels, and government facilities. We understand the unique requirements of institutional settings.',
      services: 'Low-toxicity treatments, scheduled service windows, comprehensive reporting, regulatory compliance'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-green-900 to-green-700 text-white py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.services.fumigation})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 to-green-700/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Comprehensive pest management solutions for homes, businesses, and institutions. Our expert team delivers effective, safe, and environmentally responsible services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start mb-4">
                        <Icon className="h-12 w-12 text-green-700 mr-4 flex-shrink-0" />
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Our Approach</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => onNavigate('contact')}
                        className="mt-6 w-full bg-green-700 text-white px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Request Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Sectors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored pest management solutions for every environment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Icon className="h-14 w-14 text-green-700 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h3>
                  <p className="text-gray-600 mb-4">{sector.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 font-medium mb-2">Services Include:</p>
                    <p className="text-sm text-gray-600">{sector.services}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Every pest problem is unique. Contact us to discuss your specific needs and get a customized pest management plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              <span>Get a Quote</span>
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors border-2 border-white inline-flex items-center gap-2"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Book Inspection</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
