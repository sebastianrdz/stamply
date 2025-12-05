import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { StampPassRequest, StampPassResponse } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: StampPassRequest = await request.json();
    const { passSerial } = body;

    if (!passSerial) {
      return NextResponse.json(
        { success: false, error: 'Missing pass serial' },
        { status: 400 }
      );
    }

    // Find the loyalty pass with all related data
    const { data: loyaltyPass, error: passError } = await supabase
      .from('loyalty_passes')
      .select(`
        *,
        customer:customers(*),
        loyalty_program:loyalty_programs(*, merchant:merchants(*))
      `)
      .eq('pass_serial', passSerial as any)
      .single();

    if (passError || !loyaltyPass) {
      return NextResponse.json(
        { success: false, error: 'Loyalty pass not found' },
        { status: 404 }
      );
    }

    // Verify that the authenticated user owns this merchant
    const { data: merchant, error: merchantError } = await supabase
      .from('merchants')
      .select('*')
      .eq('id', (loyaltyPass as any).loyalty_program.merchant_id)
      .eq('owner_user_id', user.id as any)
      .single();

    if (merchantError || !merchant) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - not your merchant' },
        { status: 403 }
      );
    }

    // Check if already at max stamps
    if ((loyaltyPass as any).current_stamps >= (loyaltyPass as any).loyalty_program.stamps_required) {
      return NextResponse.json(
        { success: false, error: 'Card already complete' },
        { status: 400 }
      );
    }

    // Increment stamps
    const newStamps: number = (loyaltyPass as any).current_stamps + 1;
    const isUnlocked: boolean = newStamps >= (loyaltyPass as any).loyalty_program.stamps_required;

    // Update loyalty pass
    const { data: updatedPass, error: updateError } = await (supabase
      .from('loyalty_passes')
      .update as any)({
        current_stamps: newStamps,
        reward_unlocked: isUnlocked,
      })
      .eq('id', (loyaltyPass as any).id)
      .select(`
        *,
        customer:customers(*),
        loyalty_program:loyalty_programs(*)
      `)
      .single();

    if (updateError || !updatedPass) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update pass' },
        { status: 500 }
      );
    }

    // Create stamp event
    const { error: eventError } = await supabase
      .from('stamp_events')
      .insert({
        loyalty_pass_id: (loyaltyPass as any).id,
        location_id: null, // TODO: Add location support
        delta: 1,
      } as any);

    if (eventError) {
      console.error('Event creation error:', eventError);
      // Don't fail the request if event creation fails
    }

    // TODO: Regenerate the pass file and send push notification to update the pass
    // This would require implementing Apple Wallet push notifications

    const response: StampPassResponse = {
      success: true,
      loyaltyPass: updatedPass as any,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

