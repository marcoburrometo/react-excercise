export interface User {
  email: string;
}

export interface UserState {
  authToken?: string;
  user?: User;
  loading?: boolean;
  error?: string;
}
