import { StorageService } from "./StorageService";

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    storageService = new StorageService();
  });

  describe('addData', () => {
    it('should add data to the storage', () => {
      const initialData = [{ name: 'John', age: '30' }];
      storageService.addData(initialData);

      const result = storageService.searchData('John');
      expect(result).toEqual([{ name: 'john', age: '30' }]);
    });
  });

  describe('searchData', () => {
    beforeEach(() => {
      const data = [
        { name: 'John', age: '30' },
        { name: 'Jane', age: '25' },
        { name: 'Doe', age: '40' },
      ];
      storageService.addData(data);
    });

    it('should return matching rows', () => {
      const result = storageService.searchData('john');
      expect(result).toEqual([{ name: 'john', age: '30' }]);
    });

    it('should return an empty array if no matches are found', () => {
      const result = storageService.searchData('xyz');
      expect(result).toEqual([]);
    });
  });

  describe('normalizeDataRow', () => {
    it('should normalize data rows', () => {
      const dataRow = { Name: 'John', Age: '30' };
      const result = storageService.normalizeDataRow(dataRow);
      expect(result).toEqual({ name: 'john', age: '30' });
    });
  });
});
