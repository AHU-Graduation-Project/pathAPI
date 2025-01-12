import { insertEntry, updateEntry, getEntrys } from '../../services/db.service';
import { Roadmap } from '../../domain/entities/Roadmap';
import { IRoadmapRepo } from '../../domain/repositories/IRoadmapRepo';

export class RoadmapRepo implements IRoadmapRepo {
  async getBySlug(slug: string): Promise<Roadmap | null> {
    try {
      const result = await getEntrys('roadmap', [{ slug }]);
      return result && result.length ? (result[0] as Roadmap) : null;
    } catch (error) {
      console.error('Error getting roadmap by slug:', error);
      return null;
    }
  }

  async getById(id: number): Promise<Roadmap | null> {
    try {
      const result = await getEntrys('roadmap', [{ id }]);
      return result && result.length ? (result[0] as Roadmap) : null;
    } catch (error) {
      console.error('Error getting roadmap by ID:', error);
      return null;
    }
  }

  async getByTitle(title: string): Promise<Roadmap | null> {
    try {
      const result = await getEntrys('roadmap', [{ title }]);
      return result && result.length ? (result[0] as Roadmap) : null;
    } catch (error) {
      console.error('Error getting roadmap by title:', error);
      return null;
    }
  }

  async getAll(): Promise<Roadmap[]> {
    try {
      const result = await getEntrys('roadmap', []);
      return result as Roadmap[];
    } catch (error) {
      console.error('Error getting all roadmaps:', error);
      return [];
    }
  }
}

export const roadmapRepo = new RoadmapRepo();
