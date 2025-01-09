import {
  pgTable,
  unique,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  foreignKey,
  text,
  doublePrecision,
  primaryKey,
  check,
  smallint,
  customType,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const admin = pgTable(
  'admin',
  {
    id: serial().primaryKey().notNull(),
    firstname: varchar({ length: 255 }).notNull(),
    minit: varchar({ length: 255 }),
    lastname: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    isemailconfirmed: boolean().default(false),
    createdat: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
    updatedat: timestamp({ mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
    isverified: boolean().default(false),
    issuspended: boolean().default(false),
    ishost: boolean().default(false),
  },
  (table) => [unique('admin_email_key').on(table.email)],
);

export const country = pgTable('country', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const edgeStyle = pgTable('edge_style', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const editor = pgTable(
  'editor',
  {
    id: serial().primaryKey().notNull(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    midInit: varchar('mid_init', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    position: varchar({ length: 255 }),
    level: varchar({ length: 255 }),
    isEmailConfirmed: boolean('is_email_confirmed').default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    nationality: integer(),
    citizenship: integer(),
    isVerified: boolean('is_verified').default(false),
    isSuspended: boolean('is_suspended').default(false),
  },
  (table) => [unique('editor_email_key').on(table.email)],
);

export const nodeType = pgTable('node_type', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const edge = pgTable(
  'edge',
  {
    id: serial().primaryKey().notNull(),
    source: integer(),
    target: integer(),
    roadmap: integer(),
    sourceHandle: varchar('source_handle', { length: 255 }),
    targetHandle: varchar('target_handle', { length: 255 }),
    style: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'edge_roadmap_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.source],
      foreignColumns: [topic.id],
      name: 'edge_source_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.target],
      foreignColumns: [topic.id],
      name: 'edge_target_fkey',
    }).onDelete('cascade'),
  ],
);

export const topic = pgTable(
  'topic',
  {
    id: serial().primaryKey().notNull(),
    prerequisites: integer(),
    roadmap: integer(),
    description: text(),
    label: text(),
    type: text(),
    positionX: doublePrecision('position_x'),
    positionY: doublePrecision('position_y'),
    height: doublePrecision(),
    width: doublePrecision(),
    zIndex: integer('z_index'),
    isSkill: boolean('is_skill').default(false),
    isDeleted: boolean('is_deleted').default(false),
    isAnalysisNeeded: boolean('is_analysis_needed').default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
  },
  (table) => [
    foreignKey({
      columns: [table.prerequisites],
      foreignColumns: [table.id],
      name: 'topic_prerequisites_fkey',
    }),
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'topic_roadmap_fkey',
    }).onDelete('cascade'),
  ],
);

export const roadmap = pgTable(
  'roadmap',
  {
    id: serial().primaryKey().notNull(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    slug: varchar({ length: 255 }).notNull(),
    creator: integer(),
    creatorVisibility: boolean('creator_visibility').default(true),
    adminVisibility: boolean('admin_visibility').default(true),
    isDeleted: boolean('is_deleted').default(false),
    isOfficial: boolean('is_official').default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    icon: varchar({ length: 25 }),
  },
  (table) => [unique('roadmap_slug_key').on(table.slug)],
);

export const topicKeywords = pgTable(
  'topic_keywords',
  {
    topic: integer().primaryKey().notNull(),
    keyword: varchar({ length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.topic],
      foreignColumns: [topic.id],
      name: 'topic_keywords_topic_fkey',
    }).onDelete('cascade'),
  ],
);

export const roadmapResource = pgTable(
  'roadmap_resource',
  {
    id: serial().primaryKey().notNull(),
    roadmap: integer(),
    title: varchar({ length: 255 }),
    link: varchar({ length: 255 }),
    type: varchar({ length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'roadmap_resource_roadmap_fkey',
    }).onDelete('cascade'),
  ],
);

export const topicResource = pgTable(
  'topic_resource',
  {
    id: serial().primaryKey().notNull(),
    topic: integer(),
    title: varchar({ length: 255 }),
    link: varchar({ length: 255 }),
    type: varchar({ length: 255 }),
  },
  (table) => [
    foreignKey({
      columns: [table.topic],
      foreignColumns: [topic.id],
      name: 'topic_resource_topic_fkey',
    }).onDelete('cascade'),
  ],
);

const customBytea = customType<{ data: string; notNull: false }>({
  dataType() {
    return 'bytea';
  },
});

export const user = pgTable(
  'user',
  {
    id: serial().primaryKey().notNull(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    position: varchar({ length: 255 }),
    level: varchar({ length: 255 }),
    country: integer(),
    isEmailConfirmed: boolean('is_email_confirmed').default(false),
    createdAt: timestamp('created_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    profileImage: customBytea('profile_image'),
  },
  (table) => [unique('user_email_key').on(table.email)],
);

export const follow = pgTable(
  'follow',
  {
    userId: integer('user_id').notNull(),
    roadmap: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'follow_roadmap_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'follow_user_id_fkey',
    }).onDelete('cascade'),
    primaryKey({ columns: [table.userId, table.roadmap], name: 'follow_pkey' }),
  ],
);

export const achievedRoadmap = pgTable(
  'achieved_roadmap',
  {
    userId: integer('user_id').notNull(),
    roadmap: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'achieved_roadmap_roadmap_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'achieved_roadmap_user_id_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.userId, table.roadmap],
      name: 'achieved_roadmap_pkey',
    }),
  ],
);

export const roadmapKeywords = pgTable(
  'roadmap_keywords',
  {
    roadmap: integer().notNull(),
    keyword: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'roadmap_keywords_roadmap_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.roadmap, table.keyword],
      name: 'roadmap_keywords_pkey',
    }),
  ],
);

export const roadmapTopic = pgTable(
  'roadmap_topic',
  {
    roadmap: integer().notNull(),
    topic: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'roadmap_topic_roadmap_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.topic],
      foreignColumns: [topic.id],
      name: 'roadmap_topic_topic_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.roadmap, table.topic],
      name: 'roadmap_topic_pkey',
    }),
  ],
);

export const achievedTopic = pgTable(
  'achieved_topic',
  {
    userId: integer('user_id').notNull(),
    topic: integer().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.topic],
      foreignColumns: [topic.id],
      name: 'achieved_topic_topic_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'achieved_topic_user_id_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.userId, table.topic],
      name: 'achieved_topic_pkey',
    }),
  ],
);

export const roadmapFeedback = pgTable(
  'roadmap_feedback',
  {
    roadmap: integer().notNull(),
    userId: integer('user_id').notNull(),
    feedback: text().notNull(),
    rating: smallint(),
  },
  (table) => [
    foreignKey({
      columns: [table.roadmap],
      foreignColumns: [roadmap.id],
      name: 'roadmap_feedback_roadmap_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'roadmap_feedback_user_id_fkey',
    }).onDelete('cascade'),
    primaryKey({
      columns: [table.roadmap, table.userId],
      name: 'roadmap_feedback_pkey',
    }),
    check('rating_range', sql`(rating >= 1) AND (rating <= 5)`),
  ],
);
