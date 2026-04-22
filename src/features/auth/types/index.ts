export interface User {
  id: string | number;
  login?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  default_mode?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
  token_type?: string;
}
