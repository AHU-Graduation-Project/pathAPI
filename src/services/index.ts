import { user, topic, roadmap, country } from '../infra/db/schema';

export const schemas = {
  drizzle: {
    user,
    topic,
    roadmap,
    country,
  },
};

export const useSchemas = () => {
  return schemas;
};

export const isURL = (url: string) => /^(https):\/\/[^ "]+$/.test(url);
