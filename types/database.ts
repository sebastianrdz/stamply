// Database types for Stamply

export interface Merchant {
  id: string;
  owner_user_id: string;
  business_name: string;
  logo_url: string | null;
  created_at: string;
}

export interface Location {
  id: string;
  merchant_id: string;
  name: string;
  created_at: string;
}

export interface LoyaltyProgram {
  id: string;
  merchant_id: string;
  reward_name: string;
  stamps_required: number;
  stamp_unit_label: string;
  public_id: string;
  created_at: string;
}

export interface Customer {
  id: string;
  loyalty_program_id: string;
  first_name: string;
  email: string | null;
  created_at: string;
}

export interface LoyaltyPass {
  id: string;
  customer_id: string;
  loyalty_program_id: string;
  pass_serial: string;
  current_stamps: number;
  reward_unlocked: boolean;
  created_at: string;
  updated_at: string;
}

export interface StampEvent {
  id: string;
  loyalty_pass_id: string;
  location_id: string | null;
  delta: number;
  created_at: string;
}

// Extended types with relations
export interface LoyaltyPassWithDetails extends LoyaltyPass {
  customer: Customer;
  loyalty_program: LoyaltyProgram;
}

export interface MerchantWithProgram extends Merchant {
  loyalty_programs: LoyaltyProgram[];
  locations: Location[];
}

// API request/response types
export interface CreateCustomerRequest {
  publicId: string;
  firstName: string;
  email?: string;
}

export interface CreateCustomerResponse {
  success: boolean;
  passSerial?: string;
  error?: string;
}

export interface StampPassRequest {
  passSerial: string;
}

export interface StampPassResponse {
  success: boolean;
  loyaltyPass?: LoyaltyPassWithDetails;
  error?: string;
}

// Database schema for Supabase
export interface Database {
  public: {
    Tables: {
      merchants: {
        Row: Merchant;
        Insert: Omit<Merchant, 'id' | 'created_at'>;
        Update: Partial<Omit<Merchant, 'id' | 'created_at'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at'>>;
      };
      loyalty_programs: {
        Row: LoyaltyProgram;
        Insert: Omit<LoyaltyProgram, 'id' | 'created_at'>;
        Update: Partial<Omit<LoyaltyProgram, 'id' | 'created_at'>>;
      };
      customers: {
        Row: Customer;
        Insert: Omit<Customer, 'id' | 'created_at'>;
        Update: Partial<Omit<Customer, 'id' | 'created_at'>>;
      };
      loyalty_passes: {
        Row: LoyaltyPass;
        Insert: Omit<LoyaltyPass, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LoyaltyPass, 'id' | 'created_at' | 'updated_at'>>;
      };
      stamp_events: {
        Row: StampEvent;
        Insert: Omit<StampEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<StampEvent, 'id' | 'created_at'>>;
      };
    };
  };
}

