import mCache from 'memory-cache';

export const cacheMiddleware = ({ duration }) => {
  return (req, res, next) => {
    const key = '__cache__' + req.url;
    const cachedBody = mCache.get(key);

    if (req.method === 'GET') {
      if (cachedBody) {
        try {
          const parsedBody = JSON.parse(cachedBody);
          return res.send(parsedBody);
        } catch (err) {
          return res.send(cachedBody);
        }
      } else {
        res.sendResponse = res.send;
        res.send = (body) => {
          mCache.put(key, body, duration * 1000);
          res.sendResponse(body);
        };
      }
    }

    next();
  };
};
