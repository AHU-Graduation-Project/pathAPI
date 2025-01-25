import { IRoadmap } from '../entities/IRoadmap';
import { PostRoadmapDTO } from '../DTOs/roadmap/PostRoadmapDTO';
import { PutRoadmapDTO } from '../DTOs/roadmap/PutRoadmapDTO';
import { GetRoadmapDTO } from '../DTOs/roadmap/GetRoadmapDTO';

export interface IRoadmapRepo {
  create(roadmap: IRoadmap): Promise<IRoadmap>;
  update(slug: string, roadmap: PutRoadmapDTO): Promise<IRoadmap>;
  delete(slug: string): Promise<void>;
  getBySlug(slug: string): Promise<IRoadmap>;
  getAll(...args: any): Promise<GetRoadmapDTO[]>;
  getFollowed(userId: number): Promise<IRoadmap[]>
  getByCreator(userId: number): Promise<IRoadmap[]>
  count(...args: any): Promise<number>
  getId(slug: string): Promise<number>
}