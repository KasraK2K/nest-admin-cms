export interface IUser {
  id: number;
  first_name: string;
  surname: string;
  bio: string;
  contact_number: string;
  email: string;
  password: string;
  role: number;
  last_token: string;
  is_active: boolean;
  is_verify: boolean;
  is_archive: boolean;
  is_block: boolean;
  last_login_at?: number;
  created_at: Date;
  updated_at: Date;
  archive_at?: Date;
}
