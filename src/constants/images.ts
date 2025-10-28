/**
 * Centralized Image Constants
 * 
 * This file manages all image paths used throughout the application.
 * To use images:
 * 1. Place your images in the /public/images/ directory
 * 2. Update the paths below
 * 3. Import from this file: import { IMAGES } from '@/constants/images'
 */

// Hero Section Images
export const HERO_IMAGES = {
  background: '/images/hero/hero-background.jpg',
  technician: '/images/hero/technician-at-work.jpg',
  happyFamily: '/images/hero/happy-family.jpg',
};

// Service Images - Using Unsplash for now
export const SERVICE_IMAGES = {
  termiteControl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&q=80',
  rodentManagement: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop&q=80',
  fumigation: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=300&fit=crop&q=80',
  residential: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop&q=80',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&q=80',
  institutional: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&q=80',
};

// Company Images - Using Unsplash for now
export const COMPANY_IMAGES = {
  teamPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
  technicians: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=80',
  equipment: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&q=80',
};

// Certification Logos - Using Unsplash placeholders (REPLACE with actual logos)
export const CERTIFICATION_LOGOS = {
  pcpb: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=100&fit=crop&q=80',
  iso: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop&q=80',
  osha: 'https://images.unsplash.com/photo-1554224311-beee460ae6fb?w=200&h=100&fit=crop&q=80',
  nema: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop&q=80',
  kpca: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=100&fit=crop&q=80',
};

// Team Member Photos
export const TEAM_PHOTOS = {
  technician1: '/images/team/technician-1.jpg',
  technician2: '/images/team/technician-2.jpg',
  entomologist: '/images/team/entomologist.jpg',
  customerService: '/images/team/customer-service.jpg',
};

// Customer/Testimonial Photos - Using Unsplash professional headshots
export const CUSTOMER_PHOTOS = {
  customer1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
  customer2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
  customer3: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80',
  placeholder: 'https://ui-avatars.com/api/?name=Customer&background=16a34a&color=fff&size=200',
};

// Before/After Images
export const BEFORE_AFTER = {
  termite: {
    before: '/images/before-after/termite-before.jpg',
    after: '/images/before-after/termite-after.jpg',
  },
  rodent: {
    before: '/images/before-after/rodent-before.jpg',
    after: '/images/before-after/rodent-after.jpg',
  },
};

// Background Images
export const BACKGROUND_IMAGES = {
  experienceSection: '/images/backgrounds/experience-bg.jpg',
  ctaSection: '/images/backgrounds/cta-bg.jpg',
  valuesPattern: '/images/backgrounds/values-pattern.svg',
};

// Icons and Logos
export const BRAND_ASSETS = {
  logo: '/images/brand/pestlord-logo.png',
  logoWhite: '/images/brand/pestlord-logo-white.png',
  favicon: '/images/brand/favicon.ico',
};

// High-Quality Unsplash Images for Pest Control
export const PLACEHOLDERS = {
  // Hero Section - Professional pest control technician
  hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=80',
  
  // Services
  termiteControl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&q=80', // Wood/construction
  rodentManagement: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop&q=80', // Mouse/rodent
  fumigation: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=300&fit=crop&q=80', // Spray/fumigation
  residential: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop&q=80', // Beautiful home
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&q=80', // Office building
  institutional: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&q=80', // School/institution
  
  // Company & Team
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80', // Professional team
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80', // Modern office
  technicians: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=80', // Workers
  
  // Customers (Professional headshots)
  customer1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', // Woman
  customer2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', // Man
  customer3: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80', // Woman professional
  
  // Certifications (Professional badges/seals)
  certPCPB: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=100&fit=crop&q=80', // Badge/seal
  certISO: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop&q=80', // Certificate
  certOSHA: 'https://images.unsplash.com/photo-1554224311-beee460ae6fb?w=200&h=100&fit=crop&q=80', // Safety badge
  certNEMA: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop&q=80', // Environmental
  certKPCA: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=100&fit=crop&q=80', // Association badge
  
  // Generic fallback
  service: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&q=80',
  customer: 'https://ui-avatars.com/api/?name=Customer&background=16a34a&color=fff&size=200',
};

// Consolidated export
export const IMAGES = {
  hero: HERO_IMAGES,
  services: SERVICE_IMAGES,
  company: COMPANY_IMAGES,
  certifications: CERTIFICATION_LOGOS,
  team: TEAM_PHOTOS,
  customers: CUSTOMER_PHOTOS,
  beforeAfter: BEFORE_AFTER,
  backgrounds: BACKGROUND_IMAGES,
  brand: BRAND_ASSETS,
  placeholders: PLACEHOLDERS,
};

// Helper function to get image or fallback to placeholder
export const getImage = (imagePath: string, placeholderType: keyof typeof PLACEHOLDERS = 'service'): string => {
  // In production, you might want to check if the image exists
  // For now, return the path or placeholder
  return imagePath || PLACEHOLDERS[placeholderType];
};

export default IMAGES;

