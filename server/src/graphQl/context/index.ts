import { Request } from 'express';

export const buildAuthContext = (req: Request) => ({
  logout: () => req.logOut(),
  isAuthenticated: () => req.isAuthenticated(),
  getUser: () => req.user,
});
