const express = require('express');
const {PrismaClient} = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path:'../.env' });
const session = require('express-session');
const passport = require('passport');
require('./services/passportConfig');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

module.exports = app;