import { relations } from 'drizzle-orm/relations';
import {
  roadmap,
  edge,
  topic,
  topicKeywords,
  roadmapResource,
  topicResource,
  follow,
  user,
  achievedRoadmap,
  roadmapKeywords,
  roadmapTopic,
  achievedTopic,
  roadmapFeedback,
} from './schema';

export const edgeRelations = relations(edge, ({ one }) => ({
  roadmap: one(roadmap, {
    fields: [edge.roadmap],
    references: [roadmap.id],
  }),
  topic_source: one(topic, {
    fields: [edge.source],
    references: [topic.id],
    relationName: 'edge_source_topic_id',
  }),
  topic_target: one(topic, {
    fields: [edge.target],
    references: [topic.id],
    relationName: 'edge_target_topic_id',
  }),
}));

export const roadmapRelations = relations(roadmap, ({ many }) => ({
  edges: many(edge),
  topics: many(topic),
  roadmapResources: many(roadmapResource),
  follows: many(follow),
  achievedRoadmaps: many(achievedRoadmap),
  roadmapKeywords: many(roadmapKeywords),
  roadmapTopics: many(roadmapTopic),
  roadmapFeedbacks: many(roadmapFeedback),
}));

export const topicRelations = relations(topic, ({ one, many }) => ({
  edges_source: many(edge, {
    relationName: 'edge_source_topic_id',
  }),
  edges_target: many(edge, {
    relationName: 'edge_target_topic_id',
  }),
  topic: one(topic, {
    fields: [topic.prerequisites],
    references: [topic.id],
    relationName: 'topic_prerequisites_topic_id',
  }),
  topics: many(topic, {
    relationName: 'topic_prerequisites_topic_id',
  }),
  roadmap: one(roadmap, {
    fields: [topic.roadmap],
    references: [roadmap.id],
  }),
  topicKeywords: many(topicKeywords),
  topicResources: many(topicResource),
  roadmapTopics: many(roadmapTopic),
  achievedTopics: many(achievedTopic),
}));

export const topicKeywordsRelations = relations(topicKeywords, ({ one }) => ({
  topic: one(topic, {
    fields: [topicKeywords.topic],
    references: [topic.id],
  }),
}));

export const roadmapResourceRelations = relations(
  roadmapResource,
  ({ one }) => ({
    roadmap: one(roadmap, {
      fields: [roadmapResource.roadmap],
      references: [roadmap.id],
    }),
  }),
);

export const topicResourceRelations = relations(topicResource, ({ one }) => ({
  topic: one(topic, {
    fields: [topicResource.topic],
    references: [topic.id],
  }),
}));

export const followRelations = relations(follow, ({ one }) => ({
  roadmap: one(roadmap, {
    fields: [follow.roadmap],
    references: [roadmap.id],
  }),
  user: one(user, {
    fields: [follow.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  follows: many(follow),
  achievedRoadmaps: many(achievedRoadmap),
  achievedTopics: many(achievedTopic),
  roadmapFeedbacks: many(roadmapFeedback),
}));

export const achievedRoadmapRelations = relations(
  achievedRoadmap,
  ({ one }) => ({
    roadmap: one(roadmap, {
      fields: [achievedRoadmap.roadmap],
      references: [roadmap.id],
    }),
    user: one(user, {
      fields: [achievedRoadmap.userId],
      references: [user.id],
    }),
  }),
);

export const roadmapKeywordsRelations = relations(
  roadmapKeywords,
  ({ one }) => ({
    roadmap: one(roadmap, {
      fields: [roadmapKeywords.roadmap],
      references: [roadmap.id],
    }),
  }),
);

export const roadmapTopicRelations = relations(roadmapTopic, ({ one }) => ({
  roadmap: one(roadmap, {
    fields: [roadmapTopic.roadmap],
    references: [roadmap.id],
  }),
  topic: one(topic, {
    fields: [roadmapTopic.topic],
    references: [topic.id],
  }),
}));

export const achievedTopicRelations = relations(achievedTopic, ({ one }) => ({
  topic: one(topic, {
    fields: [achievedTopic.topic],
    references: [topic.id],
  }),
  user: one(user, {
    fields: [achievedTopic.userId],
    references: [user.id],
  }),
}));

export const roadmapFeedbackRelations = relations(
  roadmapFeedback,
  ({ one }) => ({
    roadmap: one(roadmap, {
      fields: [roadmapFeedback.roadmap],
      references: [roadmap.id],
    }),
    user: one(user, {
      fields: [roadmapFeedback.userId],
      references: [user.id],
    }),
  }),
);
