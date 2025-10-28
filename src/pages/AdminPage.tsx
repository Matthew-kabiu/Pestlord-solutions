import { useState } from 'react';
import { FileText, Calendar, Mail } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'quotes' | 'bookings' | 'messages'>('quotes');

  const SectionCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: any }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-green-700" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700 space-y-3">{children}</div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-green-50">Data is managed via Google Sheets through n8n workflows.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-6">
              <button
              onClick={() => setActiveTab('quotes')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'quotes' ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
              Quote Requests
              </button>
              <button
              onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'bookings' ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
              Bookings
              </button>
              <button
              onClick={() => setActiveTab('messages')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'messages' ? 'bg-green-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
              Messages
              </button>
          </div>

            <div className="space-y-4">
              {activeTab === 'quotes' && (
              <SectionCard icon={FileText} title="Quote Requests">
                <p>
                  Quote requests are appended to your Google Sheet by the n8n Quote webhook. Use Google Sheets
                  filters and sorting to manage statuses (pending, contacted, completed, cancelled).
                </p>
                <p>
                  Update columns like <span className="font-medium">status</span>, <span className="font-medium">assigned_to</span>, and
                  <span className="font-medium"> admin_comments</span> directly in the sheet.
                </p>
              </SectionCard>
              )}

              {activeTab === 'bookings' && (
              <SectionCard icon={Calendar} title="Bookings">
                <p>
                  Bookings from the website are sent to the n8n Booking webhook and appended to the
                  <span className="font-medium"> Bookings</span> sheet. Manage scheduling from there.
                </p>
                <p>
                  Sheet column spec is documented in <span className="font-medium">Google Sheet.md</span>.
                </p>
              </SectionCard>
              )}

              {activeTab === 'messages' && (
              <SectionCard icon={Mail} title="Contact Messages">
                <p>
                  Contact form submissions are routed via n8n and stored in your sheet. Use the sheet to triage
                  and respond.
                </p>
              </SectionCard>
              )}
            </div>
        </div>
      </section>
    </div>
  );
}
