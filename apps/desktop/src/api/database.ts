import { InferQueryInput, InferQueryOutput, trpc } from "../utils/trpc";
import { TRPCClientErrorLike, UseTRPCQueryOptions } from "@trpc/react";

import { convertId } from "../utils/id";

export const useTables = (
  id?: string | number,
  opts?: UseTRPCQueryOptions<
    "database.tables",
    InferQueryInput<"database.tables">,
    InferQueryOutput<"database.tables">,
    string[],
    TRPCClientErrorLike<any>
  >
) => trpc.useQuery(["database.tables", { id: convertId(id) }], opts);
