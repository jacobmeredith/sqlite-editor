import * as React from "react";

interface InitialContextState {
  connectionId?: number;
  connectionPath?: string;
  tables?: string[];
  activeTable?: string;
  view?: string;
}

type Action =
  | { type: "SET_CONNECTION_ID"; payload: number }
  | { type: "SET_CONNECTION_PATH"; payload: string }
  | { type: "SET_VIEW"; payload: string }
  | { type: "SET_TABLES"; payload: string[] };

function reducer(
  state: InitialContextState,
  action: Action
): InitialContextState {
  switch (action.type) {
    case "SET_CONNECTION_ID":
      return { ...state, connectionId: action.payload };
    case "SET_TABLES":
      return {
        ...state,
        tables: action.payload,
        activeTable: action.payload[0] ?? undefined,
      };
    default:
      return state;
  }
}

const initialState: InitialContextState = {};

const EditorContext = React.createContext<
  { state?: InitialContextState } & { dispatch?: React.Dispatch<Action> }
>({});

interface EditorContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const { state, dispatch } = React.useContext(EditorContext);

  return {
    state,
    setConnectionId: (id: number) => {
      if (dispatch) {
        dispatch({ type: "SET_CONNECTION_ID", payload: id });
      }
    },
    setConnectionPath: (path: string) => {
      if (dispatch) {
        dispatch({ type: "SET_CONNECTION_PATH", payload: path });
      }
    },
    setView: (view: string) => {
      if (dispatch) {
        dispatch({ type: "SET_VIEW", payload: view });
      }
    },
    setTables: (tables: string[]) => {
      if (dispatch) {
        dispatch({ type: "SET_TABLES", payload: tables });
      }
    },
  };
};
