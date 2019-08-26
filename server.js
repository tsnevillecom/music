import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import jwt from 'jsonwebtoken';
import User from './models/user';
import withAuth from './middleware';
import { SECRET, HTTP_PORT } from './config';

// App setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));

//DB Connection
import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${process.env.DATABASE_URL}`);
  }
});

// app.get('/test', (req, res) => {
//   res.json({
//     name: 'Dandelion',
//     color: 'Yellow-ish'
//   });
// });

app.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

app.get('/api/secret', withAuth, (req, res) => {
  res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.post('/api/authenticate', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }
      });
    }
  });
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Server listening at port ${HTTP_PORT}.`);
});
