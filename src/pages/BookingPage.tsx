import { useState, FormEvent } from 'react';
import { CheckCircle, AlertCircle, Calendar, Send, ArrowRight, Home, Phone } from 'lucide-react';
import { IMAGES } from '../constants/images';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', preferred_date: '', preferred_time: '', service_type: '', location: '', additional_notes: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const serviceTypes = ['Site Inspection', 'Termite Inspection', 'General Pest Consultation', 'Follow-up Visit', 'Emergency Service', 'Other'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
      if (!n8nWebhookUrl) throw new Error('Booking webhook not configured.');
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submitted_at: new Date().toISOString(), source: 'website-booking' }),
      });
      if (!response.ok) throw new Error(`Webhook request failed (${response.status}).`);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', preferred_date: '', preferred_time: '', service_type: '', location: '', additional_notes: '' });
    } catch {
      setError('Failed to submit booking. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="bg-surface-0 min-h-[80dvh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-brand-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-surface-900 mb-3">Booking Confirmed!</h2>
          <p className="text-surface-500 leading-relaxed mb-8">
            We've received your booking request. Our team will contact you shortly to confirm the appointment.
          </p>
          <div className="space-y-3">
            <button onClick={() => setSubmitted(false)}
              className="w-full bg-brand-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-all inline-flex items-center justify-center gap-2 btn-press shadow-brand text-sm">
              <Calendar className="h-4 w-4" />
              <span>Book Another</span>
            </button>
            <button onClick={() => onNavigate('home')}
              className="w-full bg-surface-100 text-surface-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-surface-200 transition-all inline-flex items-center justify-center gap-2 btn-press text-sm">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-0">
      {/* Hero */}
      <section className="relative bg-surface-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${IMAGES.company.technicians})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950/95 via-surface-950/80 to-brand-950/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="section-divider mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Book an Inspection</h1>
          <p className="text-xl text-surface-300 max-w-2xl">Schedule a convenient time for our experts to assess your property.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-surface-100 shadow-soft p-8">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="preferred_date" className="block text-sm font-medium text-surface-700 mb-1.5">Preferred Date *</label>
                  <input type="date" id="preferred_date" name="preferred_date" required min={today} value={formData.preferred_date} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                </div>
                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-medium text-surface-700 mb-1.5">Preferred Time *</label>
                  <input type="text" id="preferred_time" name="preferred_time" required maxLength={50} value={formData.preferred_time} onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    placeholder="e.g. 9am" />
                </div>
              </div>

              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-surface-700 mb-1.5">Service Type *</label>
                <select id="service_type" name="service_type" required value={formData.service_type} onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
                  <option value="">Select service type</option>
                  {serviceTypes.map((service) => (<option key={service} value={service}>{service}</option>))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-surface-700 mb-1.5">Property Location *</label>
                <input type="text" id="location" name="location" required maxLength={200} autoComplete="street-address" value={formData.location} onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  placeholder="Full address or detailed location" />
              </div>

              <div>
                <label htmlFor="additional_notes" className="block text-sm font-medium text-surface-700 mb-1.5">Additional Information</label>
                <textarea id="additional_notes" name="additional_notes" rows={4} maxLength={2000} value={formData.additional_notes} onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-sm placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                  placeholder="Any specific concerns, access instructions, or special requirements..." />
              </div>

              <div className="bg-surface-50 border border-surface-200 rounded-xl p-4">
                <p className="text-xs text-surface-500 leading-relaxed">
                  This is a booking request. We'll contact you to confirm availability. Most inspections take 30-60 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={loading}
                  className="flex-1 bg-brand-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-all disabled:bg-surface-300 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 btn-press shadow-brand text-sm">
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Booking'}</span>
                </button>
                <button type="button" onClick={() => onNavigate('contact')}
                  className="flex-1 bg-surface-100 text-surface-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-surface-200 transition-all inline-flex items-center justify-center gap-2 btn-press text-sm">
                  <span>Request Quote Instead</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-surface-500">
              For same-day service, call us at{' '}
              <a href="tel:+254700000000" className="font-semibold text-surface-900 hover:text-brand-600 transition-colors inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                +254 700 000 000
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
