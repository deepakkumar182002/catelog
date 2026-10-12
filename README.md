# EXPERIENCE LIFE — Premium Furniture Portfolio & Studio Platform

> **Brand**: EXPERIENCE LIFE  
> **Tagline**: Furniture for Every Space  
> **Philosophy**: Thoughtful designs. Functional spaces. Lasting quality.

A production-ready digital furniture portfolio, 3D experience, and lead-generation platform built for **EXPERIENCE LIFE**. Designed specifically to showcase premium furniture products, materials, construction quality, customization capabilities, and architectural craftsmanship to interior designers, architects, corporate buyers, hotels, and business clients.

> **Important**: This is **NOT** an e-commerce website. Product prices and checkout systems are strictly omitted in favor of bespoke consultation requests, technical specification downloads, and project quotes.

---

## 🏛️ Architectural Highlights & Features

1. **Interactive 3D Furniture Experience**:
   - Built with Three.js, React Three Fiber, and @react-three/drei.
   - Procedural, high-fidelity 3D model of the **Executive Work Desk (EL-D01)** matching exact real-world dimensions (5 ft length, 2 ft width, 2.5 ft height).
   - Interactive Wood (Teak, Walnut, Oak) and Metal Frame (Matte Black, Graphite, White) material switchers.
   - Smooth animated drawer extension mechanism.
   - GSAP ScrollTrigger camera interpolation that sweeps around the desk as the visitor scrolls through the hero section.
   - Instant first-paint fallback poster image for mobile performance and Lighthouse optimization.

2. **Full Authentic Catalogue Integration**:
   - Extracted directly from the official **Experience Life Furniture Catalogue 2026**:
     - `MODEL EL-D01`: Executive Work Desk
     - `MODEL EL-D02`: Minimal Work Desk
     - `MODEL EL-D03`: Z-Frame Desk
     - `MODEL EL-D04`: Modern Coffee Table
   - Interactive hotspot examinations:
     - Table Top (18–25 mm thickness, bevelled natural wood finish)
     - Drawer System (Four smooth drawers, full-extension telescopic channels)
     - Metal Frame (Strong MS square-pipe frame, matte black powder coating)
     - X Support (Engineered metal cross-support for maximum stability)
   - Interactive technical orthographic drawings (Front View, Side View, Top View).
   - Materials Showcase (Oak, Teak, Walnut, Sheesham, Natural Veneer, Solid Wood).
   - Tabletop Thickness Comparison (18 mm Standard vs. 25 mm Premium).
   - Metal Frame Finishes (Matte Black, Graphite Grey, White, Custom RAL).
   - Storage & Hardware details (16–20" telescopic channels, 12mm plywood drawer boxes, black profile handles).
   - Customization possibilities (Size, Material, Storage, Finish, Hardware, Spatial Layout).
   - Spatial Use Cases (Home, Office, Commercial, Interior Projects, Hospitality, Bulk Projects).
   - Curated Gallery with masonry filter tabs and fullscreen lightbox zoom.

3. **Inbound Project Consultation & Lead Generation**:
   - Comprehensive enquiry form with honeypot spam protection, rate limiting, and Zod validation.
   - Nodemailer integration using Gmail SMTP to automatically dispatch notification emails to studio administrators upon lead submission.
   - Celebratory completion animation (`canvas-confetti`).

4. **Studio Admin CMS (`/admin`)**:
   - Secure authentication with HTTP-only cookies and bcrypt password hashing.
   - Full dashboard analytics (Products, Enquiries, Materials, Finishes, Gallery).
   - Product CMS: Create, edit, publish/draft, and delete products.
   - Materials & Finishes CMS: Manage wood species, availability, and RAL colors.
   - Gallery CMS: Organize and upload visual assets.
   - Enquiry Management: Review inbound leads with status workflows (`NEW`, `IN REVIEW`, `QUOTED`, `CLOSED`).
   - Page Content CMS: Edit homepage headlines and brand copy directly.
   - Site Settings: Configure admin notification emails, phone numbers, and SEO metadata.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **3D Visualization**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation**: GSAP, GSAP ScrollTrigger, Framer Motion
- **Database**: MongoDB with Mongoose (with offline graceful fallback)
- **Authentication**: JWT in secure HTTP-only cookies + bcryptjs
- **File / Image Storage**: Cloudinary (with local storage fallback)
- **Email System**: Nodemailer with Gmail SMTP
- **Validation**: Zod

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn
- (Optional) MongoDB Atlas database URI & Gmail account for email alerts

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
# MongoDB Connection (Optional: Runs with offline seed data if omitted)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/experience_life

# Nodemailer Gmail Alerts
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
CONTACT_RECEIVER_EMAIL=admin@experiencelife.design

# Cloudinary (Optional: Falls back to local public/uploads/ if omitted)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin Authentication
AUTH_SECRET=experience-life-jwt-secure-studio-secret-2026
ADMIN_EMAIL=admin@experiencelife.design
ADMIN_PASSWORD=ExperienceLife#2026

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live studio website.

---

## 🔐 Admin Portal Access

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email**: `admin@experiencelife.design`
- **Default Password**: `ExperienceLife#2026`

*(You can customize these credentials in your `.env.local` file).*

---

## 📦 Production Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Deployment to Vercel / VPS
1. Push repository to GitHub or your Git provider.
2. Connect repository on **Vercel**, **Railway**, or your **VPS**.
3. Add the environment variables from `.env.example`.
4. Deploy with default Next.js build command (`npm run build`).

---

## 📄 Licence & Copyright

© 2026 **EXPERIENCE LIFE**. All rights reserved.
"Furniture for Every Space"
