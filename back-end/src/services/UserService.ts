import { DataRow, storageService } from './StorageService';

export class UserService {

  searchUsers(searchTerm: string): DataRow[] {
    return storageService.searchData(searchTerm);
  }
}

export const userService = new UserService();
