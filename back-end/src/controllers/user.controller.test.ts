import { Request, Response } from 'express';
import { userController } from '../../src/controllers/user.controller'; 
import { storageService } from '../../src/services/StorageService'; 

const createMockResponse = () => {
  const res = {} as Partial<Response>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('UserController', () => {
  describe('searchUsers', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return 400 if query parameter "q" is not a string', () => {
      const req = { query: {} } as Request;
      const res = createMockResponse();

      userController.searchUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Query parameter "q" must be a string.' });
    });

    it('should return 200 and the search results', () => {
      const searchTerm = 'john';
      const mockUsers = [{ id: '123a', name: 'John Doe' }];

      jest.spyOn(storageService, 'searchData').mockReturnValue(mockUsers);
      const req = { query: { q: searchTerm } } as unknown as Request;
      const res = createMockResponse();

      userController.searchUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: mockUsers });
    });
  });
});
