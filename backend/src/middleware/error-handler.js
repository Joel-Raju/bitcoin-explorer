export const errorHandler = () => {
  return (err, req, res, next) => {
    res.status(500).json({ Error: err.message });
  };
};
