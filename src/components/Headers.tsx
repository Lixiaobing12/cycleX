import { DownOutlined, WarningOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { Dropdown, MenuProps, Space } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DrawerShow } from "../atom/menu";
import useLocalStorage from "../hooks/localStorage";
import { UserInfoType } from "../types/user";
import { utilAnchor } from "../utils/anchor";
import { request } from "../utils/request";
import WrapperImg from "./Common/Img";


const HeaderComponent = () => {
  const accessToken = useLocalStorage();
  const navigate = useNavigate();
  const [users, setUsersInfo] = useState<UserInfoType>();
  const [openMenu, setOpenMenu] = useAtom(DrawerShow);
  // const { openConnectModal } = useConnectModal();
  // const { address, isConnected } = useAccount();

  const items: MenuProps["items"] = [
    { label: "简体中文", key: "zh" },
    { label: "English", key: "en" },
  ];

  const accountItems: MenuProps["items"] = [
    {
      label: "实名认证",
      icon: (
        <div className="flex items-center">
          <Icon size={15}>
            <WarningOutlined />
          </Icon>
        </div>
      ),
      key: "realName",
      onClick: () => navigate("/verify"),
    },
    { label: "钱包", icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
    { label: "邀请好友", icon: <img src="/assets/users.png" width={12} />, key: "users" },
    {
      label: "退出登录",
      icon: <img src="/assets/exit.png" width={12} />,
      key: "exit",
      onClick: () => {
        window.localStorage.removeItem("token");
        const setItemEvent = new Event("localstorage_save");
        window.dispatchEvent(setItemEvent);
      },
    },
  ];
  const anchor = (id: string = "fund") => {
    navigate("/");
    utilAnchor(id);
  };

  useEffect(() => {
    if (accessToken) {
      request.post("/api/api/my/getMyInfo").then(({ data }) => {
        setUsersInfo(data.data);
      });
    }
  }, [accessToken]);
  return (
    <>
      <div className="w-full leading-10 font-bold font-whalebold p-4 flex justify-between items-center md:justify-around border-b border-transblack  md:px-[10%]">
        <div className="flex md:justify-end md:items-center">
          <img src="/assets/avant.png" className="cursor-pointer w-36" alt="" onClick={() => navigate("/")} />
        </div>
        <div className="hidden md:flex md:flex-1 md:leading-[3] md:ml-20">
          <Space size="large">
            <div className="cursor-pointer hover:scale-105" onClick={() => anchor()}>
              基金
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/guide")}>
              新手指南
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/issus")}>
              资产发行
            </div>
          </Space>
        </div>
        <div className="hidden md:flex text-right mr-10">
          <Space size="large">
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={32} className="mr-2 rounded-full" alt="" />}
                  {users.email.replace(/^(.{2}).*(.{10})$/, "$1...$2")}
                  <div className="mt-1 ml-1">
                    <Icon size={12}>
                      <DownOutlined />
                    </Icon>
                  </div>
                </a>
              </Dropdown>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  登录
                </div>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
                  注册
                </div>
              </>
            )}
          </Space>
        </div>
        <div className="hidden md:flex">
          <div className="rounded-full border border-transblack p-2 px-4 h-[37px] w-fit flex gap-4">
            <WrapperImg src="/assets/download.png" onClick={() => anchor("download")} />
            <WrapperImg src="/assets/phone.png" onClick={() => anchor("footer")} />
            <WrapperImg src="/assets/email.png" onClick={() => anchor("footer")} />
            <Dropdown menu={{ items }}>
              <WrapperImg src="/assets/lang.png" onClick={(e) => e.preventDefault()} />
            </Dropdown>
          </div>
        </div>
        <div className="flex-[2] md:hidden text-right">
          <Space>
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={20} className="mr-2 rounded-full" alt="" />}
                  {users.email.replace(/^(.{2}).*(.{10})$/, "$1...$2")}
                  <div className="mt-1 ml-1">
                    <Icon size={12}>
                      <DownOutlined />
                    </Icon>
                  </div>
                </a>
              </Dropdown>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  登录
                </div>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
                  注册
                </div>
              </>
            )}
            <Dropdown menu={{ items }}>
              <WrapperImg src="/assets/lang.png" width={20} onClick={(e) => e.preventDefault()} />
            </Dropdown>
            {openMenu ? <img src="/assets/close.png" width={20} onClick={() => setOpenMenu(false)} /> : <img src="/assets/menu.png" width={20} onClick={() => setOpenMenu(true)} />}
          </Space>
        </div>
      </div>
    </>
  );
};
export default HeaderComponent;
