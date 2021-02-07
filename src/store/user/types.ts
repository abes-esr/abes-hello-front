export interface User {
  userName: string;
  accessToken: string;

}

export interface UserState {
  user?: User;
  error: boolean;
  errorMessage: string;
  isLogged: boolean;
}