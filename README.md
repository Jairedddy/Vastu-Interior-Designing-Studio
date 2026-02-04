# Vastu

A premium interior design studio showcase built with React, TypeScript, and Vite. Features a cinematic dark theme, elegant animations, and a sophisticated project exhibition system tailored for luxury interior design portfolios.

## 🚀 Overview

Vastu delivers a refined user experience with an elegant dark theme layout and cinematic micro-interactions throughout. The site showcases interior design projects with immersive galleries, interactive maps, and a streamlined consultation flow—each crafted for performance and visual excellence.

### Key Features

1. **Cinematic Hero**: Full-screen video background with art-directed responsive images and light leak overlays
2. **Project Exhibition**: Immersive project galleries with lightbox navigation and material showcases
3. **Interactive Maps**: Location-based project visualization using Leaflet/Mapbox integration
4. **Consultation Flow**: Multi-step form with email integration via SMTP
5. **Dark Theme**: Premium Estate Noir design system with Onyx/Ivory/Brass palette
6. **Animations**: Scroll-triggered reveals and micro-interactions powered by Framer Motion
7. **Type Safety**: End-to-end TypeScript with clear component boundaries
8. **Accessibility**: WCAG AA compliant contrast ratios and accessibility utilities

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript  
- **Build Tool**: Vite  
- **Styling**: Tailwind CSS with custom design tokens  
- **Animations**: Framer Motion  
- **Routing**: React Router DOM  
- **Maps**: Leaflet + React Leaflet, Mapbox GL  
- **Lightbox**: Yet Another React Lightbox  
- **Email**: Nodemailer (SMTP)  
- **Deployment**: Vercel (Serverless Functions)  

## 📦 Project Structure

```
├── api/                      # Vercel serverless functions
│   ├── contact.js           # Contact form email handler
│   └── health.js            # Health check endpoint
├── public/
│   ├── Images/              # Project images
│   │   ├── Obsidian/       # Project gallery images
│   │   └── Atellier Noir/  # Project gallery images
│   └── fonts/              # Custom font files
├── src/
│   ├── components/
│   │   ├── About.tsx                    # About section
│   │   ├── ConsultationFlow.tsx        # Multi-step consultation form
│   │   ├── HeroCinematic.tsx           # Cinematic hero with video
│   │   ├── HeroTrustCards.tsx          # Trust indicators
│   │   ├── ListingMap.tsx              # Interactive project map
│   │   ├── Navigation.tsx              # Main navigation
│   │   ├── ProjectDetail.tsx           # Project detail view
│   │   ├── ProjectExhibition.tsx       # Project gallery grid
│   │   ├── SectionHeader.tsx           # Reusable section headers
│   │   ├── SmartImage.tsx              # Optimized image component
│   │   └── SurfaceCard.tsx            # Card component
│   ├── lib/
│   │   ├── design-tokens.ts           # Estate Noir design system
│   │   └── typography.ts              # Typography utilities
│   ├── utils/
│   │   ├── accessibility-audit.tsx    # Accessibility utilities
│   │   └── contrast-checker.ts        # Color contrast validation
│   ├── constants.ts                    # Project data and constants
│   ├── types.ts                        # TypeScript type definitions
│   ├── App.tsx                         # Main app component
│   └── main.tsx                        # Entry point
├── dev-server.js                       # Local development API server
├── vercel.json                         # Vercel configuration
├── vite.config.ts                      # Vite configuration
└── tailwind.config.ts                  # Tailwind CSS configuration
```

## 🧑‍💻 Local Development

### Prerequisites

- Node.js 18+  
- npm (or yarn/pnpm)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vastu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   TO_ADDRESS=your-email@gmail.com
   ```

   **Gmail Setup (if using Gmail):**
   - Enable 2-Step Verification on your Google Account
   - Generate an App Password: Google Account → Security → 2-Step Verification → App passwords
   - Use the app password in `SMTP_PASS` (not your regular Gmail password)

### Run Development Server

**Option 1: Full Stack (Recommended)**
```bash
npm run dev:full
```
This runs both the frontend (Vite) and API server concurrently:
- Frontend: `http://localhost:5173`
- API Server: `http://localhost:5000`

**Option 2: Separate Terminals**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - API Server:
```bash
npm run dev:api
```

**Option 3: Vercel Dev (Production-like)**
```bash
npm run vercel:dev
```
Or:
```bash
npx vercel dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## 🎨 Design System

Vastu uses the **Estate Noir** design system—a premium dark theme optimized for luxury interior design aesthetics.

### Color Palette

- **Onyx**: Deep blacks (`#0d0d0d`, `#1a1a1a`) for backgrounds
- **Ivory**: Warm off-whites (`#f5f2ed`, `#e8e4dd`) for text
- **Brass**: Metallic accents (`#8c7e6d`, `#a69582`) for highlights

### Typography

- **Display**: Premium serif fonts for headings
- **Body**: Clean sans-serif for content
- **Accent**: Decorative fonts for special elements
- **Mono**: Monospace for technical content

All typography utilities are available via `src/lib/typography.ts` with preset configurations for common use cases.

## ✨ Animations

- Centralized Framer Motion variants and transitions
- Scroll-triggered reveals using Intersection Observer
- GPU-friendly transforms with custom easing `[0.22, 1, 0.36, 1]`
- Respects `prefers-reduced-motion` for accessibility
- Cinematic loading screen with smooth transitions

## 📡 API Endpoints

- `POST /api/contact` - Submit consultation form (sends email via SMTP)
- `GET /api/health` - Health check endpoint

The API routes work both locally (via `dev-server.js`) and on Vercel (when deployed as serverless functions).

## 🚢 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel project settings:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `TO_ADDRESS`
3. **Deploy** - Vercel will automatically build and deploy on push

The `vercel.json` configuration handles API route rewrites and build settings automatically.

### Build Output

The build command (`npm run build`) generates optimized assets in the `dist/` directory:
- TypeScript compilation check
- Vite production build with code splitting
- Image optimization via `vite-imagetools` (WebP conversion, quality optimization)

## ⚙️ Configuration Notes

- **Path Aliases**: Configured in `tsconfig.json` and `vite.config.ts`
- **Image Optimization**: Automatic WebP conversion with quality optimization (85% default, 20% for placeholders)
- **Proxy Configuration**: Vite dev server proxies `/api` requests to local API server
- **Accessibility**: WCAG AA compliant contrast ratios enforced via design tokens
- **Type Safety**: Strict TypeScript configuration with comprehensive type definitions

## 🌐 Browser Support

Modern evergreen browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers: iOS Safari, Chrome Mobile

## 📝 Notes

- Project images are served from `public/Images/` directory
- API routes work seamlessly in both local development and production
- Environment variables from `.env` are automatically loaded in local development
- Vercel dev runs everything on a single port (usually 3000)
- The consultation form includes validation and error handling

## 🔒 License

This project is private and proprietary.

---

Built with precision for luxury interior design.
