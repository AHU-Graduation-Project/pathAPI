import { Request, Response } from 'express';
import { RoadmapService } from '../../application/service/roadmapService';
import { RoadmapRepo } from '../../infrastructure/repos/roadmapRepo';
import { Roadmap } from '../../domain/entities/Roadmap';

export class RoadmapController {
  static roadmapRepo = new RoadmapRepo();
  static roadmapService = new RoadmapService(this.roadmapRepo);
  static async getAllRoadmaps(req: Request, res: Response): Promise<void> {
    try {
      const roadmaps = await RoadmapController.roadmapService.getAllRoadmaps();
      res.status(200).json(roadmaps);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getRoadmapBySlug(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;

    try {
      const roadmap =
        await RoadmapController.roadmapService.getRoadmapBySlug(slug);
      if (!roadmap) {
        res.status(404).json({ message: 'Roadmap not found' });
        return;
      }
      res.status(200).json(roadmap);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getRoadmapById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const roadmap = await RoadmapController.roadmapService.getRoadmapById(
        Number(id),
      );
      if (!roadmap) {
        res.status(404).json({ message: 'Roadmap not found' });
        return;
      }
      res.status(200).json(roadmap);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getRoadmapByTitle(req: Request, res: Response): Promise<void> {
    const { title } = req.params;

    try {
      const roadmap =
        await RoadmapController.roadmapService.getRoadmapByTitle(title);
      if (!roadmap) {
        res.status(404).json({ message: 'Roadmap not found' });
        return;
      }
      res.status(200).json(roadmap);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
