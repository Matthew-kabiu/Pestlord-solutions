import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Facebook, Twitter, Linkedin, Instagram, Music2 } from 'lucide-react';
import FAQ from '../components/FAQ';
import { faqs } from '../data/faqs';
import { IMAGES } from '../constants/images';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    location: '',
    additional_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const webhookUrl = import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL as string | undefined;
      if (!webhookUrl) {
        throw new Error('Quote webhook not configured. Set VITE_N8N_QUOTE_WEBHOOK_URL in your environment.');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submitted_at: new Date().toISOString(),
          source: 'website-quote'
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
        service_type: '',
        location: '',
        additional_notes: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit quote request. Please try again or contact us directly.');
      console.error('Error submitting quote:', err);
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 700 000 000', '+254 711 000 000'],
      description: 'Mon-Sat: 8:00 AM - 6:00 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@pestlord.co.ke', 'support@pestlord.co.ke'],
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['Nairobi, Kenya'],
      description: 'Visit by appointment'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      description: 'Emergency service available 24/7'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-br from-green-900 to-green-700 text-white py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.company.office})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 to-green-700/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Get in touch with our team. We're here to help with your pest control needs.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="h-10 w-10 text-green-700 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 id="quote-form" className="text-3xl font-bold text-gray-900 mb-6">Request a Quote</h2>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800">Thank you! We've received your message and will respond shortly.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

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
                    placeholder="City, area, or address"
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
                    placeholder="Tell us more about your pest problem, property size, or any specific concerns..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-96 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32246132097!2d36.70730744999999!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pestlord Solutions Location"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('quote-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors"
                  >
                    Request a Quote
                  </button>
                  <button
                    onClick={() => onNavigate('booking')}
                    className="w-full bg-white text-green-700 px-4 py-2 rounded-lg font-medium border-2 border-green-700 hover:bg-green-50 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Book Inspection</span>
                  </button>
                  <button
                    onClick={() => onNavigate('services')}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>View Services</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Service</h3>
                <p className="text-gray-600 mb-3">
                  For urgent pest problems requiring immediate attention, call our emergency hotline available 24/7.
                </p>
                <p className="text-xl font-bold text-gray-900">+254 700 000 000</p>
              </div>

              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-green-700 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-green-700 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-green-700 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-green-700 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" aria-label="TikTok" className="text-gray-600 hover:text-green-700 transition-colors">
                    <Music2 className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} title="Frequently Asked Questions" subtitle="Quick answers to common questions" />
    </div>
  );
}
