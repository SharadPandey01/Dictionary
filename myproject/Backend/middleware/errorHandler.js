const errorHandler = (err, req, res, next) => {
  console.error("Global Error Handler caught:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({ error: message });
};

export default errorHandler;
