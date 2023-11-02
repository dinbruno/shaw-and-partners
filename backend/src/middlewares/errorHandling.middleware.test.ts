import { Request, Response, NextFunction } from 'express';
import errorHandlingMiddleware from './errorHandling.middleware';


const createMockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('errorHandlingMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Response;
  let mockNext: NextFunction = jest.fn();
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = createMockResponse();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should handle generic errors', () => {
    const testError = new Error('Test Error');

    errorHandlingMiddleware(testError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test Error',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error 💥', testError);
  });

  it('should handle errors without a message', () => {
    const testError = new Error();

    errorHandlingMiddleware(testError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Internal Server Error',
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error 💥', testError);
  });

});
