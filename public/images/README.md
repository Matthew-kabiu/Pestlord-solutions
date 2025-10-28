# Images Directory Structure

This directory contains all images used in the PestLord Solutions website.

## Directory Structure

```
public/images/
├── hero/                    # Hero section images
│   ├── hero-background.jpg
│   ├── technician-at-work.jpg
│   └── happy-family.jpg
│
├── services/                # Service-specific images
│   ├── termite-control.jpg
│   ├── rodent-management.jpg
│   ├── fumigation.jpg
│   ├── residential.jpg
│   ├── commercial.jpg
│   └── institutional.jpg
│
├── company/                 # Company photos
│   ├── team-photo.jpg
│   ├── office.jpg
│   ├── technicians.jpg
│   └── equipment.jpg
│
├── certifications/          # Certification logos
│   ├── pcpb-logo.png
│   ├── iso-9001-logo.png
│   ├── osha-logo.png
│   ├── nema-logo.png
│   └── kpca-logo.png
│
├── team/                    # Team member photos
│   ├── technician-1.jpg
│   ├── technician-2.jpg
│   ├── entomologist.jpg
│   └── customer-service.jpg
│
├── customers/               # Customer testimonial photos
│   ├── sarah-mwangi.jpg
│   ├── david-ochieng.jpg
│   ├── grace-kimani.jpg
│   └── placeholder-avatar.jpg
│
├── before-after/            # Before/after project photos
│   ├── termite-before.jpg
│   ├── termite-after.jpg
│   ├── rodent-before.jpg
│   └── rodent-after.jpg
│
├── backgrounds/             # Background images and patterns
│   ├── experience-bg.jpg
│   ├── cta-bg.jpg
│   └── values-pattern.svg
│
└── brand/                   # Brand assets
    ├── pestlord-logo.png
    ├── pestlord-logo-white.png
    └── favicon.ico
```

## Image Guidelines

### File Formats
- **Photos**: Use `.jpg` or `.webp` for photographs
- **Logos/Icons**: Use `.png` for logos with transparency
- **Patterns**: Use `.svg` for scalable patterns

### Image Sizes
- **Hero Images**: 1920x1080px (Full HD)
- **Service Cards**: 400x300px
- **Team Photos**: 400x400px (Square)
- **Customer Photos**: 200x200px (Square)
- **Certification Logos**: 200x100px (Maintain aspect ratio)
- **Background Images**: 1920x1080px or larger

### Optimization
- Compress all images before uploading
- Use tools like TinyPNG, ImageOptim, or Squoosh
- Target file sizes:
  - Hero images: < 200KB
  - Service images: < 100KB
  - Logos: < 50KB
  - Thumbnails: < 30KB

### Naming Convention
- Use lowercase with hyphens: `team-photo.jpg`
- Be descriptive: `termite-control-service.jpg`
- Avoid spaces and special characters

## Usage

Import images in your components:

```typescript
import { IMAGES } from '../constants/images';

// Use in component
<img src={IMAGES.services.termiteControl} alt="Termite Control" />

// Or use the helper function
import { getImage } from '../constants/images';
<img src={getImage(IMAGES.services.termiteControl)} alt="Termite Control" />
```

## Placeholders

Until you add your actual images, the app uses placeholder images from Unsplash and UI Avatars. Replace these with your actual images by placing them in the appropriate directories and updating the paths in `src/constants/images.ts`.

