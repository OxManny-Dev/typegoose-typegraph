import { connect } from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoDbStore = connectMongo(session);

export type TDbFn = {
  connectDb: (mongodbUri: string) => void;
  initSessionStore: () => connectMongo.MongoStore;
}

export const connectDb = (mongodbUri: string) => {
  connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => console.log('connected'))
    .catch(() => console.log('Connection failed'));
};

export const initSessionStore = () => new MongoDbStore({
  url: `${process.env.MONGODB_URI}`,
  autoReconnect: true,
});
