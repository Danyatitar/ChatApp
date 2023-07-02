import app from './app';
import config from 'config';

import {getConnection} from '@utils/db';

const port = config.get<number>('server.port');

getConnection();

const server = app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});

export default server;
