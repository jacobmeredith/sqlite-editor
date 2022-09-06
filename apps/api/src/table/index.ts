import * as yup from "yup";

import { getDbInstance } from "../utils/db";
import { prismaClient } from "../client";
import { router } from "@trpc/server";

export const tableRoutes = router()
  .query("schema", {
    input: yup
      .object({
        id: yup.number().required(),
        table: yup.string().required(),
      })
      .required(),
    async resolve({ input: { id, table } }) {
      const connection = await prismaClient.connection.findFirstOrThrow({
        where: { id },
      });

      const db = await getDbInstance(connection.path);
      const schema = await db.all(`PRAGMA table_info(${table});`);

      return schema;
    },
  })
  .query("get", {
    input: yup
      .object({
        id: yup.number().required(),
        table: yup.string().required(),
      })
      .required(),
    async resolve({ input: { id, table } }) {
      const connection = await prismaClient.connection.findFirstOrThrow({
        where: { id },
      });

      const db = await getDbInstance(connection.path);
      const tables = await db.all(`SELECT * FROM ${table} LIMIT 5;`);

      return tables;
    },
  });
