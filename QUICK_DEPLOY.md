# Quick Deploy to Vercel - 5 Minutes

## Step 1: Push to GitHub (2 min)

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Ready to deploy"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/AI-App-Store.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel (3 min)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Click **"Deploy"**
5. Wait ~2 minutes
6. **Done!** Your site is live 🎉

## Important Note About Forms

⚠️ The current file-based storage won't work on Vercel. You have two options:

### Option A: Deploy Now (Forms work but don't save)
- Perfect for demo/landing page
- Forms will submit successfully
- Submissions won't be stored (but you'll see success messages)

### Option B: Quick Fix - Use Webhook/Email Service
Use a service like:
- **Formspree** (free tier: 50 submissions/month)
- **Web3Forms** (free, unlimited)
- **EmailJS** (free tier available)

Just update the API routes to send to these services instead of saving files.

## Your Site Will Be Live At:
`https://ai-app-store.vercel.app` (or your custom domain)

## Automatic Deployments
- Every push to `main` = auto-deploy to production
- Every push to other branches = preview URL

That's it! 🚀

