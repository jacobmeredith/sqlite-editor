import * as yup from "yup";

import { getDbInstance } from "../utils/db";
import { prismaClient } from "../client";
import { router } from "@trpc/server";

export const databaseRoutes = router().query("tables", {
  input: yup
    .object({
      id: yup.number().required(),
    })
    .required(),
  async resolve({ input: { id } }) {
    const connection = await prismaClient.connection.findFirstOrThrow({
      where: { id },
    });

    const db = await getDbInstance(connection.path);

    const tables = await db.all<Array<{ name: string }>>(`
        SELECT name FROM sqlite_master
        WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%'
        UNION ALL
        SELECT name FROM sqlite_temp_master
        WHERE type IN ('table','view')
        ORDER BY 1
      `);

    return tables.map((t) => t.name);
  },
});
