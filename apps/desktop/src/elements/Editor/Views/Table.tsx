import * as React from "react";

import DataGrid, { textEditor } from "react-data-grid";
import { useTable, useTableSchema } from "../../../api/table";

import { debounce } from "../../../utils/debounce";
import { useEditorContext } from "../../../context/Editor";
import { useParams } from "react-router-dom";

const setColumnsData = (data: Array<{ name: string }>) => {
  return data.map((r) => ({
    key: r.name,
    name: r.name,
    editable: true,
    editor: textEditor,
    resizable: true,
  }));
};

export const Table = () => {
  const { id, table } = useParams();
  const { state, setActiveTable } = useEditorContext();
  const [rows, setRows] = React.useState<Array<any>>([]);
  const [edited, setEdited] = React.useState(false);
  const [columns, setColumns] = React.useState<
    Array<{ key: string; name: string }>
  >([]);
  useTable(state?.activeTable, id, {
    onSuccess(data) {
      setRows(data);
    },
  });
  useTableSchema(state?.activeTable, id, {
    onSuccess(data) {
      setColumns(setColumnsData(data));
    },
  });

  const setEditedDebounce = React.useMemo(
    () =>
      debounce(() => {
        setEdited(true);
      }, 500),
    []
  );

  React.useEffect(() => {
    if (table) {
      setActiveTable(table);
    }
  }, [table]);

  React.useEffect(() => {
    if (edited) {
      // Save back to db here
      console.log({ rows });
      setEdited(false);
    }
  }, [edited]);

  const onRowsChange = (rows: any[]) => {
    setRows(rows);
    setEditedDebounce();
  };

  return (
    <DataGrid
      className="h-auto bg-gray-900 border-0"
      rowClass={() => "bg-gray-900 border-r-0"}
      onRowsChange={onRowsChange}
      columns={columns}
      rows={rows}
    />
  );
};
