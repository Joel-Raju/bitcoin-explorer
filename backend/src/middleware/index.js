import { Router } from 'express';
import { errorHandler } from './error-handler';
import { cacheMiddleware } from './cache-middleware';
import { httpCache } from './http-cache';

const CACHE_DURATION = 60;
const HTTP_CACHE_AGE = 60 * 5; // 5 min

export default ({ config, db }) => {
  const routes = Router();
  const errorMware = errorHandler();
  const cacheMware = cacheMiddleware({ duration: CACHE_DURATION });
  const httpCacheMware = httpCache({ maxAge: HTTP_CACHE_AGE });

  return [httpCacheMware, cacheMware, routes, errorMware];
};
