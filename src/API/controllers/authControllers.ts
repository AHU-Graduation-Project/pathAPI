import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '../../application/service/userService';
import UserRepo from '../../infrastructure/repos/userRepo';
import { config } from '../../config';
import { CustomError } from '../../application/exception/CustomError';
import { PostUserDto } from '../../domain/DTOs/User/PostUserDto';
import { GetUserDto } from '../../domain/DTOs/User/GetUserDto';

export class AuthControllers {
  static userRepo = new UserRepo();
  static userService = new UserService(this.userRepo);
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await AuthControllers.userRepo.getByEmail(email);
      if (!user) {
        res.status(400).json({ message: 'Email does not exist.' });
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '5h' });
      // delete user.password;
      // res.status(200).json({ user, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async signup(req: Request, res: Response): Promise<void> {
    const { PostUserDto } = req.body;
    let result;

    try {
      if (await AuthControllers.userRepo.getByEmail(PostUserDto.email)) {
        throw new CustomError('Email already exists', 400);
      }
      result = await AuthControllers.userService.signup(PostUserDto);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async passwordRecovery(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const user = await AuthControllers.userRepo.getByEmail(email);
      if (!user) {
        res.status(400).json({ message: 'Email does not exist' });
        return;
      }

      // Implement logic to send a password recovery link
      res.status(201).json({});
    } catch (error) {
      console.error('Error during password recovery:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async changePassword(req: Request, res: Response): Promise<void> {
    const { newPassword, oldPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Access Denied' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, config.jwtSecret);
      const user = await AuthControllers.userRepo.getById(decoded.userId);

      if (!user) {
        res.status(401).json({ message: 'Access Denied' });
        return;
      }

      if (oldPassword) {
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
          res.status(401).json({ message: 'Access Denied' });
          return;
        }
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await AuthControllers.userRepo.update(user.id, {
        password: user.password,
      });

      const updatedUser = await AuthControllers.userRepo.getById(user.id);
      const newToken = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: '5h' },
      );

      res.status(200).json({ profile: updatedUser, token: newToken });
    } catch (error) {
      console.error('Error during change password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async confirmEmail(req: Request, res: Response): Promise<void> {
    const authHeader = req.headers.authorization;
    // Implement confirm email logic using userService
    // ...existing code...
  }
}
