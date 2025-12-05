import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generatePassSerial } from '@/lib/utils';
import { generateLoyaltyPass, getPassContentType, getPassFilename } from '@/lib/passkit/service';
import { CreateCustomerRequest } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body: CreateCustomerRequest = await request.json();
    const { publicId, firstName, email } = body;

    if (!publicId || !firstName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the loyalty program by public ID
    const { data: program, error: programError } = await supabase
      .from('loyalty_programs')
      .select('*, merchants(*)')
      .eq('public_id', publicId)
      .single();

    if (programError || !program) {
      return NextResponse.json(
        { success: false, error: 'Loyalty program not found' },
        { status: 404 }
      );
    }

    // Create customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        loyalty_program_id: program.id,
        first_name: firstName,
        email: email || null,
      })
      .select()
      .single();

    if (customerError || !customer) {
      console.error('Customer creation error:', customerError);
      return NextResponse.json(
        { success: false, error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    // Generate unique pass serial
    const passSerial = generatePassSerial();

    // Create loyalty pass
    const { data: loyaltyPass, error: passError } = await supabase
      .from('loyalty_passes')
      .insert({
        customer_id: customer.id,
        loyalty_program_id: program.id,
        pass_serial: passSerial,
        current_stamps: 0,
        reward_unlocked: false,
      })
      .select()
      .single();

    if (passError || !loyaltyPass) {
      console.error('Loyalty pass creation error:', passError);
      return NextResponse.json(
        { success: false, error: 'Failed to create loyalty pass' },
        { status: 500 }
      );
    }

    // Generate the pass file
    try {
      const passBuffer = await generateLoyaltyPass({
        customer,
        loyaltyPass,
        merchant: program.merchants,
        loyaltyProgram: program,
      });

      // Return the pass file
      return new NextResponse(passBuffer, {
        status: 200,
        headers: {
          'Content-Type': getPassContentType(),
          'Content-Disposition': `attachment; filename="${getPassFilename(passSerial)}"`,
        },
      });
    } catch (passGenError) {
      console.error('Pass generation error:', passGenError);
      return NextResponse.json(
        { success: false, error: 'Failed to generate pass file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

