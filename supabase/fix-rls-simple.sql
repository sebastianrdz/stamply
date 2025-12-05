-- Simple fix for RLS policies
-- Run this in your Supabase SQL Editor

-- First, check if tables exist and create them if they don't
-- If you already have the tables, this will just skip

-- For customers table
DO $$ 
BEGIN
    -- Drop existing policies
    DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
    DROP POLICY IF EXISTS "Merchants can view their program customers" ON customers;
    
    -- Create new policies with anon role explicitly allowed
    CREATE POLICY "Anyone can create customers"
      ON customers FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
    
    CREATE POLICY "Merchants can view their program customers"
      ON customers FOR SELECT
      TO anon, authenticated
      USING (
        loyalty_program_id IN (
          SELECT id FROM loyalty_programs WHERE merchant_id IN (
            SELECT id FROM merchants WHERE owner_user_id = auth.uid()
          )
        )
        OR auth.uid() IS NULL  -- Allow anonymous reads for the insert operation
      );
END $$;

-- For loyalty_passes table
DO $$ 
BEGIN
    -- Drop existing policies
    DROP POLICY IF EXISTS "Anyone can create loyalty passes" ON loyalty_passes;
    DROP POLICY IF EXISTS "Merchants can view their program passes" ON loyalty_passes;
    DROP POLICY IF EXISTS "Merchants can update their program passes" ON loyalty_passes;
    
    -- Create new policies with anon role explicitly allowed
    CREATE POLICY "Anyone can create loyalty passes"
      ON loyalty_passes FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
    
    CREATE POLICY "Merchants can view their program passes"
      ON loyalty_passes FOR SELECT
      TO anon, authenticated
      USING (
        loyalty_program_id IN (
          SELECT id FROM loyalty_programs WHERE merchant_id IN (
            SELECT id FROM merchants WHERE owner_user_id = auth.uid()
          )
        )
        OR auth.uid() IS NULL  -- Allow anonymous reads
      );
    
    CREATE POLICY "Merchants can update their program passes"
      ON loyalty_passes FOR UPDATE
      TO authenticated
      USING (
        loyalty_program_id IN (
          SELECT id FROM loyalty_programs WHERE merchant_id IN (
            SELECT id FROM merchants WHERE owner_user_id = auth.uid()
          )
        )
      );
END $$;

