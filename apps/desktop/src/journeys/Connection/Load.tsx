import * as React from "react";

import { ConnectionTile } from "../../elements/Connection/ConnectionTile";
import { CreateConnectionTile } from "../../elements/Connection/CreateConnectionTile";
import { trpc } from "../../utils/trpc";

export const Load = () => {
  const connections = trpc.useQuery(["connection.all"]);

  return (
    <div className="grid grid-cols-4 gap-8 p-8">
      {connections.data?.map((connection) => (
        <ConnectionTile key={connection.id} {...connection} />
      ))}
      <CreateConnectionTile />
    </div>
  );
};
