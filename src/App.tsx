import { Modal, message as imessage } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { HookAPI } from "antd/es/modal/useModal";
import { atom, useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import RouterProviders from "./router";

export const messageContext = atom<MessageInstance | null>(null);
export const modalContext = atom<HookAPI | null>(null);

function App() {
  const router = useLocation();
  const [messageApi, contextHolder] = imessage.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [, setMessage] = useAtom(messageContext);
  const [, setModal] = useAtom(modalContext);
  setMessage(messageApi);
  setModal(modal);
  return (
    <div>
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <HeaderComponent />
      </div>
      <RouterProviders />
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <Footers />
      </div>
      {contextHolder}
      {modalContextHolder}
    </div>
  );
}

export default App;
