export interface IUser {
  id?: number;
  first_name: string;
  surname: string;
  contact_number: string;
  email: string;
  password: string;
  role: number;
  last_token: string;
  is_active: number;
  is_verify: number;
  is_archive: number;
  is_block: number;
  last_login_at?: number;
  created_at: Date;
  updated_at: Date;
  archive_at?: Date;
}
