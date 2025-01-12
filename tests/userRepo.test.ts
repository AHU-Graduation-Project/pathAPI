import UserRepo from '../src/infrastructure/repos/userRepo';
import { db, insertEntry, getEntrys, updateEntry } from '../src/services/db.service';
import { User } from '../src/domain/entities/User';

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
  let userRepo: UserRepo;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepo = new UserRepo();
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

    const userData: User = {
      id: 2, // or generate a unique ID
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      position: 'Developer',
      level: 'Junior',
      country: 'USA',
      isEmailConfirmed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImage: { data: 'imageData' },
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

    await userRepo.update(1, userData);
    expect(updateEntry).toHaveBeenCalledWith('user', [{ id: 1 }], userData);
  });

  it('should get all users', async () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    ];
    (getEntrys as jest.Mock).mockResolvedValueOnce(mockUsers);

    const result = await userRepo.getAll();
    expect(result).toEqual(mockUsers);
  });
});