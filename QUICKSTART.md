# 🚀 Quick Start - Get Running in 5 Minutes

## Prerequisites
- Node.js 18.17+ (or 20+)
- A Supabase account (free)

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up/Login
2. Click **"New Project"**
3. Fill in project details and wait for creation
4. Go to **Settings** → **API** and copy:
   - Project URL
   - anon/public key
5. Go to **SQL Editor** → **New Query**
6. Copy/paste contents of `supabase/schema.sql` → Click **Run**

## Step 3: Configure Environment (30 sec)

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## Step 4: Run the App (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test It Out (1 min)

1. Click **"Get Started Free"**
2. Sign up with any email/password
3. Fill in your café details:
   - Business: "Test Café"
   - Reward: "FREE COFFEE"
   - Stamps: 10
   - Unit: "coffee"
4. Click **"Create Program"**
5. Go to **"Share"** → Copy the customer link
6. Open link in incognito/new browser
7. Sign up as a customer
8. Download the loyalty card
9. Go back to merchant dashboard → **"Stamp Card"**
10. Enter the serial number from the downloaded file
11. Click **"Stamp"** → Success! ✅

## 🎉 You're Done!

You now have a working digital loyalty card system.

## What's Next?

- Customize your program settings
- Print the QR code for your counter
- Share the link on social media
- For production: Set up Apple Wallet certificates (see README.md)

## Need Help?

- **Full Documentation**: See `README.md`
- **Detailed Setup**: See `SETUP.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

## Common Issues

**"Missing Supabase environment variables"**
→ Make sure `.env.local` exists and has your Supabase credentials

**"Loyalty program not found"**
→ Make sure you ran the SQL schema in Supabase

**Authentication not working**
→ In Supabase, go to Authentication → Settings → Disable "Enable email confirmations"

---

**Happy stamping! 🎫**

