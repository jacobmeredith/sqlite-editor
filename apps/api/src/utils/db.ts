import { Database, Statement } from "sqlite3";
import { Database as db, open } from "sqlite";

const cachedConnections: Record<string, db<Database, Statement>> = {};

export const getDbInstance = async (path: string) => {
  if (cachedConnections[path]) {
    return cachedConnections[path];
  }

  cachedConnections[path] = await open({
    filename: path,
    driver: Database,
  });

  return cachedConnections[path];
};
