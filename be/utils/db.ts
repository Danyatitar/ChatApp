import mongoose from 'mongoose';
import config from 'config';
import * as process from 'process';

const srv = config.get<string>('database.srv');
const linkFE = config.get<string>('server.linkFE');
mongoose.Promise = global.Promise;

async function getConnection() {
  const uri = srv;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 3000
  };

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  mongoose.connection.on('connected', () => console.log('Mongoose connection is CONNECTED'));
  mongoose.connection.on('error', err => console.error('Mongoose connection error:', err.message));
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is DISCONNECTED'));

  await mongoose.connect(uri, options);
}

export {getConnection, linkFE};
