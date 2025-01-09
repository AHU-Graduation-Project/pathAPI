import { userRepo } from '../src/infra/repos/userRepo';
import { db, insertEntry, getEntrys, updateEntry } from '../src/services/db.service';
import { user } from '../src/infra/db/schema';

jest.mock('../src/services/db.service', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  },
  insertEntry: jest.fn(),
  getEntrys: jest.fn(),
  updateEntry: jest.fn(),
}));

describe('UserRepo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get user by ID', async () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    (getEntrys as jest.Mock).mockResolvedValueOnce([mockUser]);

    const result = await userRepo.getById(1);
    expect(result).toEqual(mockUser);
  });

  it('should get user by email', async () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    (getEntrys as jest.Mock).mockResolvedValueOnce([mockUser]);

    const result = await userRepo.getByEmail('john.doe@example.com');
    expect(result).toEqual(mockUser);
  });

  it('should create a new user', async () => {
    const mockUser = { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' };
    (insertEntry as jest.Mock).mockResolvedValueOnce([mockUser]);

    const userData = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456'
    };

    const result = await userRepo.create(userData);
    expect(result).toEqual(mockUser);
  });

  it('should update an existing user', async () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    (updateEntry as jest.Mock).mockResolvedValueOnce(mockUser);

    const userData = {
      firstName: 'Johnny',
      lastName: 'Doe',
      email: 'johnny.doe@example.com',
    };

    const result = await userRepo.update(1, userData);
    expect(result).toEqual(mockUser);
  });
});