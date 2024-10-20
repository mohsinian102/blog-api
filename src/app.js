const express = require('express');
const {PrismaClient} = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path:'../.env' });
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./services/passportConfig');

const prisma = new PrismaClient();
const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax'
  }

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);


module.exports = app;