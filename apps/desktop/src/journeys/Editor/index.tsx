import * as React from "react";

import { Sidebar } from "../../elements/Editor/Sidebar";
import { View } from "../../elements/Editor/View";

export const Editor: React.FC = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <View />
    </React.Fragment>
  );
};
