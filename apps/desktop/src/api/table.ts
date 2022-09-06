import { InferQueryInput, InferQueryOutput, trpc } from "../utils/trpc";
import { TRPCClientErrorLike, UseTRPCQueryOptions } from "@trpc/react";

import { convertId } from "../utils/id";

export const useTableSchema = (
  table?: string,
  id?: string | number,
  opts?: UseTRPCQueryOptions<
    "table.schema",
    InferQueryInput<"table.schema">,
    InferQueryOutput<"table.schema">,
    InferQueryOutput<"table.schema">,
    TRPCClientErrorLike<any>
  >
) =>
  trpc.useQuery(
    ["table.schema", { table: table ?? "", id: convertId(id) }],
    opts
  );

export const useTable = (
  table?: string,
  id?: string | number,
  opts?: UseTRPCQueryOptions<
    "table.get",
    InferQueryInput<"table.get">,
    InferQueryOutput<"table.get">,
    InferQueryOutput<"table.get">,
    TRPCClientErrorLike<any>
  >
) =>
  trpc.useQuery(["table.get", { table: table ?? "", id: convertId(id) }], opts);
