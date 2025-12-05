-- Stamply Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Merchants table
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Loyalty programs table
CREATE TABLE loyalty_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  reward_name TEXT NOT NULL,
  stamps_required INTEGER NOT NULL CHECK (stamps_required > 0),
  stamp_unit_label TEXT NOT NULL,
  public_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loyalty_program_id UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Loyalty passes table
CREATE TABLE loyalty_passes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  loyalty_program_id UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  pass_serial TEXT NOT NULL UNIQUE,
  current_stamps INTEGER NOT NULL DEFAULT 0 CHECK (current_stamps >= 0),
  reward_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Stamp events table (for history)
CREATE TABLE stamp_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loyalty_pass_id UUID NOT NULL REFERENCES loyalty_passes(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  delta INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_merchants_owner ON merchants(owner_user_id);
CREATE INDEX idx_locations_merchant ON locations(merchant_id);
CREATE INDEX idx_loyalty_programs_merchant ON loyalty_programs(merchant_id);
CREATE INDEX idx_loyalty_programs_public_id ON loyalty_programs(public_id);
CREATE INDEX idx_customers_program ON customers(loyalty_program_id);
CREATE INDEX idx_loyalty_passes_customer ON loyalty_passes(customer_id);
CREATE INDEX idx_loyalty_passes_program ON loyalty_passes(loyalty_program_id);
CREATE INDEX idx_loyalty_passes_serial ON loyalty_passes(pass_serial);
CREATE INDEX idx_stamp_events_pass ON stamp_events(loyalty_pass_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on loyalty_passes
CREATE TRIGGER update_loyalty_passes_updated_at
  BEFORE UPDATE ON loyalty_passes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stamp_events ENABLE ROW LEVEL SECURITY;

-- Merchants: Users can only see/edit their own merchant data
CREATE POLICY "Users can view their own merchant data"
  ON merchants FOR SELECT
  USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can insert their own merchant data"
  ON merchants FOR INSERT
  WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own merchant data"
  ON merchants FOR UPDATE
  USING (auth.uid() = owner_user_id);

-- Locations: Merchants can manage their own locations
CREATE POLICY "Merchants can view their own locations"
  ON locations FOR SELECT
  USING (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

CREATE POLICY "Merchants can insert their own locations"
  ON locations FOR INSERT
  WITH CHECK (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

CREATE POLICY "Merchants can update their own locations"
  ON locations FOR UPDATE
  USING (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

-- Loyalty programs: Merchants can manage their own programs, public can read by public_id
CREATE POLICY "Merchants can view their own loyalty programs"
  ON loyalty_programs FOR SELECT
  USING (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

CREATE POLICY "Anyone can view loyalty programs by public_id"
  ON loyalty_programs FOR SELECT
  USING (true);

CREATE POLICY "Merchants can insert their own loyalty programs"
  ON loyalty_programs FOR INSERT
  WITH CHECK (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

CREATE POLICY "Merchants can update their own loyalty programs"
  ON loyalty_programs FOR UPDATE
  USING (merchant_id IN (SELECT id FROM merchants WHERE owner_user_id = auth.uid()));

-- Customers: Public can insert, merchants can view their program's customers
CREATE POLICY "Anyone can create customers"
  ON customers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchants can view their program customers"
  ON customers FOR SELECT
  USING (loyalty_program_id IN (
    SELECT id FROM loyalty_programs WHERE merchant_id IN (
      SELECT id FROM merchants WHERE owner_user_id = auth.uid()
    )
  ));

-- Loyalty passes: Similar to customers
CREATE POLICY "Anyone can create loyalty passes"
  ON loyalty_passes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchants can view their program passes"
  ON loyalty_passes FOR SELECT
  USING (loyalty_program_id IN (
    SELECT id FROM loyalty_programs WHERE merchant_id IN (
      SELECT id FROM merchants WHERE owner_user_id = auth.uid()
    )
  ));

CREATE POLICY "Merchants can update their program passes"
  ON loyalty_passes FOR UPDATE
  USING (loyalty_program_id IN (
    SELECT id FROM loyalty_programs WHERE merchant_id IN (
      SELECT id FROM merchants WHERE owner_user_id = auth.uid()
    )
  ));

-- Stamp events: Merchants can view and create for their programs
CREATE POLICY "Merchants can view their program stamp events"
  ON stamp_events FOR SELECT
  USING (loyalty_pass_id IN (
    SELECT id FROM loyalty_passes WHERE loyalty_program_id IN (
      SELECT id FROM loyalty_programs WHERE merchant_id IN (
        SELECT id FROM merchants WHERE owner_user_id = auth.uid()
      )
    )
  ));

CREATE POLICY "Merchants can create stamp events for their programs"
  ON stamp_events FOR INSERT
  WITH CHECK (loyalty_pass_id IN (
    SELECT id FROM loyalty_passes WHERE loyalty_program_id IN (
      SELECT id FROM loyalty_programs WHERE merchant_id IN (
        SELECT id FROM merchants WHERE owner_user_id = auth.uid()
      )
    )
  ));

