import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { PutUserDTO } from '../../domain/DTOs/user/PutUserDTO';
import { IUserRepo } from '../../domain/IRepo/IUserRepo';
import Logger from '../../infrastructure/logger/consoleLogger';
import { CustomError } from '../exception/customError';
import { toGet } from '../utils/userMapping';
import { hash, compare } from 'bcrypt';

export class UserService {
  constructor(private _repo: IUserRepo) {}

  async register(postUser: PostUserDTO) {
    if (!this.passwordValidator(postUser.password)) {
      throw new CustomError('Password is not strong enough', 400);
    }

    if (await this._repo.getByEmail(postUser.email)) {
      throw new CustomError('Email already exists, try to login', 400);
    }
    postUser.password = await hash(postUser.password, 10);

    return toGet(await this._repo.create(postUser));
  }
  async login(email: string, password: string) {
    const user = await this._repo.getByEmail(email);
    if (!user) {
      throw new CustomError('Invalid credentials', 401);
    }
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new CustomError('Invalid credentials', 401);
    }
 if (!user.is_email_confirmed) {
  const TEN_MINUTES_IN_MS = 1000 * 60 * 60 * 3.1;
  const timeSinceCreation = new Date().getTime() - new Date(user.created_at).getTime();

  if (timeSinceCreation > TEN_MINUTES_IN_MS) {
    throw new CustomError('User not confirmed', 451);
  }
}
    return toGet(user);
  }
  async confirmEmail(id: number, isEditor: boolean) {
    const putUser: PutUserDTO = {
      is_email_confirmed: true,
      is_editor: isEditor,
    };
    return toGet(await this._repo.update(id, putUser));
  }
  async updatePassword(id: number, password: string, oldPassword?: string) {
    if (!this.passwordValidator(password)) {
      throw new CustomError('Password is not strong enough', 400);
    }
    if(oldPassword) {
      const user = await this._repo.getById(id);
      const isPasswordMatch = await compare(oldPassword, user.password);
      if (!isPasswordMatch) {
        throw new CustomError('Invalid credentials', 401);
      }
    }
    const putUser: PutUserDTO = {
      password: await hash(password, 10),
    };
    return toGet(await this._repo.update(id, putUser));
  }
  async getByEmail(email: string) {
    const user = await this._repo.getByEmail(email);
    if (!user) {
      throw new CustomError('User not found', 400);
    }
    return toGet(user);
  }
  async requestRecovery(email: string) {
    const user = await this._repo.getByEmail(email);
    if (!user) {
      throw new CustomError('User not found', 400);
    }
    if (!user.is_email_confirmed) {
      throw new CustomError(
        "You'r email is not confirmed, you cannot request password recovery.",
        400,
      );
    }
    return toGet(user);
  }
  passwordValidator(password: string) {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    );
    return true; // TODO: fix it later
  }
}
