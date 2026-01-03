# Deploying to Vercel

This guide will walk you through deploying your AI App Store landing page to Vercel.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com) - it's free!)

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/AI-App-Store.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **That's it!** Your site will be live in ~2 minutes.

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **ai-app-store** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **No**

4. **For production deployment**
   ```bash
   vercel --prod
   ```

## Important: File Storage Limitation

⚠️ **Current Limitation**: Your app uses file-based storage (`/data` directory) which **won't work on Vercel** because:
- Vercel uses serverless functions (read-only filesystem)
- File writes are not persistent between deployments

### Solutions:

#### Option A: Use Vercel KV (Redis) - Recommended for Quick Fix
1. Add Vercel KV to your project:
   ```bash
   npm install @vercel/kv
   ```
2. Create a KV database in Vercel dashboard
3. Update API routes to use KV instead of file system

#### Option B: Use a Database (Best for Production)
- **Vercel Postgres** (recommended)
- **MongoDB Atlas** (free tier available)
- **Supabase** (free tier available)
- **PlanetScale** (free tier available)

#### Option C: Use an API Service
- **Airtable** (free tier)
- **Google Sheets API**
- **Notion API**

#### Option D: Temporary - Disable Storage (For Demo)
You can deploy now and the forms will work, but submissions won't be saved. Perfect for a landing page demo!

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to your project settings in Vercel
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Environment Variables** (If needed)
   - Go to Project Settings → Environment Variables
   - Add any API keys or secrets

3. **Automatic Deployments**
   - Every push to `main` branch = automatic production deployment
   - Every push to other branches = preview deployment

## Build Settings

Vercel auto-detects Next.js, but if needed:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors
- Check build logs in Vercel dashboard

### API Routes Not Working
- Ensure routes are in `app/api/` directory
- Check serverless function logs in Vercel dashboard
- Verify file storage is replaced with database/API

### Font Not Loading
- Space Grotesk is loaded via `next/font/google` - should work automatically
- Check network tab if issues persist

## Next Steps

1. ✅ Deploy to Vercel
2. 🔄 Replace file storage with database/API
3. 📧 Add email notifications (Resend, SendGrid, etc.)
4. 🔒 Add rate limiting
5. 📊 Add analytics (Vercel Analytics is free!)

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

