import * as React from "react";

import { Table } from "./Views/Table";
import { useEditorContext } from "../../context/Editor";

const renderView = (view?: string) => {
  switch (view) {
    case "table":
      return <Table />;
    default:
      return <React.Fragment>No view found</React.Fragment>;
  }
};

export const View = () => {
  const { state } = useEditorContext();
  return <div className="ml-64">{renderView(state?.view)}</div>;
};
