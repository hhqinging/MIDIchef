//---------------------------------------
//error not found
//---------------------------------------
export const notFound = (req, res, next) => {
  //construct our error message where the user not found
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);

  //pass the error to errorHandler err, in case the error not found above
  next(error);
};

//---------------------------------------
//error handler
//---------------------------------------
export const errorHandler = (err, req, res, next) => {
  //to avoid the cass 200, but still has error, make it as 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  //listen the message
  res.json({
    message: err?.message,
    //check which line to code has the error,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// module.exports = { errorHandler, notFound };
