-- Fix RLS policies for customers and loyalty_passes tables
-- Run this in your Supabase SQL Editor

-- Drop existing policies for customers
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
DROP POLICY IF EXISTS "Merchants can view their program customers" ON customers;

-- Drop existing policies for loyalty_passes
DROP POLICY IF EXISTS "Anyone can create loyalty passes" ON loyalty_passes;
DROP POLICY IF EXISTS "Merchants can view their program passes" ON loyalty_passes;
DROP POLICY IF EXISTS "Merchants can update their program passes" ON loyalty_passes;

-- Recreate policies for customers with explicit permissions
CREATE POLICY "Anyone can create customers"
  ON customers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Merchants can view their program customers"
  ON customers FOR SELECT
  TO public
  USING (
    loyalty_program_id IN (
      SELECT id FROM loyalty_programs WHERE merchant_id IN (
        SELECT id FROM merchants WHERE owner_user_id = auth.uid()
      )
    )
  );

-- Recreate policies for loyalty_passes with explicit permissions
CREATE POLICY "Anyone can create loyalty passes"
  ON loyalty_passes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Merchants can view their program passes"
  ON loyalty_passes FOR SELECT
  TO public
  USING (
    loyalty_program_id IN (
      SELECT id FROM loyalty_programs WHERE merchant_id IN (
        SELECT id FROM merchants WHERE owner_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Merchants can update their program passes"
  ON loyalty_passes FOR UPDATE
  TO public
  USING (
    loyalty_program_id IN (
      SELECT id FROM loyalty_programs WHERE merchant_id IN (
        SELECT id FROM merchants WHERE owner_user_id = auth.uid()
      )
    )
  );

-- Also fix stamp_events policies
DROP POLICY IF EXISTS "Merchants can view their program stamp events" ON stamp_events;
DROP POLICY IF EXISTS "Merchants can create stamp events" ON stamp_events;

CREATE POLICY "Merchants can view their program stamp events"
  ON stamp_events FOR SELECT
  TO public
  USING (
    loyalty_pass_id IN (
      SELECT id FROM loyalty_passes WHERE loyalty_program_id IN (
        SELECT id FROM loyalty_programs WHERE merchant_id IN (
          SELECT id FROM merchants WHERE owner_user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Merchants can create stamp events"
  ON stamp_events FOR INSERT
  TO public
  WITH CHECK (
    loyalty_pass_id IN (
      SELECT id FROM loyalty_passes WHERE loyalty_program_id IN (
        SELECT id FROM loyalty_programs WHERE merchant_id IN (
          SELECT id FROM merchants WHERE owner_user_id = auth.uid()
        )
      )
    )
  );

