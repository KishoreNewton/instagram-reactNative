import { Request } from 'express';

export const isAuthenticated = (request: Request) => {
  if (!request.user) {
    throw new Error('You need to login to perform this action');
  }
  return;
};
