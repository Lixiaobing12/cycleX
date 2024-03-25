import { Drawer, Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WrapperImg from "./Common/Img";

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const { openConnectModal } = useConnectModal();
  // const { address, isConnected } = useAccount();

  const items: MenuProps["items"] = [
    { label: "简体中文", key: "zh" },
    { label: "English", key: "en" },
  ];

  return (
    <>
      <div className="w-full leading-10 font-bold p-4 flex justify-between md:justify-around">
        <div className="flex-1 md:flex md:justify-end md:items-center">
          <img src="/assets/avant.png" className="cursor-pointer w-36" alt="" onClick={() => navigate("/")} />
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-1 overflow-hidden md:leading-[3] md:ml-20">
          <Space size="large">
            <div className="cursor-pointer hover:scale-105">基金</div>
            <div className="cursor-pointer  hover:scale-105">新手指南</div>
            <div className="cursor-pointer  hover:scale-105">资产发行</div>
          </Space>
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-[2] text-right mr-4 overflow-hidden">
          <Space size="large">
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
              登录
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
              注册
            </div>
          </Space>
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-1 overflow-hidden">
          <Space className="rounded-full border p-2 px-4 h-[37px]" size="large">
            <WrapperImg src="/assets/download.png" />
            <WrapperImg src="/assets/phone.png" />
            <WrapperImg src="/assets/email.png" />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" />
              </a>
            </Dropdown>
          </Space>
        </div>
        <div className="flex-[2] md:grow-0 overflow-hidden text-right md:w-0 md:h-0">
          <Space size="large">
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
              登录
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
              注册
            </div>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" width={20} />
              </a>
            </Dropdown>
          </Space>
        </div>
      </div>
      <Drawer placement="right" closable={false} onClose={() => setOpen(false)} open={open}>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default HeaderComponent;
