import dotenv from 'dotenv';

dotenv.config(); // Load .env for development
// If in production, load .env.prod
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
}

export const config = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET_KEY as string,
};
