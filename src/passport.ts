import passport from 'passport';
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback
} from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const verifyUser = async (
  jwt_payload: any,
  done: VerifiedCallback
): Promise<void> => {
  try {
    const user: any = await prisma.user({ id: jwt_payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new Strategy(jwtOptions, verifyUser));
