import { roadmapRepo } from '../src/infra/repos/roadmapRepo';
import { db, insertEntry, getEntrys, updateEntry } from '../src/services/db.service';
import { roadmap } from '../src/infra/db/schema';

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

  it('should create a new roadmap', async () => {
    const mockRoadmap = { id: 3, title: 'FrontEnd', description: 'front end web development', slug: 'frontend-roadmap', creator: null, isDeleted: false, isOfficial: true, createdAt: '2025-01-10T19:43:59.243523', updatedAt: '2025-01-10T19:43:59.243523' };
    (insertEntry as jest.Mock).mockResolvedValueOnce([mockRoadmap]);

    const roadmapData = {
      title: 'FrontEnd',
      description: 'front end web development',
      slug: 'frontend-roadmap',
      isOfficial: true,
    };

    const result = await roadmapRepo.create(roadmapData);
    expect(result).toEqual(mockRoadmap);
  });

  it('should update an existing roadmap', async () => {
    const mockRoadmap = { id: 1, title: 'Updated Roadmap', description: 'Updated description', slug: 'updated-roadmap', creator: 1, isDeleted: false, isOfficial: true, createdAt: '2024-12-29T00:09:19.264626', updatedAt: '2024-12-29T00:09:19.264626' };
    (updateEntry as jest.Mock).mockResolvedValueOnce(mockRoadmap);

    const roadmapData = {
      title: 'Updated Roadmap',
      description: 'Updated description',
      slug: 'updated-roadmap',
    };

    const result = await roadmapRepo.update(1, roadmapData);
    expect(result).toEqual(mockRoadmap);
  });
});
