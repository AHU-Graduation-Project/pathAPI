import {
  db,
  insertEntry,
  updateEntry,
  getEntrys,
} from '../../services/db.service';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export class UserRepo {
  async getById(id: number) {
    const result = await getEntrys(user, [eq(user.id, id)]);
    return (result && result[0]) || null;
  }

  async getByEmail(email: string) {
    const result = await getEntrys(user, [eq(user.email, email)]);
    return (result && result[0]) || null;
  }

  async create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    position?: string;
    level?: string;
    country?: number;
    isEmailConfirmed?: boolean;
    profileImage?: string;
  }) {
    const result = await insertEntry(user, userData);
    return result ? result[0] : null;
  }

  async update(
    id: number,
    userData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      position?: string;
      level?: string;
      country?: number;
      isEmailConfirmed?: boolean;
      profileImage?: string;
    }>,
  ) {
    const result = await updateEntry(user, [eq(user.id, id)], userData);
    return result;
  }
}

export const userRepo = new UserRepo();
