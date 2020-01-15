import { HTTP_PORT } from './config';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
require('./db/mongoose');
const authenticate = require('./middleware/auth');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

//Routes
const userRoutes = require('./router/user');
const authRoutes = require('./router/auth');
app.use(userRoutes);
app.use(authRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server listening at port ${HTTP_PORT}.`);
});
