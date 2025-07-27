
import { PanelSpinner } from "@vkontakte/vkui";
import { useEffect } from "react";
import { authorize } from "./api/auth/authorize";
import bridge from '@vkontakte/vk-bridge';
import handleLog from "./helpers/handleLog";

export const App = () => {

  /*
  useEffect(() => {
    handleLog("Trying to initialize bridge connection...")
    bridge.send('VKWebAppInit')
      .then(() => console.log('VK Bridge initialized'))
      .catch((err) => console.error('VK Bridge init error:', err));
  }, []);
  */

  useEffect(
    ()=>{
      handleLog("Sending auth request to the server...")
      authorize()
    }, []
  )

  return (
    <PanelSpinner />
  );
};
