# Stamply - Digital Loyalty Card SaaS

A standalone SaaS application that lets small cafés and bakeries create digital loyalty cards that integrate with Apple Wallet.

## Features

- 🔐 **Merchant Authentication** - Email/password signup and login via Supabase Auth
- 🏪 **Business Management** - Create and configure your café's loyalty program
- 🎁 **Customizable Rewards** - Define your own rewards and stamp requirements
- 📱 **Apple Wallet Integration** - Generate .pkpass files for customers (with mock mode for development)
- 📊 **Dashboard** - View stats, manage programs, and stamp customer cards
- 🔗 **Customer Sign-up** - Public pages with QR codes for easy customer onboarding
- ⚡ **Real-time Stamping** - Scan customer cards to add stamps instantly

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database & Auth**: Supabase
- **Pass Generation**: Custom PassKit service (mock mode included)

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn
- Supabase account (free tier works)
- (Optional) Apple Developer account for production PassKit certificates

## Getting Started

### 1. Clone and Install

```bash
cd LoyaltyCard
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Go to SQL Editor and run the schema from `supabase/schema.sql`

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── customers/create/   # Customer creation & pass generation
│   │   └── pass/stamp/         # Stamp card endpoint
│   ├── auth/                   # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/              # Merchant dashboard
│   │   ├── program/            # Program configuration
│   │   ├── share/              # QR code & share link
│   │   └── stamp/              # Stamp customer cards
│   ├── c/[publicId]/           # Public customer sign-up page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── lib/
│   ├── supabase/               # Supabase client configuration
│   ├── passkit/                # Apple Wallet PassKit service
│   └── utils.ts                # Utility functions
├── types/
│   └── database.ts             # TypeScript types
├── supabase/
│   └── schema.sql              # Database schema
└── README.md
```

## Usage Guide

### For Merchants

1. **Sign Up**: Create an account at `/auth/signup`
2. **Configure Program**: Set up your business and loyalty program at `/dashboard/program`
   - Business name
   - Reward name (e.g., "FREE ½ KG CAKE")
   - Stamps required (e.g., 10)
   - Stamp unit label (e.g., "slice")
3. **Share**: Get your QR code and link at `/dashboard/share`
4. **Stamp Cards**: Use `/dashboard/stamp` to scan customer cards and add stamps

### For Customers

1. Scan the merchant's QR code or visit their sign-up link
2. Enter your name and email (optional)
3. Download your digital loyalty card
4. Show your card at checkout to earn stamps
5. Unlock rewards when you reach the required stamps!

## Apple Wallet PassKit Configuration

### Development Mode (Default)

The app runs in **mock mode** by default, which means:
- No Apple Developer account needed
- Pass files are generated as plain text (.txt) instead of .pkpass
- Perfect for testing the full flow without certificates

### Production Mode

To generate real .pkpass files for Apple Wallet:

1. **Get an Apple Developer Account** ($99/year)

2. **Create a Pass Type ID**:
   - Go to [developer.apple.com](https://developer.apple.com)
   - Certificates, Identifiers & Profiles > Identifiers
   - Create a new Pass Type ID (e.g., `pass.com.stamply.loyalty`)

3. **Generate Certificates**:
   - Create a Pass Type ID Certificate (.p12 file)
   - Download the WWDR (Worldwide Developer Relations) certificate

4. **Configure Environment Variables**:

```env
APPLE_PASS_CERTIFICATE_PATH=/path/to/your/certificate.p12
APPLE_PASS_CERTIFICATE_PASSWORD=your_certificate_password
APPLE_PASS_WWDR_CERT_PATH=/path/to/wwdr.pem
PASS_TEAM_IDENTIFIER=YOUR_TEAM_ID
PASS_ORGANIZATION_NAME=Your Business Name
PASS_PASS_TYPE_IDENTIFIER=pass.com.stamply.loyalty
```

5. **Implement Real PassKit Generation**:
   - The service in `lib/passkit/service.ts` has TODO comments
   - Consider using a library like `passkit-generator`
   - Follow the TODO instructions in the file

## Database Schema

The app uses the following tables:

- `merchants` - Business information
- `locations` - Store locations (for multi-location support)
- `loyalty_programs` - Loyalty program configuration
- `customers` - Customer information
- `loyalty_passes` - Individual customer loyalty cards
- `stamp_events` - History of stamp additions

See `supabase/schema.sql` for the complete schema with RLS policies.

## API Endpoints

### POST `/api/customers/create`

Create a new customer and generate their loyalty pass.

**Request**:
```json
{
  "publicId": "abc12345",
  "firstName": "John",
  "email": "john@example.com"
}
```

**Response**: Binary .pkpass file (or .txt in mock mode)

### POST `/api/pass/stamp`

Add a stamp to a customer's loyalty card.

**Request**:
```json
{
  "passSerial": "abc123xyz456"
}
```

**Response**:
```json
{
  "success": true,
  "loyaltyPass": { ... }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Contributing

This is an MVP project. Potential improvements:

- [ ] Multi-location support
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] SMS integration
- [ ] Google Wallet support
- [ ] Reward redemption tracking
- [ ] Customer portal
- [ ] Bulk import customers

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

