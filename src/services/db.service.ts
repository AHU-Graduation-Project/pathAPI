import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { useSchemas } from '.';

const schema = useSchemas().drizzle;

const connectionURL = process.env.DB_URL as string;

const queryClient = postgres(connectionURL + '?ssl=true');
export const db = drizzle(queryClient);

export const insertEntry = async (table: any, entry: any) => {
  try {
    const result = await db
      .insert(table)
      .values(entry)
      .returning({ id: table.id });

    return result;
  } catch (error) {}
};

export const updateEntry = async (
  table: any,
  where: Array<any>,
  updateEntry: object,
) => {
  try {
    const result = await db
      .update(table)
      .set(updateEntry)
      .where(and(...where));

    return result;
  } catch (error) {}
};

export const getEntrys = async (table: any, where: Array<any>) => {
  try {
    const result = await db
      .select()
      .from(table)
      .where(and(...where));

    return result;
  } catch (error) {}
};

export const useDB = () => {
  return {
    insertEntry,
    updateEntry,
    getEntrys,
    db,
  };
};
