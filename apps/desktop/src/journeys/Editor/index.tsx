import * as React from "react";

import { Sidebar } from "../../elements/Editor/Sidebar";
import { View } from "../../elements/Editor/View";
import { trpc } from "../../utils/trpc";
import { useEditorContext } from "../../context/editor";
import { useParams } from "react-router-dom";

export const Editor: React.FC = () => {
  const { id } = useParams();
  const { setConnectionId, setTables } = useEditorContext();

  const tables = trpc.useQuery([
    "database.tables",
    { id: parseInt(id ?? "-1", 10) },
  ]);

  // This needs to be done to fetch more data
  React.useEffect(() => {
    setConnectionId(parseInt(id ?? "-1", 10));
  }, []);

  React.useEffect(() => {
    if (tables.data) {
      setTables(tables.data);
    }
  }, [tables.data]);

  return (
    <React.Fragment>
      <Sidebar />
      <View />
    </React.Fragment>
  );
};
