import { roadmapRepo } from '../src/infrastructure/repos/roadmapRepo';
import { db, insertEntry, getEntrys, updateEntry } from '../src/services/db.service';
import { roadmap } from '../src/infrastructure/db/schema';

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

describe('RoadmapRepo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get roadmap by ID', async () => {
    const mockRoadmap = { id: 1, title: 'Official Roadmap', description: 'Description for official roadmap', slug: 'official-roadmap', creator: 1, isDeleted: false, isOfficial: true, createdAt: '2024-12-29T00:09:19.264626', updatedAt: '2024-12-29T00:09:19.264626' };
    (getEntrys as jest.Mock).mockResolvedValueOnce([mockRoadmap]);

    const result = await roadmapRepo.getById(1);
    expect(result).toEqual(mockRoadmap);
  });

  it('should get roadmap by title', async () => {
    const mockRoadmap = { id: 2, title: 'User Roadmap', description: 'Description for user roadmap', slug: 'user-roadmap', creator: 1, isDeleted: false, isOfficial: false, createdAt: '2024-12-29T00:09:19.264626', updatedAt: '2024-12-29T00:09:19.264626' };
    (getEntrys as jest.Mock).mockResolvedValueOnce([mockRoadmap]);

    const result = await roadmapRepo.getByTitle('User Roadmap');
    expect(result).toEqual(mockRoadmap);
  });

  it('should get roadmap by slug', async () => {
    const mockRoadmap = { id: 3, title: 'FrontEnd', description: 'front end web development', slug: 'frontend-roadmap', creator: null, isDeleted: false, isOfficial: true, createdAt: '2025-01-10T19:43:59.243523', updatedAt: '2025-01-10T19:43:59.243523' };
    (getEntrys as jest.Mock).mockResolvedValueOnce([mockRoadmap]);

    const result = await roadmapRepo.getBySlug('frontend-roadmap');
    expect(result).toEqual(mockRoadmap);
  });



  it('should get all roadmaps', async () => {
    const mockRoadmaps = [
      { id: 1, title: 'Official Roadmap', description: 'Description for official roadmap', slug: 'official-roadmap', creator: 1, isDeleted: false, isOfficial: true, createdAt: '2024-12-29T00:09:19.264626', updatedAt: '2024-12-29T00:09:19.264626' },
      { id: 2, title: 'User Roadmap', description: 'Description for user roadmap', slug: 'user-roadmap', creator: 1, isDeleted: false, isOfficial: false, createdAt: '2024-12-29T00:09:19.264626', updatedAt: '2024-12-29T00:09:19.264626' },
    ];
    (getEntrys as jest.Mock).mockResolvedValueOnce(mockRoadmaps);

    const result = await roadmapRepo.getAll();
    expect(result).toEqual(mockRoadmaps);
  });
});
