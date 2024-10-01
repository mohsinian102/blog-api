const passport = require('passport');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const localStrategy = require('passport-local').Strategy;

const prisma = new PrismaClient();

passport.use(new localStrategy(
    async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique( { where: {email} } );
            if(!user) {
                return done(null, false, { message: 'Invalid credentials!' });
            }
            const isMatch = await bcrypt.compare(bcrypt.hash(password, 10), user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid credentials.' });
            }
        return done(null, user);
        } catch (err) {
            return done(err);

        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });