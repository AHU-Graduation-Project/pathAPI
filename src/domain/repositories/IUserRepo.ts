import { User } from '../entities/User';

export interface IUserRepo {
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(userData: User): Promise<User | null>;
  update(id: number, userData: Partial<User>): Promise<void>;
  getAll(): Promise<User[]>;
}
