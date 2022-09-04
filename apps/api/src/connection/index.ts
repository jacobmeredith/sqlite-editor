import * as yup from "yup";

import { prismaClient } from "../client";
import { router } from "@trpc/server";

export const connectionRoutes = router()
  .query("byId", {
    input: yup
      .object({
        id: yup.number().required(),
      })
      .required(),
    async resolve({ input: { id } }) {
      const connection = await prismaClient.connection.findFirstOrThrow({
        where: { id },
      });
      return connection;
    },
  })
  .query("all", {
    async resolve() {
      const connections = await prismaClient.connection.findMany();
      return connections;
    },
  })
  .mutation("add", {
    input: yup
      .object({
        path: yup.string().required(),
        name: yup.string().required(),
      })
      .required(),
    async resolve({ input: { path, name } }) {
      return await prismaClient.connection.create({
        data: { path, name },
      });
    },
  });
