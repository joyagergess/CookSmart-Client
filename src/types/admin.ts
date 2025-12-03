export interface AdminUser {
  id: number;
  user_type_id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AdminHousehold {
  id: number;
  name: string;
  invite_code: string;
  created_at: string;
}

export interface AdminMember {
  id: number;
  household_id: number;
  user_id: number;
  joined_at: string;
}
