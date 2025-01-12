import { IRoadmapRepo } from '../../domain/repositories/IRoadmapRepo';
import { Roadmap } from '../../domain/entities/Roadmap';

export class RoadmapService {
  constructor(private roadmapRepo: IRoadmapRepo) {}

  async getAllRoadmaps(): Promise<Roadmap[]> {
    return this.roadmapRepo.getAll();
  }

  async getRoadmapBySlug(slug: string): Promise<Roadmap | null> {
    return this.roadmapRepo.getBySlug(slug);
  }

  async getRoadmapById(id: number): Promise<Roadmap | null> {
    return this.roadmapRepo.getById(id);
  }
  async getRoadmapByTitle(title: string): Promise<Roadmap | null> {
    return this.roadmapRepo.getByTitle(title);
  }
}
