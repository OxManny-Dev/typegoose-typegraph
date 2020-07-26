import passport from 'passport';
import { Types } from 'mongoose';
import { localStrategy } from './localStrategy';
import { Employee } from '../../database/models';
import { IEmployeeDocument } from '../../lib/types';

export const passportInit = (passportArg: passport.Authenticator) => {
  passportArg.serializeUser<IEmployeeDocument, Types.ObjectId>(((user, done) => {
    done(null, user._id);
  }));

  passportArg.deserializeUser<IEmployeeDocument, Types.ObjectId>(async (id, done) => {
    try {
      const user = await Employee.findById(id);
      if (user) return done(null, user);
    } catch (e) {
      return done(e);
    }
  });

  passportArg.use(localStrategy);
};
