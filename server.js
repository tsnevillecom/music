import express from 'express';
require('./db/mongoose');
import bodyParser from 'body-parser';
import path from 'path';
import { HTTP_PORT } from './config';
const authenticate  = require('./middleware/auth');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

//Routes
const userRoutes = require('./router/user');
const apiRoutes = require('./router/api');
app.use(userRoutes);
app.use(apiRoutes);

app.get('/checkToken', authenticate, async (req,res)=> {
  console.log(res);
  res.sendStatus(200);
})

app.listen(HTTP_PORT, () => {
  console.log(`Server listening at port ${HTTP_PORT}.`);
});
