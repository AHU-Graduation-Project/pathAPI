import { GetUserDto } from '../../domain/DTOs/User/GetUserDto';
import { PostUserDto } from '../../domain/DTOs/User/PostUserDto';
import { User } from '../../domain/entities/User';

export class UserMapper {
  static PostToGet(user: PostUserDto): GetUserDto {
    return {
      ...user,
      id: 0,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailConfirmed: false,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static UserToGet(user: User): GetUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position,
      level: user.level,
      country: user.country,
      isEmailConfirmed: user.isEmailConfirmed,
      profileImage: user.profileImage ? user.profileImage.data : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static UserToPost(user: User): PostUserDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
}
