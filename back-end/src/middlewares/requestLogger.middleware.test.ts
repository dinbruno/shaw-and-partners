import { Request, Response, NextFunction } from 'express';
import requestLoggerMiddleware from './requestLogger.middleware';

const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.on = jest.fn((event, callback) => {
    if (event === 'finish') {
      callback();
    }
    return res as Response;
  });
  return res;
};

describe('requestLoggerMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      originalUrl: '/test',
      body: { key: 'value' },
      query: { q: 'query' },
      params: { id: '1' },
      file: {
        fieldname: 'file',
        originalname: 'testFile.txt',
        encoding: '7bit',
        mimetype: 'text/plain',
        size: 28,
        destination: '/path/to/destination',
        filename: 'testfile.txt',
        path: '/path/to/destination/testfile.txt',
        buffer: Buffer.from('This is a test file content'),
      } as Express.Multer.File,
    };
    mockResponse = createMockResponse();
    mockNext = jest.fn();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log the request and response details', () => {
    requestLoggerMiddleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('GET /test'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Body: {"key":"value"}'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Query: {"q":"query"}'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Params: {"id":"1"}'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('File: testfile.txt'));
    expect(mockNext).toHaveBeenCalled();
  });

  it('should log the request duration on response finish', () => {
    requestLoggerMiddleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('took'));
  });
});
