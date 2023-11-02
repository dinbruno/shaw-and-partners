import { Request, Response } from 'express';
import { storageService } from '../../src/services/StorageService'; 
import { fileService } from '../../src/services/FileService';
import { fileController } from './file.controller';

jest.mock('../../src/services/StorageService', () => ({
  storageService: {
    addData: jest.fn(),
  },
}));

jest.mock('../../src/services/FileService', () => ({
  fileService: {
    processFile: jest.fn(),
  },
}));

describe('FileController', () => {
  describe('uploadFile', () => {
    const createMockResponse = () => {
      const res = {} as Partial<Response>;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res as Response;
    };

    const mockData = [{ id: '1', name: 'Sample Data' }];

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should process the file and add the data to the storage', async () => {
      const req = {} as Request;
      const res = createMockResponse();

      (fileService.processFile as jest.Mock).mockResolvedValue(mockData);

      await fileController.uploadFile(req, res);

      expect(fileService.processFile).toHaveBeenCalledWith(req);
      expect(storageService.addData).toHaveBeenCalledWith(mockData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'The file was uploaded successfully.' });
    });
    });
  });