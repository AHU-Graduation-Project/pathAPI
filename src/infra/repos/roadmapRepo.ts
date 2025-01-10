import {
  db,
  insertEntry,
  updateEntry,
  getEntrys,
} from '../../services/db.service';
import { roadmap } from '../db/schema';
import { eq } from 'drizzle-orm';

export class RoadmapRepo {
  async getById(id: number) {
    const result = await getEntrys(roadmap, [eq(roadmap.id, id)]);
    return (result && result[0]) || null;
  }

  async getByTitle(title: string) {
    const result = await getEntrys(roadmap, [eq(roadmap.title, title)]);
    return (result && result[0]) || null;
  }

  async create(roadmapData: {
    title: string;
    description?: string;
    slug: string;
    creator?: number;
    creatorVisibility?: boolean;
    adminVisibility?: boolean;
    isDeleted?: boolean;
    isOfficial?: boolean;
    icon?: string;
  }) {
    const result = await insertEntry(roadmap, roadmapData);
    return result ? result[0] : null;
  }

  async update(
    id: number,
    roadmapData: Partial<{
      title: string;
      description?: string;
      slug: string;
      creator?: number;
      creatorVisibility?: boolean;
      adminVisibility?: boolean;
      isDeleted?: boolean;
      isOfficial?: boolean;
      icon?: string;
    }>,
  ) {
    const result = await updateEntry(roadmap, [eq(roadmap.id, id)], roadmapData);
    return result;
  }
}

export const roadmapRepo = new RoadmapRepo();


