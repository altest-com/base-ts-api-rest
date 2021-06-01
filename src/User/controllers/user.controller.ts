import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../entities";
import {
  getUser,
  getUsers,
  IUserPayload,
  createUser,
} from "../repositories/userRepository";

@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Array<User>> {
      return getUsers();
    }

    @Post("/")
    public async createUser(@Body() body: IUserPayload): Promise<User> {
        return createUser(body);
    }

    @Get("/:id")
    public async getUser(@Path() id: string): Promise<User | null> {
        return getUser(Number(id));
    }
}