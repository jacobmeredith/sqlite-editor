import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import { connectionRoutes } from "./connection";
import cors from "cors";
import { databaseRoutes } from "./database";
import express from "express";
import { tableRoutes } from "./table";

const appRouter = trpc
  .router()
  .merge("connection.", connectionRoutes)
  .merge("database.", databaseRoutes)
  .merge("table.", tableRoutes);

export type AppRouter = typeof appRouter;

const app = express();

// Middleware
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(5000, () => console.log("Server is running"));
