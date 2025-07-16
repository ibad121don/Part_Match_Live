
export interface CarPart {
  id: string;
  supplier_id: string;
  title: string;
  description?: string;
  make: string;
  model: string;
  year: number;
  part_type: string;
  condition: 'New' | 'Used' | 'Refurbished';
  price: number;
  currency: string;
  address: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  status: 'available' | 'sold' | 'hidden' | 'pending';
  created_at: string;
  updated_at?: string;
  // Monetization fields
  is_featured?: boolean;
  featured_until?: string;
  boosted_until?: string;
  // Seller profile information (joined from profiles table)
  profiles?: {
    first_name?: string;
    last_name?: string;
    is_verified?: boolean;
    rating?: number;
    total_ratings?: number;
    profile_photo_url?: string;
  };
}
