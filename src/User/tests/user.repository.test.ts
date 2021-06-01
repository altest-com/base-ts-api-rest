import * as UserRepository from "../repositories/userRepository";
import { getRepository } from "typeorm";
import { mocked } from "ts-jest/utils";
import {
  generateUserData,
  generateUserPayload,
  generateUsersData,
} from "./utils/generate";

jest.mock("typeorm");

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
  mockedGetRepo.find.mockClear();
  mockedGetRepo.save.mockClear();
  mockedGetRepo.findOne.mockClear();
});

describe("UserRepository", () => {
  describe("getUsers", () => {
    test("Should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([]);
      const users = await UserRepository.getUsers();
      expect(users).toEqual([]);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });

    test("Should return user list", async () => {
      const usersData = generateUsersData(2);
      mockedGetRepo.find.mockResolvedValue(usersData);
      const users = await UserRepository.getUsers();
      expect(users).toEqual(usersData);
      expect(mockedGetRepo.find).toHaveBeenCalledWith();
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
    });
  });
  describe("addUser", () => {
    test("Should add user to the database", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      mockedGetRepo.save.mockResolvedValue(userData);
      const user = await UserRepository.createUser(payload);
      expect(user).toMatchObject(payload);
      expect(user).toEqual(userData);
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload);
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1);
    });
  });
  describe("getUser", () => {
      test("Should return user from the database", async () => {
        const id = 1;
        const userData = generateUserData({id});
        mockedGetRepo.findOne.mockResolvedValue(userData);
        const user = await UserRepository.getUser(id);
        expect(user).toEqual(userData);
        expect(user?.id).toBe(id);
        expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id});
        expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1);
      });
  });
});
