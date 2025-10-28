// FAQ state is managed inside the reusable FAQ component
import { Shield, Users, Award, CheckCircle, Bug, Rat, Trash2, Home, Building2, School, PhoneCall, FileText, ArrowRight } from 'lucide-react';
import FAQ from '../components/FAQ';
import CompanyStats from '../components/CompanyStats';
import CoreValues from '../components/CoreValues';
import CertificationsTeam from '../components/CertificationsTeam';
import ExperienceHighlight from '../components/ExperienceHighlight';
import { faqs } from '../data/faqs';
import { IMAGES } from '../constants/images';


interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Bug,
      title: 'Termite Control',
      description: 'Comprehensive termite inspection, treatment, and prevention services to protect your property.',
      image: IMAGES.services.termiteControl
    },
    {
      icon: Rat,
      title: 'Rodent Management',
      description: 'Effective rodent control solutions for homes and businesses using safe, proven methods.',
      image: IMAGES.services.rodentManagement
    },
    {
      icon: Trash2,
      title: 'Fumigation Services',
      description: 'Professional fumigation for stored products, warehouses, and commercial spaces.',
      image: IMAGES.services.fumigation
    },
    {
      icon: Home,
      title: 'Residential Services',
      description: 'Tailored pest control solutions to keep your home safe and pest-free year-round.',
      image: IMAGES.services.residential
    },
    {
      icon: Building2,
      title: 'Commercial Solutions',
      description: 'Customized pest management programs for businesses, restaurants, and offices.',
      image: IMAGES.services.commercial
    },
    {
      icon: School,
      title: 'Institutional Services',
      description: 'Specialized pest control for schools, hospitals, and public facilities.',
      image: IMAGES.services.institutional
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Licensed & Certified',
      description: 'Fully licensed professionals with industry certifications and training.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced technicians with deep knowledge of pest behavior and control.'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'We stand behind our work with comprehensive service guarantees.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mwangi',
      role: 'Homeowner',
      text: 'Pestlord Fumigation solved our termite problem quickly and professionally. Highly recommended!',
      image: IMAGES.customers.customer1
    },
    {
      name: 'David Ochieng',
      role: 'Restaurant Owner',
      text: 'Their commercial pest management program has kept our restaurant pest-free for over two years.',
      image: IMAGES.customers.customer2
    },
    {
      name: 'Grace Kimani',
      role: 'Property Manager',
      text: 'Reliable, efficient, and thorough. They have been managing pest control for all our properties.',
      image: IMAGES.customers.customer3
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-green-900 to-green-700 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.placeholders.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 to-green-700/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Pest Control Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Protecting homes, businesses, and institutions across Kenya with expert pest management services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3 transform hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                <span>Get a Free Quote</span>
              </button>
              <button
                onClick={() => onNavigate('booking')}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500 transition-all duration-300 border-2 border-white inline-flex items-center gap-3 transform hover:scale-105"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Book Inspection</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive pest management solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                  onClick={() => onNavigate('services')}
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Icon className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('services');
                      }}
                      className="text-green-700 font-medium hover:text-green-800 inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-3"
            >
              <FileText className="h-5 w-5" />
              <span>View All Services</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Pestlord Fumigation?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With years of experience in the pest management industry, we deliver reliable, effective, and environmentally responsible solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Safe & Eco-Friendly</h4>
                    <p className="text-gray-600">We use environmentally responsible methods and products.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Experienced Team</h4>
                    <p className="text-gray-600">Our technicians are trained, certified, and insured.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-700 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-gray-600">Emergency pest control services available anytime.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('about')}
                className="mt-8 text-green-700 font-semibold hover:text-green-800 text-lg inline-flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                <span>Learn More About Us</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-green-50 p-6 rounded-lg border-l-4 border-green-700"
                  >
                    <Icon className="h-10 w-10 text-green-700 mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <CompanyStats />


      {/* Core Values Section */}
      <CoreValues />

      {/* Experience Highlight Section */}
      <ExperienceHighlight />

      {/* Certifications & Team Section */}
      <CertificationsTeam />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Trusted by homeowners and businesses across Kenya</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} title="FAQs" subtitle="Answers to common pest control questions" />

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Contact us today for a free consultation and quote. Our team is ready to help you solve your pest problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center gap-3"
            >
              <FileText className="h-5 w-5" />
              <span>Request a Quote</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500 transition-colors border-2 border-white inline-flex items-center gap-3"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
