export const httpCache = ({ maxAge }) => {
  return (req, res, next) => {
    if (req.method === 'GET') {
      res.set({ 'Cache-Control': `max-age=${maxAge}, must-revalidate` });
    }

    next();
  };
};
