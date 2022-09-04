// Import this way to avoid having to install all of api's dependencies inside ui
import type { AppRouter } from "../../../../apps/api/src/index";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
