// import { AuthenticationError } from 'apollo-server-express';
// import { Request } from 'express';
// import { Model } from 'mongoose';
// import { IEmployeeDocument } from '../types/modelTypes';
//
// export const authorize = async (
//   Employee: Model<IEmployeeDocument>,
//   req: Request,
// ): Promise<IEmployeeDocument | null> => {
//   const token = req.get('X-CSRF-TOKEN');
//   let employee;
//   let account;
//   try {
//     employee = await Employee
//       .findOne({ _id: req.signedCookies.employee, token });
//   } catch (e) {
//     throw new AuthenticationError('You must be authenticated to do that');
//   }
//
//   if (!employee) {
//     throw new AuthenticationError('No employee found');
//   }
//
//   return employee || null;
// };
