import * as React from "react";

import { useEditorContext } from "../../context/editor";

export const Sidebar = () => {
  const { state } = useEditorContext();

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800">
      {state?.tables?.map((table) => (
        <p key={table}>{table}</p>
      ))}
    </div>
  );
};
