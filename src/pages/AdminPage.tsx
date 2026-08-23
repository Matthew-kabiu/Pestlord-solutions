import { useState, type ReactNode } from 'react';
import { FileText, Calendar, Mail, type LucideIcon } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'quotes' | 'bookings' | 'messages'>('quotes');

  const SectionCard = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) => (
    <div className="bg-white rounded-2xl border border-surface-100 shadow-soft p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-brand-600" />
        </div>
        <h3 className="font-display font-semibold text-surface-900">{title}</h3>
      </div>
      <div className="text-surface-600 space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div className="bg-surface-50 min-h-screen">
      <section className="bg-surface-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard</h1>
          <p className="text-surface-400">Data is managed via Google Sheets through n8n workflows.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-6">
            {(['quotes', 'bookings', 'messages'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all btn-press ${
                  activeTab === tab
                    ? 'bg-brand-600 text-white shadow-brand'
                    : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200'
                }`}
              >
                {tab === 'quotes' ? 'Quote Requests' : tab === 'bookings' ? 'Bookings' : 'Messages'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeTab === 'quotes' && (
              <SectionCard icon={FileText} title="Quote Requests">
                <p>Quote requests are appended to your Google Sheet by the n8n Quote webhook. Use Google Sheets filters and sorting to manage statuses (pending, contacted, completed, cancelled).</p>
                <p>Update columns like <span className="font-medium text-surface-900">status</span>, <span className="font-medium text-surface-900">assigned_to</span>, and <span className="font-medium text-surface-900">admin_comments</span> directly in the sheet.</p>
              </SectionCard>
            )}

            {activeTab === 'bookings' && (
              <SectionCard icon={Calendar} title="Bookings">
                <p>Bookings from the website are sent to the n8n Booking webhook and appended to the <span className="font-medium text-surface-900">Bookings</span> sheet. Manage scheduling from there.</p>
                <p>Sheet column spec is documented in <span className="font-medium text-surface-900">Google Sheet.md</span>.</p>
              </SectionCard>
            )}

            {activeTab === 'messages' && (
              <SectionCard icon={Mail} title="Contact Messages">
                <p>Contact form submissions are routed via n8n and stored in your sheet. Use the sheet to triage and respond.</p>
              </SectionCard>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
