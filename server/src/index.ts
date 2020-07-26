import 'reflect-metadata';

import { log } from 'util';
import { app } from './server';
import { createApolloServer } from './graphQl';
import * as db from './database';
import { initMiddlewares } from './middlewares';

db.connectDb(`${process.env.MONGODB_URI}`);

initMiddlewares(app);

const mount = async () => {
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });
  app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
};

mount().then((r) => console.log('yee'));
// import { app } from './server';
// import { createApolloServer } from './graphQl';
// import * as db from './database';
// import { initMiddlewares } from './middlewares';
//
// db.connectDb(`${process.env.MONGODB_URI}`);
//
// initMiddlewares(app);
//
// const apolloServer = createApolloServer();
//
// apolloServer.applyMiddleware({ app });
// app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
