# Unsplash Images Currently Used

## 🎨 Image Sources

All images are currently sourced from Unsplash with proper optimization parameters (`w`, `h`, `fit=crop`, `q=80`).

---

## 📸 **Hero Section**

**Background Image:**
- URL: `https://images.unsplash.com/photo-1581578731548-c64695cc6952`
- Description: Professional pest control/construction work
- Size: 1920x1080px
- Usage: Hero background with gradient overlay

---

## 🏠 **Services Section**

### 1. Termite Control
- URL: `https://images.unsplash.com/photo-1563453392212-326f5e854473`
- Description: Wood/construction material
- Size: 400x300px

### 2. Rodent Management
- URL: `https://images.unsplash.com/photo-1585435557343-3b092031a831`
- Description: Mouse/rodent related
- Size: 400x300px

### 3. Fumigation Services
- URL: `https://images.unsplash.com/photo-1584036561566-baf8f5f1b144`
- Description: Spray/fumigation equipment
- Size: 400x300px

### 4. Residential Services
- URL: `https://images.unsplash.com/photo-1568605114967-8130f3a36994`
- Description: Beautiful modern home
- Size: 400x300px

### 5. Commercial Solutions
- URL: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab`
- Description: Modern office building
- Size: 400x300px

### 6. Institutional Services
- URL: `https://images.unsplash.com/photo-1519389950473-47ba0277781c`
- Description: School/institutional building
- Size: 400x300px

---

## 👥 **Company Section**

### Team Photo
- URL: `https://images.unsplash.com/photo-1522071820081-009f0129c71c`
- Description: Professional team collaboration
- Size: 800x600px
- Usage: "Who We Are" section

### Office
- URL: `https://images.unsplash.com/photo-1497366216548-37526070297c`
- Description: Modern office space
- Size: 800x600px
- Usage: Experience section background

### Technicians
- URL: `https://images.unsplash.com/photo-1581578731548-c64695cc6952`
- Description: Workers/technicians at work
- Size: 800x600px

### Equipment
- URL: `https://images.unsplash.com/photo-1584036561566-baf8f5f1b144`
- Description: Professional equipment/spray
- Size: 800x600px

---

## 🏆 **Certifications Section**

**Note:** These are placeholder images. **MUST be replaced with actual certification logos.**

### PCPB Logo
- URL: `https://images.unsplash.com/photo-1589829545856-d10d557cf95f`
- Description: Badge/seal placeholder
- Size: 200x100px
- **ACTION REQUIRED:** Replace with actual PCPB logo

### ISO 9001:2015 Logo
- URL: `https://images.unsplash.com/photo-1450101499163-c8848c66ca85`
- Description: Certificate placeholder
- Size: 200x100px
- **ACTION REQUIRED:** Replace with actual ISO certification logo

### OSHA Logo
- URL: `https://images.unsplash.com/photo-1554224311-beee460ae6fb`
- Description: Safety badge placeholder
- Size: 200x100px
- **ACTION REQUIRED:** Replace with actual OSHA logo

### NEMA Logo
- URL: `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3`
- Description: Environmental badge placeholder
- Size: 200x100px
- **ACTION REQUIRED:** Replace with actual NEMA logo

### KPCA Logo
- URL: `https://images.unsplash.com/photo-1589829545856-d10d557cf95f`
- Description: Association badge placeholder
- Size: 200x100px
- **ACTION REQUIRED:** Replace with actual KPCA logo

---

## 💬 **Testimonials Section**

### Customer 1 - Sarah Mwangi
- URL: `https://images.unsplash.com/photo-1494790108377-be9c29b29330`
- Description: Professional woman headshot
- Size: 200x200px (circular display)

### Customer 2 - David Ochieng
- URL: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`
- Description: Professional man headshot
- Size: 200x200px (circular display)

### Customer 3 - Grace Kimani
- URL: `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e`
- Description: Professional woman headshot
- Size: 200x200px (circular display)

---

## 📊 **Image Optimization Parameters**

All Unsplash URLs include:
- `w` - Width parameter for responsive sizing
- `h` - Height parameter for aspect ratio
- `fit=crop` - Ensures proper cropping
- `q=80` - Quality at 80% (good balance between quality and file size)

Example:
```
https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=80
```

---

## ⚡ **Performance Benefits**

Using Unsplash's CDN provides:
- ✅ Fast global delivery
- ✅ Automatic image optimization
- ✅ Responsive image sizing
- ✅ No hosting costs
- ✅ High-quality professional images

---

## 🔄 **How to Replace with Your Own Images**

### Option 1: Keep Using Unsplash (Temporary)
Current setup works perfectly for development and testing.

### Option 2: Replace with Your Images
1. Take/obtain professional photos
2. Optimize them (compress, resize)
3. Place in `/public/images/` folders
4. Update paths in `/src/constants/images.ts`

Example:
```typescript
// Change from:
termiteControl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&q=80',

// To:
termiteControl: '/images/services/termite-control.jpg',
```

---

## ⚠️ **Important Notes**

### Licensing
- Unsplash images are free to use under the Unsplash License
- No attribution required (but appreciated)
- Can be used for commercial projects
- Read more: https://unsplash.com/license

### Priority Replacements
1. **Certification Logos** - CRITICAL (must use actual logos)
2. **Hero Image** - HIGH (should show your actual work/team)
3. **Service Images** - HIGH (real photos build more trust)
4. **Team Photo** - MEDIUM (your actual team)
5. **Customer Photos** - MEDIUM (with permission)

---

## 📱 **Responsive Behavior**

All images are set to:
- `object-fit: cover` - Fills container while maintaining aspect ratio
- Responsive sizing based on container
- Optimized for mobile, tablet, and desktop

---

## ✨ **Current Status**

✅ All images loading from Unsplash CDN  
✅ Proper optimization parameters applied  
✅ No broken image links  
✅ Fast loading times  
✅ Professional appearance  
⚠️ Certification logos need replacement  
⚠️ Consider replacing with actual company photos for authenticity  

---

## 🎯 **Next Steps**

1. **Test the website** - See how images look
2. **Gather your photos** - Take professional photos of:
   - Your team
   - Your work (before/after)
   - Your equipment
   - Your office/facility
3. **Obtain certification logos** - Contact certification bodies
4. **Get customer permissions** - For testimonial photos
5. **Replace gradually** - Start with high-priority images

---

**Your website now has beautiful, professional images from Unsplash! 🎉**

The site looks polished and professional while you gather your own photos.

