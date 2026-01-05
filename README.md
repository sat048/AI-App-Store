# [AI App Store - Landing Page (in progress)](https://www.ai-app-store-black.vercel.app)

A modern landing page for the AI App Store product.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Modern, responsive design
- Hero section with email signup (waitlist)
- Features showcase
- How it works section
- Contact form section
- Demo booking modal
- Fully functional messaging/contact system
- API routes for form submissions
- File-based data storage (easily upgradeable to database)
- Smooth animations and transitions

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── waitlist/
│   │   │   └── route.ts    # Waitlist signup API
│   │   └── contact/
│   │       └── route.ts    # Contact/Demo booking API
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── data/                   # Data storage (created automatically)
│   ├── waitlist.json       # Waitlist entries
│   └── contacts.json       # Contact form submissions
├── package.json
└── tailwind.config.js
```

## Messaging/Contact System

The application includes a fully functional messaging and contact system:

### Features

1. **Waitlist Signup** - Users can join the waitlist via the hero section form
2. **Contact Form** - Full contact form section with name, email, company, and message fields
3. **Demo Booking** - Modal form for booking demos with required company field
4. **Data Storage** - All submissions are stored in JSON files in the `/data` directory
5. **Validation** - Client and server-side validation for all forms
6. **Error Handling** - Proper error messages and success notifications

### API Endpoints

- `POST /api/waitlist` - Submit email to waitlist
- `GET /api/waitlist` - View waitlist entries (for admin use)
- `POST /api/contact` - Submit contact form or demo request
- `GET /api/contact` - View contact submissions (for admin use)

### Data Storage

By default, the system uses file-based storage (JSON files). This is perfect for development and small-scale deployments. For production, you can easily upgrade to a database by:

1. Installing a database package (e.g., `prisma`, `mongoose`, or `@vercel/postgres`)
2. Updating the API routes to use the database instead of file system
3. The data structure remains the same, making migration straightforward

### Production Considerations

For production deployment, consider:

1. **Email Notifications** - Add email service integration (Resend, SendGrid, etc.) to notify you of new submissions
2. **Database** - Migrate from file storage to a proper database (PostgreSQL, MongoDB, etc.)
3. **Rate Limiting** - Add rate limiting to prevent spam
4. **Authentication** - Add authentication to admin GET endpoints
5. **Environment Variables** - Configure email and database credentials via environment variables

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/AI-App-Store.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

**Note**: File-based storage won't work on Vercel. See `DEPLOYMENT.md` for solutions.

For detailed deployment instructions, see:
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 5-minute quick start
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide with storage solutions

