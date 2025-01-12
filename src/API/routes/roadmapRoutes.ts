import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmapController';

const router = Router();

router.get('/', RoadmapController.getAllRoadmaps);
router.get('/:id', RoadmapController.getRoadmapById);
router.get('/:title', RoadmapController.getRoadmapByTitle);
router.get('/slug/:slug', RoadmapController.getRoadmapBySlug);

export { router as roadmapRouter };
