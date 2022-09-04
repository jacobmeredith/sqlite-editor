import * as React from "react";

import { Link } from "react-router-dom";

interface ConnectionTileProps {
  id: number;
  name: string;
  path: string;
}

export const ConnectionTile: React.FC<ConnectionTileProps> = ({ id, name }) => {
  return (
    <Link
      to={`/editor/${id}`}
      className="flex flex-row items-center justify-center h-64 p-4 text-center bg-gray-800 rounded-md"
    >
      <h1>{name}</h1>
    </Link>
  );
};
