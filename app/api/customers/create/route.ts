import { NextRequest, NextResponse } from 'next/server';
import { createPublicServerClient } from '@/lib/supabase/public-server';
import { generatePassSerial } from '@/lib/utils';
import { generateLoyaltyPass, getPassContentType, getPassFilename } from '@/lib/passkit/service';
import { CreateCustomerRequest, LoyaltyProgram, Merchant, Customer, LoyaltyPass } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    console.log('Customer creation API called');
    const supabase = createPublicServerClient();
    console.log('Supabase client created');

    const body: CreateCustomerRequest = await request.json();
    const { publicId, firstName, email } = body;
    console.log('Request body:', { publicId, firstName, email: email ? '***' : undefined });

    if (!publicId || !firstName) {
      console.error('Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the loyalty program by public ID
    console.log('Looking up loyalty program with publicId:', publicId);
    const { data: program, error: programError } = await supabase
      .from('loyalty_programs')
      .select('*, merchants(*)')
      .eq('public_id', publicId as any)
      .single();

    if (programError || !program) {
      console.error('Program lookup error:', programError);
      return NextResponse.json(
        { success: false, error: programError?.message || 'Loyalty program not found' },
        { status: 404 }
      );
    }
    console.log('Program found:', (program as any).id);

    // Create customer
    console.log('Creating customer...');
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        loyalty_program_id: (program as any).id,
        first_name: firstName,
        email: email || null,
      } as any)
      .select()
      .single();

    if (customerError || !customer) {
      console.error('Customer creation error:', customerError);
      return NextResponse.json(
        { success: false, error: customerError?.message || 'Failed to create customer' },
        { status: 500 }
      );
    }
    console.log('Customer created:', (customer as any).id);

    // Generate unique pass serial
    const passSerial = generatePassSerial();
    console.log('Generated pass serial:', passSerial);

    // Create loyalty pass
    console.log('Creating loyalty pass...');
    const { data: loyaltyPass, error: passError } = await supabase
      .from('loyalty_passes')
      .insert({
        customer_id: (customer as any).id,
        loyalty_program_id: (program as any).id,
        pass_serial: passSerial,
        current_stamps: 0,
        reward_unlocked: false,
      } as any)
      .select()
      .single();

    if (passError || !loyaltyPass) {
      console.error('Loyalty pass creation error:', passError);
      return NextResponse.json(
        { success: false, error: passError?.message || 'Failed to create loyalty pass' },
        { status: 500 }
      );
    }
    console.log('Loyalty pass created:', (loyaltyPass as any).id);

    // Generate the pass file
    try {
      console.log('Generating pass file...');
      const passBuffer = await generateLoyaltyPass({
        customer: customer as any as Customer,
        loyaltyPass: loyaltyPass as any as LoyaltyPass,
        merchant: (program as any).merchants as Merchant,
        loyaltyProgram: program as any as LoyaltyProgram,
      });

      console.log('Pass file generated successfully');
      // Return the pass file
      return new NextResponse(passBuffer as any, {
        status: 200,
        headers: {
          'Content-Type': getPassContentType(),
          'Content-Disposition': `attachment; filename="${getPassFilename(passSerial)}"`,
        },
      });
    } catch (passGenError) {
      console.error('Pass generation error:', passGenError);
      return NextResponse.json(
        { success: false, error: `Failed to generate pass file: ${(passGenError as any).message}` },
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

