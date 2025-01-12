import { IUserRepo } from '../../domain/repositories/IUserRepo';
import { User } from '../../domain/entities/User';
import { insertEntry, updateEntry, getEntrys } from '../../services/db.service';

export class UserRepo implements IUserRepo {
  async getById(id: number): Promise<User | null> {
    try {
      const result = await getEntrys('user', [{ id }]);
      return result && result.length ? (result[0] as User) : null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const result = await getEntrys('user', [{ email }]);
      return result && result.length ? (result[0] as User) : null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async create(userData: User): Promise<User | null> {
    try {
      const result = await insertEntry('user', userData);
      return result && result.length ? (result[0] as User) : null;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async update(id: number, userData: Partial<User>): Promise<void> {
    try {
      await updateEntry('user', [{ id }], userData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const result = await getEntrys('users', []);
      return result as User[];
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }
}

export default UserRepo;
