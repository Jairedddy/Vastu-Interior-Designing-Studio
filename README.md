# Vastu

A private interior design studio showcase built with React, TypeScript, and Vite.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TO_ADDRESS=your-email@gmail.com
```

**Note:** When deploying to Vercel, you'll also need to add these environment variables in your Vercel project settings for production deployments.

### 3. Gmail Setup (if using Gmail)

1. **Enable 2-Step Verification** on your Google Account
2. **Generate an App Password**:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS` (not your regular Gmail password)

## Development

### Option 1: Local Development (Recommended)

Run both frontend and API server together:

```bash
npm run dev:full
```

This will:
- Start the Vite frontend on `http://localhost:5173`
- Start the local API server on `http://localhost:5000`
- Proxy API requests from frontend to the API server automatically

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - API Server:**
```bash
npm run dev:api
```

### Option 3: Vercel Dev (for production-like testing)

If you have Vercel CLI set up and authenticated:

```bash
npm run vercel:dev
```

Or:
```bash
npx vercel dev
```

## Build

```bash
npm run build
```

## API Endpoints

- `POST /api/contact` - Submit consultation form
- `GET /api/health` - Health check endpoint

## Project Structure

```
├── api/                 # Vercel serverless functions
│   ├── contact.js      # Contact form handler
│   └── health.js       # Health check endpoint
├── src/
│   ├── components/     # React components
│   ├── lib/            # Design tokens and utilities
│   └── ...
├── dev-server.js       # Local development API server
├── vercel.json         # Vercel configuration
└── vite.config.ts      # Vite configuration
```

## Notes

- The API routes work both locally (via `dev-server.js`) and on Vercel (when deployed)
- Environment variables from `.env` are automatically loaded in local development
- For production, add environment variables in Vercel project settings
- Vercel dev runs everything on a single port (usually 3000)
