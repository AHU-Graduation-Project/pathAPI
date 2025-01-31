import { CustomError } from '../../application/exception/customError';
import { ServerError } from '../../application/exception/serverError';
import { ITopic } from '../../domain/entities/ITopic';
import { ITopicRepo } from '../../domain/IRepo/ITopicRepo';
import Logger from '../logger/consoleLogger';
import pool from './DBpool';

export class TopicRepo implements ITopicRepo {
  private static _instance: TopicRepo;
  private constructor() {}

  public static get instance() {
    if (!TopicRepo._instance) TopicRepo._instance = new TopicRepo();
    return TopicRepo._instance;
  }

  async create(topics: ITopic[], roadmapId: number): Promise<void> {
    if (!topics.length) return;
    const query = `
      INSERT INTO topic (id, roadmap, prerequisites, label, type, description, position_x, position_y, skill_name, is_analysis_needed)
      VALUES
        ${topics
          .map(
            (_, index) =>
              `($${index * 10 + 1},
            $${index * 10 + 2},
            $${index * 10 + 3},
            $${index * 10 + 4},
            $${index * 10 + 5},
            $${index * 10 + 6},
            $${index * 10 + 7},
            $${index * 10 + 8},
            $${index * 10 + 9},
            $${index * 10 + 10})`,
          )
          .join(', ')};
    `;

    const values = topics.flatMap((topic) => [
      topic.id,
      roadmapId,
      topic.prerequisites,
      topic.label,
      topic.type,
      topic.description,
      topic.position_x,
      topic.position_y,
      topic.skill_name,
      topic.is_analysis_needed,
    ]);
    try {
      await pool.query(query, values);
      return;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'RoadmapRepo.create()');
    }
  }

  async delete(roadmapId: number): Promise<void> {
    const query = `DELETE FROM topic WHERE roadmap=$1`;
    try {
      await pool.query(query, [roadmapId]);
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.delete()');
    }
  }

  async getByRoadmap(roadmapId: number): Promise<ITopic[]> {
    const query = `SELECT * FROM topic WHERE roadmap=$1`;
    try {
      const topics = await pool.query(query, [roadmapId]);
      return topics.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.getByRoadmap()');
    }
  }

  async achieve(topic: number, user: number): Promise<void> {
    const checkQuery =
      'SELECT * FROM achieved_topic WHERE "user" = $1 AND topic = $2';
    const query = 'INSERT INTO achieved_topic VALUES ($1, $2)';
    try {
      if ((await pool.query(checkQuery, [user, topic])).rowCount) {
        // Check if it's achieved
        return this.unAchieve(topic, user);
      }

      await pool.query(query, [user, topic]);
    } catch (error: Error | any) {
      if (error.code === '23505') {
        throw new CustomError('Topic already achieved', 400);
      } else {
        throw new ServerError(error.message, 500, 'TopicRepo.achieve()');
      }
    }
  }

  private async unAchieve(topic: number, user: number): Promise<void> {
    const query = 'DELETE FROM achieved_topic WHERE "user" = $1 AND topic = $2';
    try {
      await pool.query(query, [user, topic]);
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.unAchieve()');
    }
  }

  async getByUser(user: number): Promise<ITopic[]> {
    throw new Error('Method not implemented.');
  }

  async get(): Promise<ITopic[]> {
    const query = `
        SELECT DISTINCT ON (label) 
            label
        FROM 
            topic
        WHERE topic.type = 'topic'
        ORDER BY 
            label, created_at DESC;
      `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.get()');
    }
  }

  async getAchieved(user: number): Promise<ITopic[]> {
    const query = `
    SELECT * FROM achieved_topics_by_user
    WHERE "user" = $1;
  `;
    try {
      const result = await pool.query(query, [user]);
      return result.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.getAchieved()');
    }
  }

  async getAchievedInRoadmap(user: number, roadmap: number) {
    const query = `
    SELECT * FROM achieved_topics_by_user_and_roadmap
    WHERE "user" = $1 AND roadmap = $2;
    `;
    try {
      const result = await pool.query(query, [user, roadmap]);
      return result.rows;
    } catch (error: Error | any) {
      throw new ServerError(
        error.message,
        500,
        'TopicRepo.getAchievedInRoadmap()',
      );
    }
  }

  async getSkills(user: number): Promise<ITopic[]> {
    const query = `
    SELECT skill_name FROM achieved_topics_by_user
    WHERE "user" = $1 AND skill_name IS NOT NULL AND skill_name != '' GROUP BY skill_name;
    `;
    try {
      const result = await pool.query(query, [user]);
      return result.rows;
    } catch (error: Error | any) {
      throw new ServerError(error.message, 500, 'TopicRepo.getSkills()');
    }
  }
}
