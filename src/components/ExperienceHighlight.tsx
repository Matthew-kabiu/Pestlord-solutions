import { Clock } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function ExperienceHighlight() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal relative bg-brand-600 rounded-3xl p-8 md:p-14 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${IMAGES.placeholders.office})` }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Clock className="h-7 w-7" />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight mb-4">Why Experience Matters</h2>
              <p className="text-white/80 leading-relaxed">
                With over a decade of experience, we've encountered and successfully resolved virtually every pest problem. Our knowledge means faster diagnosis, more effective treatment, and lasting results.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <h3 className="font-display font-semibold mb-2">Continuous Training</h3>
                <p className="text-white/70 text-sm leading-relaxed">Our team regularly updates their skills with the latest pest control techniques and technologies.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <h3 className="font-display font-semibold mb-2">Proven Methods</h3>
                <p className="text-white/70 text-sm leading-relaxed">We use time-tested strategies combined with innovative solutions for optimal results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
