
export interface AdminNotification {
  id: string;
  type: 'new_verification' | 'new_request' | 'new_offer' | 'status_update';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  metadata?: {
    verification_id?: string;
    request_id?: string;
    offer_id?: string;
  };
}
