import express from 'express';
import { config } from './config';
import { authRouter } from './API/routes/authRoutes';
import { roadmapRouter } from './API/routes/roadmapRoutes';

const app = express();
app.use(express.json());

app.use('/api/v1/roadmaps', roadmapRouter);
app.use('/api/v1/auth', authRouter);

const port = config.port || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;
