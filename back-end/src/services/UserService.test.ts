import { UserService } from "./UserService";
import { storageService } from "./StorageService";
import { DataRow } from "./StorageService";

jest.mock("./StorageService", () => ({
  storageService: {
    searchData: jest.fn(),
  },
}));

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("should search users and return the result", () => {
    const searchTerm = "John";
    const expectedResults: DataRow[] = [
      { id: "1", name: "John Doe", age: "30" },
      { id: "2", name: "Johnny Depp", age: "58" },
    ];

    (storageService.searchData as jest.Mock).mockReturnValue(expectedResults);

    const results = userService.searchUsers(searchTerm);

    expect(results).toEqual(expectedResults);
    expect(storageService.searchData).toHaveBeenCalledWith(searchTerm);
  });

  it("should return an empty array if no users are found", () => {
    const searchTerm = "NonExistingUser";
    const expectedResults: DataRow[] = [];

    (storageService.searchData as jest.Mock).mockReturnValue(expectedResults);

    const results = userService.searchUsers(searchTerm);

    expect(results).toEqual(expectedResults);
    expect(storageService.searchData).toHaveBeenCalledWith(searchTerm);
  });
});
