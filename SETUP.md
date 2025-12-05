# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - Project name: `stamply` (or your choice)
   - Database password: (save this securely)
   - Region: Choose closest to you
4. Wait for the project to be created (~2 minutes)

### Get Your API Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### Run the Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

This will create all the necessary tables, indexes, and security policies.

## 3. Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Leave the Apple Wallet variables empty for now (mock mode will be used)

## 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. Test the Application

### Create a Merchant Account

1. Go to http://localhost:3000
2. Click "Get Started Free"
3. Sign up with an email and password
4. You'll be redirected to the dashboard

### Configure Your Loyalty Program

1. Click "Create Your Café" or go to "Program" in the nav
2. Fill in:
   - Business Name: e.g., "Café Monterrey"
   - Reward Name: e.g., "FREE ½ KG CAKE"
   - Stamps Required: e.g., 10
   - Stamp Unit Label: e.g., "slice"
3. Click "Create Program"

### Get Your Customer Sign-up Link

1. Go to "Share" in the dashboard
2. You'll see a QR code and a link like: `http://localhost:3000/c/abc12345`
3. Copy this link

### Test Customer Sign-up

1. Open the customer link in a new browser window (or incognito)
2. Enter a customer name and email
3. Click "Get My Loyalty Card"
4. A file will download (in mock mode, it's a .txt file)
5. You'll see a success message

### Test Stamping a Card

1. Go back to your merchant dashboard
2. Click "Stamp Card" in the nav
3. Open the downloaded customer file and copy the serial number
4. Paste it into the "Scan or Enter Pass Serial" field
5. Click "Stamp"
6. You'll see the stamp was added successfully!

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure you created `.env.local` and added your credentials
- Restart the dev server after adding environment variables

### "Loyalty program not found"

- Make sure you ran the database schema in Supabase SQL Editor
- Check that your Supabase credentials are correct

### Database errors

- Verify the schema was executed successfully in Supabase
- Check the Supabase logs in the dashboard

### Authentication issues

- Make sure email confirmation is disabled in Supabase:
  - Go to Authentication > Settings
  - Disable "Enable email confirmations"

## Next Steps

- Customize the branding and colors
- Add your logo URL in the program configuration
- For production: Set up Apple Wallet certificates (see README.md)
- Deploy to Vercel or your preferred hosting platform

## Need Help?

Check the main README.md for more detailed documentation.

