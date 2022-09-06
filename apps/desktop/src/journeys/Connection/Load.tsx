import * as React from "react";

import { ConnectionTile } from "../../elements/Connection/ConnectionTile";
import { CreateConnectionTile } from "../../elements/Connection/CreateConnectionTile";
import { useAllConnections } from "../../api/connections";

export const Load = () => {
  const connections = useAllConnections();

  return (
    <div className="grid grid-cols-4 gap-8 p-8">
      {connections.data?.map((connection) => (
        <ConnectionTile key={connection.id} {...connection} />
      ))}
      <CreateConnectionTile />
    </div>
  );
};
