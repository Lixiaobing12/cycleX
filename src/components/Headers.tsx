import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Drawer, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();

  return (
    <>
      <div className="w-full leading-10 font-bold p-4 flex justify-between md:justify-around">
        <div className="flex-1 md:flex md:justify-end md:items-center">
          <img src="/assets/avant.png" className="cursor-pointer w-36 h-[37px]" alt="" onClick={() => navigate("/")} />
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
            <div className="cursor-pointer  hover:scale-105">登录</div>
            <div className="cursor-pointer  hover:scale-105">注册</div>

            {isConnected ? (
              <a className="flex items-center border rounded-full px-4 h-[37px]">
                <img src="/assets/icon.png" width={30} />
                {address?.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
              </a>
            ) : (
              <div className="cursor-pointer  hover:scale-105" onClick={openConnectModal}>
                链接钱包
              </div>
            )}
          </Space>
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-1 overflow-hidden">
          <Space className="rounded-full border p-2 px-4 h-[37px]" size="large">
            <img className="cursor-pointer  hover:scale-105" src="/assets/download.png" width={20} alt="" />
            <img className="cursor-pointer  hover:scale-105" src="/assets/phone.png" width={20} alt="" />
            <img className="cursor-pointer  hover:scale-105" src="/assets/email.png" width={20} alt="" />
            <img className="cursor-pointer  hover:scale-105" src="/assets/lang.png" width={20} alt="" />
          </Space>
        </div>
        <div className="flex-[2] md:grow-0 overflow-hidden text-right md:w-0 md:h-0">
          <Space size="large">
            {isConnected ? (
              <a className="flex items-center border rounded-full px-4">
                <img src="/assets/icon.png" width={30} />
                {address?.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
              </a>
            ) : (
              <div className="cursor-pointer  hover:scale-105" onClick={openConnectModal}>
                链接钱包
              </div>
            )}
            <img className="cursor-pointer  hover:scale-105" src="/assets/lang.png" width={20} alt="" />
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
