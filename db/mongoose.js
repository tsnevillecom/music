const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('failed connected to database');
  });
