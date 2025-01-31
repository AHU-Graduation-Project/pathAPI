import express from 'express';
import { JobsController } from '../controllers/jobs.controller';
import JobsService from '../../infrastructure/JobsService/Jobs.service';

const router = express.Router();
const jobsController = new JobsController(JobsService.instance);

router.get('/', jobsController.searchJobs);

export default router;
