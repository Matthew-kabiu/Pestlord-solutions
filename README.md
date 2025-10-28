# PestLord Solutions

**Professional Pest Management Website**

PestLord Solutions is a modern, responsive web application for a professional pest control company operating across Kenya. The platform provides comprehensive pest management services for residential, commercial, and institutional properties, featuring an intuitive booking system, detailed service information, and seamless customer engagement capabilities.

---

## 🌐 Website Overview

PestLord Solutions is a fully responsive, single-page application that serves as the digital presence for a leading pest management company. The platform enables clients to:

- **Request Service Quotes** - Comprehensive quotation form for instant pricing
- **Book Inspections** - Schedule professional pest inspections with flexible time slots
- **Explore Services** - Detailed information on termite control, rodent management, fumigation, and more
- **Contact Support** - Multiple contact channels with integrated communication forms
- **Learn About Us** - Company history, certifications, team expertise, and core values

---

## 🚀 Technologies Used

### Frontend
- **React 18.3** - Modern UI framework for building interactive interfaces
- **TypeScript 5.5** - Type-safe JavaScript for enhanced code quality and developer experience
- **Vite 7** - Lightning-fast build tool and development server
- **Tailwind CSS 3.4** - Utility-first CSS framework for responsive, modern designs
- **Lucide React 0.344** - Beautiful, customizable icon library

### Backend Integration
- **n8n** - Workflow automation for form submissions and data processing
- **Google Sheets** - Data storage and management via n8n integration
- **NewsAPI** - Dynamic content delivery for blog functionality

### Deployment
- **Docker** - Containerized application for consistent deployments
- **Nginx** - High-performance web server for production environments
- **Port**: 3012 - Configured for optimal performance

---

## 📦 Getting Started

### Prerequisites
- Node.js 20+ and npm
- Docker (optional, for containerized deployment)
- n8n instance (for form submissions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Matthew-kabiu/pestlord-solutions.git
   cd pestlord-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # n8n webhook for Booking submissions
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/booking
   
   # n8n webhook for Quote requests
   VITE_N8N_QUOTE_WEBHOOK_URL=https://your-n8n-instance.com/webhook/quote
   
   # n8n webhook for Contact submissions
   VITE_N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

---

## 🐳 Docker Deployment

For production deployment using Docker:

```bash
# Build and start the container
docker-compose up -d

# Access the application
# Browser: http://localhost:3012

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

For detailed Docker setup instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md)

---

## 📋 Key Features

### Service Management
- **Residential Pest Control** - Home protection solutions
- **Commercial Services** - Business and restaurant pest management
- **Institutional Solutions** - Schools and hospitals
- **Specialized Treatments** - Termite, rodent, and fumigation services

### Customer Engagement
- **Interactive Forms** - Quote requests and booking management
- **FAQ Section** - Comprehensive answers to common questions
- **Testimonials** - Client success stories and reviews
- **Contact Integration** - Phone, email, and location information

### Technical Excellence
- **Responsive Design** - Mobile-first approach for all devices
- **Fast Performance** - Optimized loading and smooth animations
- **SEO Optimized** - Search engine friendly structure
- **Accessibility** - WCAG compliant interface

---

## 🔄 Data Integration

### Booking System
The booking form integrates with n8n to automate data collection:
1. Client fills out inspection booking form
2. Data is sent to n8n webhook
3. n8n processes and appends to Google Sheets
4. Admin receives notification for scheduling

See [Google Sheet.md](Google%20Sheet.md) for data structure details.

---

## 📁 Project Structure

```
pestlord-solutions/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main page components
│   ├── constants/      # Configuration and constants
│   ├── data/           # Static data files
│   └── App.tsx         # Main application entry
├── public/             # Static assets
├── Dockerfile          # Docker build configuration
├── docker-compose.yml  # Docker orchestration
└── nginx.conf          # Web server configuration
```

---

## 🛠️ Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## 📄 License

Copyright © 2024 PestLord Solutions. All rights reserved.

---

## 👤 Built By

**SpookieLabsInc** - Professional web development solutions

---

## 📞 Contact

- **Website**: PestLord Solutions
- **Location**: Nairobi, Kenya
- **Email**: info@pestlord.co.ke
- **Phone**: +254 700 000 000
