import PassportLocalStrategy from "passport-local";
import { UsersRepository } from "../user/repository";
import passport from "passport";
import { User } from "../user/user";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: User, done) => {
  done(null, user);
});

passport.use(
  new PassportLocalStrategy.Strategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const userDTOorFailure = await UsersRepository.findUserByEmail(email);

      if (!userDTOorFailure.ok) return done(null, false);

      const user = User.fromDTO(userDTOorFailure.value);

      const isCorrectPassword = await user.verifyPassword(password);
      if (!isCorrectPassword) return done(null, false);

      return done(null, user);
    }
  )
);
