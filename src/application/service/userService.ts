import { IUserRepo } from '../../domain/repositories/IUserRepo';
import { User } from '../../domain/entities/User';
import { PostUserDto } from '../../domain/DTOs/User/PostUserDto';
import { GetUserDto } from '../../domain/DTOs/User/GetUserDto';
import { hash, compare } from 'bcryptjs';
import { CustomError } from '../exception/CustomError';
import { UserMapper } from '../mappingProfile/userMapper';

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async signup(user: PostUserDto): Promise<GetUserDto> {
    if (await this.userRepo.getByEmail(user.email)) {
      throw new CustomError('Email already exists', 400);
    }

    const newUser: User = {
      ...UserMapper.PostToGet(user),
      password: await hash(user.password, 10),
      profileImage: user.profileImage
        ? { data: user.profileImage.toString('base64') }
        : undefined,
    };

    const createdUser = await this.userRepo.create(newUser);
    if (!createdUser) {
      throw new CustomError('User creation failed', 500);
    }
    return UserMapper.UserToGet(createdUser);
  }

  async confirmEmail(userId: number): Promise<void> {
    const userUpdateData: Partial<User> = {
      isEmailConfirmed: true,
    };
    await this.userRepo.update(userId, userUpdateData);
  }

  async login(email: string, password: string): Promise<GetUserDto> {
    const user = await this.userRepo.getByEmail(email);
    if (!user) {
      throw new CustomError('Email does not exist.', 400);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new CustomError('Invalid credentials', 401);
    }

    return UserMapper.UserToGet(user);
  }
}
