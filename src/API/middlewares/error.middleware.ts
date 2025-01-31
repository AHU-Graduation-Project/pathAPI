import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../../application/exception/customError';
import Logger from '../../infrastructure/logger/consoleLogger';
import { ServerError } from '../../application/exception/serverError';

const errorMiddleware: ErrorRequestHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof CustomError) {
    Logger.Error(err, err.path);
    res.status(err.statusCode).json({
      status: 'error',
      success: false,
      message: err.message,
    });
    return;
  } else if (err instanceof ServerError) {
    Logger.Error(err, err.path);
  }

  Logger.Error(err, 'errorMiddleware');
  res.status(500).json({
    status: 'error',
    success: false,
    message: 'Something went wrong. Please try again later.',
  });
  return;
};

export default errorMiddleware;
