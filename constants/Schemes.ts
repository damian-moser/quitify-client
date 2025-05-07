export interface User {
  id: string;
  displayName: string;
  username: string;
  changePassword: boolean;
  createdAt: number;
  roles: string[];
  public: boolean;
}
