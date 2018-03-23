export interface StoreState {
  isLoginPending: boolean;
  token?: string;
  error?: Error;
}