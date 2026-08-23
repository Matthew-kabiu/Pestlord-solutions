import { Shield, Users, Award, Bug, Rat, Trash2, Home, Building2, School, PhoneCall, ArrowRight, Star } from 'lucide-react';
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
    { icon: Bug, title: 'Termite Control', description: 'Comprehensive inspection, treatment, and prevention to protect your property from termite damage.', image: IMAGES.services.termiteControl },
    { icon: Rat, title: 'Rodent Management', description: 'Effective control solutions for homes and businesses using safe, proven methods.', image: IMAGES.services.rodentManagement },
    { icon: Trash2, title: 'Fumigation Services', description: 'Professional fumigation for stored products, warehouses, and commercial spaces.', image: IMAGES.services.fumigation },
    { icon: Home, title: 'Residential Services', description: 'Tailored solutions to keep your home safe and pest-free year-round.', image: IMAGES.services.residential },
    { icon: Building2, title: 'Commercial Solutions', description: 'Customized pest management programs for businesses, restaurants, and offices.', image: IMAGES.services.commercial },
    { icon: School, title: 'Institutional Services', description: 'Specialized pest control for schools, hospitals, and public facilities.', image: IMAGES.services.institutional },
  ];

  const features = [
    { icon: Shield, title: 'Licensed & Certified', description: 'Fully licensed professionals with industry certifications and ongoing training.' },
    { icon: Users, title: 'Expert Team', description: 'Experienced technicians with deep knowledge of pest behavior and control.' },
    { icon: Award, title: 'Quality Guarantee', description: 'We stand behind our work with comprehensive service guarantees.' },
  ];

  const testimonials = [
    { name: 'Sarah Mwangi', role: 'Homeowner', text: 'Pestlord solved our termite problem quickly and professionally. Highly recommended!', image: IMAGES.customers.customer1, rating: 5 },
    { name: 'David Ochieng', role: 'Restaurant Owner', text: 'Their commercial program has kept our restaurant pest-free for over two years.', image: IMAGES.customers.customer2, rating: 5 },
    { name: 'Grace Kimani', role: 'Property Manager', text: 'Reliable, efficient, and thorough. They manage pest control for all our properties.', image: IMAGES.customers.customer3, rating: 5 },
  ];

  return (
    <div className="bg-surface-0">
      {/* Hero */}
      <section className="relative min-h-[85dvh] flex items-center bg-surface-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${IMAGES.placeholders.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950/95 via-surface-950/80 to-brand-950/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand-300">Kenya's Trusted Pest Control Experts</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
              Protect Your Space from{' '}
              <span className="text-gradient">Unwanted Pests</span>
            </h1>

            <p className="text-lg md:text-xl text-surface-300 leading-relaxed max-w-xl mb-10">
              Expert pest management for homes, businesses, and institutions across Kenya. Safe, effective, and environmentally responsible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-brand-600 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-brand-700 transition-all duration-200 inline-flex items-center justify-center gap-2.5 btn-press shadow-brand-lg hover:shadow-brand"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('booking')}
                className="bg-white/10 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 inline-flex items-center justify-center gap-2.5 btn-press backdrop-blur-sm"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Book Inspection</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="section-divider mb-6" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight">
                  Our Services
                </h2>
                <p className="text-surface-500 mt-3 text-lg max-w-xl">
                  Comprehensive pest management tailored to your specific needs
                </p>
              </div>
              <button
                onClick={() => onNavigate('services')}
                className="text-brand-600 font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all group"
              >
                <span>View all services</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="reveal group bg-white rounded-2xl overflow-hidden card-hover cursor-pointer border border-surface-100"
                  onClick={() => onNavigate('services')}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-brand">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-surface-900 text-lg mb-1.5">{service.title}</h3>
                    <p className="text-surface-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="section-divider mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-6">
                Why Choose Pestlord
              </h2>
              <p className="text-surface-500 text-lg leading-relaxed mb-10">
                With over a decade of experience, we deliver reliable, effective, and environmentally responsible solutions that protect what matters most.
              </p>

              <div className="space-y-5">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                        <Icon className="h-5 w-5 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-surface-900 mb-1">{feature.title}</h3>
                        <p className="text-surface-500 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => onNavigate('about')}
                className="mt-10 text-brand-600 font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all group"
              >
                <span>Learn more about us</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="reveal reveal-delay-2">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl">
                <img
                  src={IMAGES.placeholders.team}
                  alt="Pestlord Solutions team"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <CompanyStats />

      {/* Core Values */}
      <CoreValues />

      {/* Experience */}
      <ExperienceHighlight />

      {/* Certifications */}
      <CertificationsTeam />

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-3">
              What Our Clients Say
            </h2>
            <p className="text-surface-500 text-lg">Trusted by homeowners and businesses across Kenya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="reveal bg-white p-6 rounded-2xl border border-surface-100 card-hover">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-surface-600 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-100"
                  />
                  <div>
                    <p className="font-semibold text-surface-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-surface-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={faqs} title="Frequently Asked Questions" subtitle="Quick answers to common pest control questions" />

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface-950 relative overflow-hidden noise">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-surface-400 mb-10 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team is ready to help you solve your pest problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-600 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-brand-700 transition-all duration-200 inline-flex items-center justify-center gap-2.5 btn-press shadow-brand-lg"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-white/10 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 inline-flex items-center justify-center gap-2.5 btn-press backdrop-blur-sm"
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
