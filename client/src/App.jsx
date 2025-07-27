
import { PanelSpinner } from "@vkontakte/vkui";
import { useEffect } from "react";
import { authorize } from "./api/auth/authorize";
export const App = () => {

  useEffect(
    ()=>{
      authorize()
    }, []
  )

  return (
    <PanelSpinner />
  );
};
