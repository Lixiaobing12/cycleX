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

export const messageContext = atom<NotificationInstance | null>(null);
export const modalContext = atom<HookAPI | null>(null);
const { Header, Content, Footer } = Layout;

function App() {
  const { modal } = AntdApp.useApp();
  const router = useLocation();
  const accessToken = useLocalStorage();
  const navigator = useNavigate();

  const [api, contextHolder] = notification.useNotification({
    duration: 1.5,
  });
  // const [messageApi, contextHolder] = imessage.useMessage();
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

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/comp.gif";
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
            zIndex: 1,
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
  return <AntdApp><App /></AntdApp>
}
export default AppWithProvider;
