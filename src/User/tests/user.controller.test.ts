import UserController from "../controllers/user.controller";
import * as UserRepository from "../repositories/userRepository";
import {
  generateUsersData,
  generateUserData,
  generateUserPayload,
} from "./utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe("UserController", () => {
  describe("getUsers", () => {
    test("Should return empty array", async () => {
      // Mock function of repository to not call DB
      const spy = jest.spyOn(UserRepository, "getUsers").mockResolvedValue([]);
      const controller = new UserController();
      // Test the getUsers from controller
      const users = await controller.getUsers();
      // List is empty as set on the mock function
      expect(users).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test("Should return user list", async () => {
      // Generate a list of
      const usersList = generateUsersData(2);
      const spy = jest
        .spyOn(UserRepository, "getUsers")
        .mockResolvedValue(usersList);
      const controller = new UserController();
      const users = await controller.getUsers();
      expect(users).toEqual(usersList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe("addUser", () => {
    test("Should add user to the database", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const spy = jest
        .spyOn(UserRepository, "createUser")
        .mockResolvedValueOnce(userData);
      const controller = new UserController();
      const user = await controller.createUser(payload);
      expect(user).toMatchObject(payload);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe("getUser", () => {
    test("Should return use from the database", async () => {
      const id = 1;
      const userData = generateUserData({ id });
      const spy = jest
        .spyOn(UserRepository, "getUser")
        .mockResolvedValueOnce(userData);
      const controller = new UserController();
      const user = await controller.getUser(id.toString());
      expect(user).toEqual(userData);
      expect(user?.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test("Should return null if user not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(UserRepository, "getUser")
        .mockResolvedValueOnce(null);
      const controller = new UserController();
      const user = await controller.getUser(id.toString());
      expect(user).toBeNull();
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
