import {
  model,
  Model,
  Schema,
} from 'mongoose';
import bcrypt from 'bcryptjs';

import isEmail from 'validator/lib/isEmail';

import { Account } from './account';

import {
  IEmployeeDocument,
  IEmployeeModel,
} from '../../lib/types';

const EmployeeSchema: Schema<IEmployeeDocument> = new Schema<IEmployeeDocument>({
  email: {
    type: String,
    required: [true, 'You must provide an email address'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [
      { validator: isEmail, msg: 'You must provide a valid email address' },
    ],
  },
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    minLength: 6,
  },
  isAdmin: Boolean,
  role: {
    type: String,
    enum: ['MANAGER', 'INPUT_USER', 'FIELD_USER', 'SETUP_USER', 'WORKER'],
  },
  token: String,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crew: [{ type: Schema.Types.ObjectId, ref: 'Crew' }],
  fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
  ranches: [{ type: Schema.Types.ObjectId, ref: 'Ranch' }],
});

EmployeeSchema.pre<IEmployeeDocument>('save', async function (next) {
  // gets access to the user model that is currently being saved
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      // overwrite the plain text password with our hash
      user.password = await bcrypt.hash(user.password, salt);
      // Finally call save
      next();
    } catch (e) {
      // Call save with an error
      next(e);
    }
  }
  next();
});

/* Statics */

/* Methods */
EmployeeSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this;
  try {
    const isMatch: boolean = await bcrypt.compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    return Promise.reject(e);
  }
};

EmployeeSchema.methods.getEmployeeAccount = async function () {
  try {
    return await Account.findById(this.account);
  } catch (e) {
    throw new Error(e);
  }
};

export const Employee: Model<IEmployeeDocument> = model<IEmployeeDocument>('Employee', EmployeeSchema);
