import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose-middleware';
import { ObjectIdScalar } from '../middlewares/ObjectIdScalar';

import { EmployeeModel, AccountModel } from './Entities';
import { EmployeeResolver } from './newResolvers/employee';
// import { buildAuthContext } from './context';
/*
* How to pimp out our request object with a ton of middlewares
*
* */

// export interface Context {
//   employee: ReturnModelType<typeof EmployeeModel>;
// }

export const createApolloServer = async function () {
  const schema = await buildSchema({
    resolvers: [EmployeeResolver],
    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      AccountModel,
      EmployeeModel,
      req,
      res,
    }),
  });
};

// import { ApolloServer } from 'apollo-server-express';
// import { TypegooseMiddleware } from '../middlewares/typegoose-middleware';
// // import { buildAuthContext } from './context';
// /*
// * How to pimp out our request object with a ton of middlewares
// *
// * */
//
// import { typeDefs } from './typeDefs';
// import { resolvers } from './resolvers';
// import {
//   Account,
//   Field,
//   Job,
//   Ranch,
//   Employee,
//   JobLog,
// } from '../database/models';
//
// export const createApolloServer = async () => (
//   new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req, res }) => ({
//       // ...buildAuthContext(req),
//       db: {
//         Account,
//         Field,
//         Job,
//         Ranch,
//         Employee,
//         JobLog,
//       },
//       req,
//       res,
//     }),
//   })
// );
