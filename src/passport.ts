import passport from 'passport';
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback
} from 'passport-jwt';
import { prisma } from '../generated/prisma-client';
import { Request, Response, NextFunction } from 'express';

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

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    (error: any, user: any) => {
      if (user) {
        req.user = user;
      }
      next();
    }
  )(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
