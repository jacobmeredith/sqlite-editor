import { trpc } from "../utils/trpc";

export const useAllConnections = () => trpc.useQuery(["connection.all"]);

export const useAddConnection = () => trpc.useMutation("connection.add");
