import { Application } from 'express';
import cookieParser from 'cookie-parser';

export const initMiddlewares = (app: Application) => {
  app.use(cookieParser(process.env.COOKIE_SECRET));
};
