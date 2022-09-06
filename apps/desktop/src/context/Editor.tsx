import * as React from "react";

interface InitialContextState {
  activeTable?: string;
  view?: string;
}

type Action =
  | { type: "SET_VIEW"; payload: string }
  | { type: "SET_ACTIVE_TABLE"; payload: string };

function reducer(
  state: InitialContextState,
  action: Action
): InitialContextState {
  console.log(action);
  switch (action.type) {
    case "SET_ACTIVE_TABLE":
      return {
        ...state,
        activeTable: action.payload,
      };
    default:
      return state;
  }
}

const initialState: InitialContextState = {
  view: "table",
};

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
    setView: (view: string) => {
      if (dispatch) {
        dispatch({ type: "SET_VIEW", payload: view });
      }
    },
    setActiveTable: (table: string) => {
      if (dispatch) {
        dispatch({ type: "SET_ACTIVE_TABLE", payload: table });
      }
    },
  };
};
