import { Layout, Modal, notification, App as AntdApp } from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import { NotificationInstance } from "antd/es/notification/interface";
import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerGetBlindBox from "./components/BlindBox/DrawerGetBlindBox";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import Loader from "./components/Loader";
import useLocalStorage from "./hooks/localStorage";
import RouterProviders from "./router";
import { InviteCodeAtom } from "./atom/invite";
import { disconnect } from "@wagmi/core";
import { config } from "./middleware/wagmi.config";

export const messageContext = atom<NotificationInstance | null>(null);
export const modalContext = atom<HookAPI | null>(null);
const { Header, Content, Footer } = Layout;
window.onerror = function (message, source, lineno, colno, error) {
  console.error("", message, source, lineno, colno, error);
};

window.addEventListener('error', function (event) {
  console.error("", event.message, event.filename, event.lineno, event.colno, event.error);
});

function App() {
  const { modal } = AntdApp.useApp();
  const router = useLocation();

  const [api, contextHolder] = notification.useNotification({
    duration: 1.5,
  });
  // const [messageApi, contextHolder] = imessage.useMessage();
  const [toast, setMessage] = useAtom(messageContext);
  const [, setModal] = useAtom(modalContext);
  const [, setReferralCode] = useAtom(InviteCodeAtom);
  setMessage(api);
  setModal(modal);

  // useEffect(() => {
  //   if (router.pathname === "/login" && accessToken) {
  //     toast?.open({
  //       icon: <Loader spinning />,
  //       message: "logging in...",
  //       duration: 1.5,
  //       onClose: () => {
  //         navigator("/");
  //       },
  //     });
  //   }
  // }, [router, accessToken]);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/comp.gif";
    const match = window.location.href.match(/referral=([^&]*)/);
    const code = match ? match[1] : null;

    //console.log("code", code);
    setReferralCode(code);
  }, []);
  return (
    <div>
      {contextHolder}
      <Layout>
        <Header
          className="iglass"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0",
            height: "auto",
          }}>
          {router.pathname !== "/login" && <HeaderComponent />}
        </Header>
        <Content
          style={{
            background: "#fff",
          }}>
          <RouterProviders />
        </Content>
        <Footer
          style={{
            padding: 0,
          }}>
          {router.pathname !== "/login" && <Footers />}
        </Footer>
      </Layout>
      <DrawerGetBlindBox />
    </div>
  );
}

const AppWithProvider = () => {
  return (
    <AntdApp>
      <App />
    </AntdApp>
  );
};
export default AppWithProvider;
