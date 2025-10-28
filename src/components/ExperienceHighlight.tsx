// Experience Highlight component - showcases company experience
import { Clock } from 'lucide-react';
import { IMAGES } from '../constants/images';

export default function ExperienceHighlight() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${IMAGES.placeholders.office})` }}
          ></div>
          
          {/* Content */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Clock className="h-12 w-12 mb-4" />
              <h2 className="text-3xl font-bold mb-4">Why Experience Matters</h2>
              <p className="text-green-50 text-lg">
                With over a decade of experience, we've encountered and successfully resolved virtually every pest problem imaginable. Our knowledge and expertise mean faster diagnosis, more effective treatment, and lasting results for you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
                <h3 className="font-semibold mb-2">Continuous Training</h3>
                <p className="text-green-50">Our team regularly updates their skills with the latest pest control techniques and technologies.</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
                <h3 className="font-semibold mb-2">Proven Methods</h3>
                <p className="text-green-50">We use time-tested strategies combined with innovative solutions for optimal results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

