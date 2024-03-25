import { message as imessage } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { atom, useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import RouterProviders from "./router";

export const message = atom<MessageInstance | null>(null);
function App() {
  const router = useLocation();
  const [messageApi, contextHolder] = imessage.useMessage();
  const [, setMessage] = useAtom(message);
  setMessage(messageApi);
  
  return (
    <>
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <HeaderComponent />
      </div>
      <RouterProviders />
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <Footers />
      </div>
      {contextHolder}
    </>
  );
}

export default App;
