import { Modal, notification } from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import { NotificationInstance } from "antd/es/notification/interface";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import Loader from "./components/Loader";
import useLocalStorage from "./hooks/localStorage";
import RouterProviders from "./router";

export const messageContext = atom<NotificationInstance | null>(null);
export const modalContext = atom<HookAPI | null>(null);

function App() {
  const router = useLocation();
  const accessToken = useLocalStorage();
  const navigator = useNavigate();
  notification.config({
    duration: 1.5,
  });
  const [api, contextHolder] = notification.useNotification();
  // const [messageApi, contextHolder] = imessage.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [toast, setMessage] = useAtom(messageContext);
  const [, setModal] = useAtom(modalContext);
  setMessage(api);
  setModal(modal);

  useEffect(() => {
    if (router.pathname === "/login" && accessToken) {
      toast?.open({
        icon: <Loader spinning />,
        message: "logging in...",
        duration: 1.5,
        onClose: () => {
          navigator("/");
        },
      });
    }
  }, [router, accessToken]);
  return (
    <div>
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
        <HeaderComponent />
      </div>
      <RouterProviders />
      <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }} className="mt-10">
        <Footers />
      </div>
      {contextHolder}
      {modalContextHolder}
    </div>
  );
}

export default App;
