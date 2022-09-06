import * as React from "react";

import { Link, useParams } from "react-router-dom";

import { useEditorContext } from "../../context/Editor";
import { useTables } from "../../api/database";

export const Sidebar = () => {
  const { id } = useParams();
  const { setActiveTable } = useEditorContext();
  const tables = useTables(id, {
    refetchOnWindowFocus: false, // make sure when regaining focus we don't change the users view
    onSuccess(data) {
      if (data.length > 0) {
        setActiveTable(data[0]);
      }
    },
  });

  return (
    <div className="fixed top-0 left-0 flex flex-col w-64 h-screen p-3 bg-gray-800">
      <h2 className="mb-3 text-lg text-white">Tables</h2>
      {tables.data?.map((table) => (
        <Link
          className="mb-2 text-gray-200"
          to={`/editor/${id}/${table}`}
          key={table}
        >
          {table}
        </Link>
      ))}
    </div>
  );
};
