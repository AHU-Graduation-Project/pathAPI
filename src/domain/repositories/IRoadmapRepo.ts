import { Roadmap } from '../entities/Roadmap';

export interface IRoadmapRepo {
  getById(id: number): Promise<Roadmap | null>;
  getBySlug(slug: string): Promise<Roadmap | null>;
  getByTitle(title: string): Promise<Roadmap | null>;
  getAll(): Promise<Roadmap[]>;
}
