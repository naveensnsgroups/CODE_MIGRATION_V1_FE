export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
}

export interface AuthResponse {
  access_token: string;
  user: GithubUser;
}
