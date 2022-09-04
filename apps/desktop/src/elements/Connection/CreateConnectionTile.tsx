import * as React from "react";

import { Link } from "react-router-dom";

export const CreateConnectionTile: React.FC = () => {
  return (
    <Link
      to="/connection/create"
      className="flex flex-row items-center justify-center h-64 p-4 text-center border-4 border-gray-800 rounded-md hover:cursor-pointer"
    >
      <h1>Add database</h1>
    </Link>
  );
};
