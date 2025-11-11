import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../src/app';

// Vercel invokes this handler for /api/*
// Our Express app expects /api/*, but Vercel strips /api when calling the function.
// Put the /api prefix back before handing off to Express.
export default (req: VercelRequest, res: VercelResponse) => {
  if (req.url && !req.url.startsWith('/api/')) {
    req.url = '/api' + req.url;
  }
  return (app as any)(req, res);
};
