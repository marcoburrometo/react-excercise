export interface User {
  email: string;
}

export interface UserState {
  accessToken?: string;
  user?: User;
  loading?: boolean;
  error?: string;
}
