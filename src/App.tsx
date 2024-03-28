import { Drawer, Menu, MenuProps, Modal, message as imessage } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { HookAPI } from "antd/es/modal/useModal";
import { atom, useAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { DrawerShow } from "./atom/menu";
import Footers from "./components/Footers";
import HeaderComponent from "./components/Headers";
import RouterProviders from "./router";
import { utilAnchor } from "./utils/anchor";

export const messageContext = atom<MessageInstance | null>(null);
export const modalContext = atom<HookAPI | null>(null);

function App() {
  const [open, setDrawOpen] = useAtom(DrawerShow);
  const anchor = (id: string = "fund") => {
    navigate("/");
    utilAnchor(id);
  };
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: "首页",
      key: "home",
      onClick: () => {
        navigate("/");
        setDrawOpen(false);
      },
    },
    {
      label: "基金",
      key: "fund",
      onClick: () => {
        anchor();
        setDrawOpen(false);
      },
    },
    {
      label: "新手指南",
      key: "guide",
      onClick: () => {
        navigate("/guide");
        setDrawOpen(false);
      },
    },
    {
      label: "资产发行",
      key: "issus",
      onClick: () => {
        navigate("/issus");
        setDrawOpen(false);
      },
    },
  ];

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
      <div className="relative">
        <RouterProviders />
        <div style={{ display: router.pathname === "/login" ? "none" : "inherit" }}>
          <Footers />
        </div>
        <Drawer
          placement="top"
          height="auto"
          closable={false}
          onClose={() => setDrawOpen(false)}
          open={open}
          getContainer={false}
          styles={{
            body: {
              padding: 0,
              border: 0,
            },
          }}>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Drawer>
      </div>
      {contextHolder}
      {modalContextHolder}
    </div>
  );
}

export default App;
