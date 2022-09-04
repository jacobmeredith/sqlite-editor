import * as React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { Create } from "./Connection/Create";
import { Editor } from "./Editor";
import { EditorContextProvider } from "../context/editor";
import { Load } from "./Connection/Load";
import { trpc } from "../utils/trpc";

// Outlet added to parent roots to allow child routes to render
export const Journeys: React.FC = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      url: "http://localhost:5000/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Load />} />
            <Route
              path="/editor/:id"
              element={
                <EditorContextProvider>
                  <Editor />
                </EditorContextProvider>
              }
            />
            <Route path="/connection/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
