import { Bug, Rat, Bird, Trash2, Shield, Home, Building2, School, CheckCircle, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { IMAGES } from '../constants/images';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const serviceDetails = [
    { icon: Bug, title: 'Termite Control & Treatment', description: 'Comprehensive termite inspection, treatment, and prevention using advanced detection methods and proven treatments to eliminate colonies and protect your property.', features: ['Pre-construction soil treatment', 'Post-construction barriers', 'Regular inspection programs', 'Structural fumigation', 'Wood preservation'] },
    { icon: Rat, title: 'Rodent Management', description: 'Effective control of rats and mice using integrated pest management. Our solutions include trapping, baiting, and proofing to eliminate current infestations and prevent future problems.', features: ['Comprehensive property inspection', 'Strategic baiting programs', 'Live and snap trapping', 'Entry point sealing', 'Sanitation recommendations'] },
    { icon: Sparkles, title: 'General Pest Control', description: 'Treatment for common household pests including ants, cockroaches, spiders, and other insects. Our integrated approach ensures long-lasting protection.', features: ['Interior and exterior treatments', 'Crack and crevice applications', 'Residual barrier protection', 'Targeted gel baiting', 'Quarterly maintenance programs'] },
    { icon: Bird, title: 'Bird Control Solutions', description: 'Humane bird deterrent systems to prevent nesting and roosting on buildings. Effective barriers and deterrents that protect without harming.', features: ['Bird netting installation', 'Spike systems', 'Electric track systems', 'Visual and audio deterrents', 'Cleanup and sanitization'] },
    { icon: Trash2, title: 'Fumigation Services', description: 'Professional fumigation for warehouses, stored products, shipping containers, and buildings. Certified technicians using approved fumigants.', features: ['Commodity fumigation', 'Container fumigation', 'Structural fumigation', 'Phosphine treatments', 'Certification and documentation'] },
    { icon: Shield, title: 'Integrated Pest Management', description: 'Comprehensive IPM programs combining prevention, monitoring, and control methods. Ideal for businesses requiring ongoing compliance.', features: ['Regular monitoring visits', 'Detailed reporting', 'Staff training and education', 'Preventive measures', 'Emergency response services'] },
  ];

  const sectors = [
    { icon: Home, title: 'Residential', description: 'Safe, effective treatments tailored to home environments for termite protection, rodent control, and general pest management.', color: 'bg-brand-50 text-brand-600' },
    { icon: Building2, title: 'Commercial', description: 'Regular inspections, compliance documentation, discreet service, and emergency response for restaurants, offices, and warehouses.', color: 'bg-blue-50 text-blue-600' },
    { icon: School, title: 'Institutional', description: 'Low-toxicity treatments, scheduled service windows, comprehensive reporting, and regulatory compliance for schools and hospitals.', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="bg-surface-0">
      {/* Hero */}
      <section className="relative bg-surface-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${IMAGES.services.fumigation})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950/95 via-surface-950/80 to-brand-950/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="section-divider mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Our Services
          </h1>
          <p className="text-xl text-surface-300 max-w-2xl leading-relaxed">
            Comprehensive pest management solutions for homes, businesses, and institutions across Kenya.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="reveal group bg-white rounded-2xl border border-surface-100 overflow-hidden card-hover">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-3 p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-200 transition-colors">
                          <Icon className="h-6 w-6 text-brand-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-display font-bold text-surface-900 mb-3">{service.title}</h2>
                          <p className="text-surface-500 leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 bg-surface-50 p-8 border-t lg:border-t-0 lg:border-l border-surface-100">
                      <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-4">Our Approach</h3>
                      <ul className="space-y-2.5 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-surface-600">
                            <CheckCircle className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => onNavigate('contact')}
                        className="w-full bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all inline-flex items-center justify-center gap-2 btn-press shadow-brand"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 md:py-28 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-surface-900 tracking-tight mb-3">
              Service Sectors
            </h2>
            <p className="text-surface-500 text-lg max-w-xl mx-auto">
              Tailored pest management for every environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div key={index} className="reveal bg-white p-8 rounded-2xl border border-surface-100 card-hover">
                  <div className={`w-14 h-14 ${sector.color} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-bold text-surface-900 text-xl mb-3">{sector.title}</h3>
                  <p className="text-surface-500 leading-relaxed">{sector.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface-950 relative overflow-hidden noise">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-surface-400 mb-10 max-w-2xl mx-auto">
            Every pest problem is unique. Contact us to discuss your specific needs and get a customized plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-600 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-brand-700 transition-all duration-200 inline-flex items-center justify-center gap-2.5 btn-press shadow-brand-lg"
            >
              <span>Get a Quote</span>
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
