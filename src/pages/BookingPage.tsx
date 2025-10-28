import { useState, FormEvent } from 'react';
// Submissions are routed to an n8n webhook instead of Supabase
import { CheckCircle, AlertCircle, Calendar, Send, FileText, Home } from 'lucide-react';
import { IMAGES } from '../constants/images';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    service_type: '',
    location: '',
    additional_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const serviceTypes = [
    'Site Inspection',
    'Termite Inspection',
    'General Pest Consultation',
    'Follow-up Visit',
    'Emergency Service',
    'Other'
  ];



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
      if (!n8nWebhookUrl) {
        throw new Error('Booking webhook not configured. Set VITE_N8N_WEBHOOK_URL in your environment.');
      }

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          submitted_at: new Date().toISOString(),
          source: 'website-booking'
        })
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Webhook request failed (${response.status}). ${text}`.trim());
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        preferred_time: '',
        service_type: '',
        location: '',
        additional_notes: ''
      });
    } catch (err) {
      setError('Failed to submit booking. Please try again or contact us directly.');
      console.error('Error submitting booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-700" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-lg text-gray-600 mb-8">
            We've received your booking request. Our team will contact you shortly to confirm the appointment and provide additional details.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Another Inspection</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-green-900 to-green-700 text-white py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.company.technicians})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 to-green-700/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">Book an Inspection</h1>
          </div>
          <p className="text-xl text-green-50 max-w-3xl">
            Schedule a convenient time for our pest control experts to visit your property and assess your needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    required
                    min={today}
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="text"
                    id="preferred_time"
                    name="preferred_time"
                    required
                    value={formData.preferred_time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="8am"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  id="service_type"
                  name="service_type"
                  required
                  value={formData.service_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Full address or detailed location"
                />
              </div>

              <div>
                <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additional_notes"
                  name="additional_notes"
                  rows={4}
                  value={formData.additional_notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Any specific concerns, access instructions, or special requirements..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This is a booking request. We'll contact you to confirm availability for your preferred date and time. Most inspections take 30-60 minutes depending on property size.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{loading ? 'Submitting...' : 'Submit Booking Request'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  <span>Request Quote Instead</span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>For same-day service or urgent requests, call us at <strong>+254 700 000 000</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
}
