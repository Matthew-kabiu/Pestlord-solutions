import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import FAQ from '../components/FAQ';
import { faqs } from '../data/faqs';
import { IMAGES } from '../constants/images';
import { api } from '../lib/api';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service_type: '', location: '', additional_notes: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.api.quote.$post({
        json: { ...formData, submitted_at: new Date().toISOString(), source: 'website-quote' },
      });
      if (!response.ok) throw new Error(`Webhook request failed (${response.status}).`);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service_type: '', location: '', additional_notes: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Failed to submit quote request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: ['+254 700 000 000', '+254 711 000 000'], description: 'Mon-Sat: 8AM - 6PM' },
    { icon: Mail, title: 'Email', details: ['info@pestlord.co.ke', 'support@pestlord.co.ke'], description: 'We reply within 24 hours' },
    { icon: MapPin, title: 'Office', details: ['Nairobi, Kenya'], description: 'Visit by appointment' },
    { icon: Clock, title: 'Hours', details: ['Mon-Fri: 8AM - 6PM', 'Sat: 9AM - 4PM'], description: 'Emergency 24/7' },
  ];

  return (
    <div className="bg-surface-0">
      {/* Hero */}
      <section className="relative bg-surface-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${IMAGES.company.office})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950/95 via-surface-950/80 to-brand-950/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="section-divider mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-surface-300 max-w-2xl">Get in touch with our team. We're here to help with your pest control needs.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children -mt-8 relative z-10">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="reveal bg-white p-6 rounded-2xl border border-surface-100 card-hover">
                  <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <h3 className="font-display font-semibold text-surface-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-surface-700 font-medium">{detail}</p>
                  ))}
                  <p className="text-xs text-surface-400 mt-2">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quote Form */}
            <div className="reveal">
              <div className="section-divider mb-6" />
              <h2 id="quote-form" className="text-2xl font-display font-bold text-surface-900 mb-8">Request a Quote</h2>

              {submitted && (
                <div className="mb-6 bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <p className="text-brand-800 text-sm">Thank you! We've received your message and will respond shortly.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1.5">Full Name *</label>
                  <input type="text" id="name" name="name" required maxLength={100} autoComplete="name" value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="John Doe" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">Email *</label>
                    <input type="email" id="email" name="email" required maxLength={254} autoComplete="email" value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-surface-700 mb-1.5">Phone *</label>
                    <input type="tel" id="phone" name="phone" required maxLength={32} autoComplete="tel" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      placeholder="+254 700 000 000" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-surface-700 mb-1.5">Service Type *</label>
                  <select id="service_type" name="service_type" required value={formData.service_type} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
                    <option value="">Select a service</option>
                    <option value="Termite Control">Termite Control</option>
                    <option value="Rodent Management">Rodent Management</option>
                    <option value="General Pest Control">General Pest Control</option>
                    <option value="Bird Control">Bird Control</option>
                    <option value="Fumigation Services">Fumigation Services</option>
                    <option value="Integrated Pest Management">Integrated Pest Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-surface-700 mb-1.5">Property Location *</label>
                  <input type="text" id="location" name="location" required maxLength={200} autoComplete="street-address" value={formData.location} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="City, area, or address" />
                </div>

                <div>
                  <label htmlFor="additional_notes" className="block text-sm font-medium text-surface-700 mb-1.5">Additional Information</label>
                  <textarea id="additional_notes" name="additional_notes" rows={4} maxLength={2000} value={formData.additional_notes} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                    placeholder="Tell us about your pest problem, property size, or any concerns..." />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-brand-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-all disabled:bg-surface-300 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 btn-press shadow-brand text-sm">
                  {loading ? 'Submitting...' : 'Submit Quote Request'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </div>

            {/* Map + Sidebar */}
            <div className="reveal reveal-delay-2 space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-surface-900 mb-6">Find Us</h2>
                <div className="rounded-2xl overflow-hidden shadow-soft-lg h-72 border border-surface-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32246132097!2d36.70730744999999!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Pestlord Solutions Location" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-surface-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-brand-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-all text-sm btn-press shadow-brand">
                    Request a Quote
                  </button>
                  <button onClick={() => onNavigate('booking')}
                    className="w-full bg-white text-brand-700 px-5 py-3 rounded-xl font-semibold border border-brand-200 hover:bg-brand-50 transition-all text-sm btn-press">
                    Book Inspection
                  </button>
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-surface-50 border border-surface-200 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-surface-900 mb-2">Emergency Service</h3>
                <p className="text-surface-500 text-sm mb-3">For urgent pest problems requiring immediate attention.</p>
                <p className="text-xl font-display font-bold text-surface-900">+254 700 000 000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} title="Frequently Asked Questions" subtitle="Quick answers to common questions" />
    </div>
  );
}
