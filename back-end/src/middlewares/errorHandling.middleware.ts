import { Request, Response, NextFunction } from 'express';

const errorHandlingMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {

  console.error('Error 💥', err);

  const errorMessage = err.message || 'Internal Server Error';

  return res.status(500).json({
    status: 'error',
    message: errorMessage,
  });
};

export default errorHandlingMiddleware;
