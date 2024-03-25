import { DownOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { Drawer, Dropdown, MenuProps, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/localStorage";
import { request } from "../utils/request";
import WrapperImg from "./Common/Img";

type UserInfoType = {
  avatar: string | null;
  created_at: string;
  email: string;
  email_verified_at: null | string;
  id: number;
  ip: null | string;
  last_online_at: string;
  mobile: null | string;
  mobile_prefix: null | string;
  name: string;
  referral_code: string;
  referrer_id: number;
  risk_type: number;
  security_password_flag: number;
  status: number;
  updated_at: string;
  user_level_id: number;
  user_pv: number;
  user_type: number;
};
const HeaderComponent = () => {
  const accessToken = useLocalStorage();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [users, setUsersInfo] = useState<UserInfoType>();
  const [openMenu, setOpenMenu] = useState(false);
  // const { openConnectModal } = useConnectModal();
  // const { address, isConnected } = useAccount();

  const items: MenuProps["items"] = [
    { label: "简体中文", key: "zh" },
    { label: "English", key: "en" },
  ];

  const accountItems: MenuProps["items"] = [
    { label: "钱包", icon: <img src="/assets/wallet.png" width={12} />, key: "wallet" },
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
  const animationToAnchor = (startNum: number, stopNum: number) => {
    var nowNum = startNum + stopNum / (startNum + 10) + 20; // 步进为10

    if (nowNum > stopNum) {
      nowNum = stopNum;
    }

    // 缓动方法
    window.requestAnimationFrame(function () {
      document.documentElement.scrollTop = nowNum; // 当前示例页面，滚动条在body，所以滚动body
      // 滚动到预定位置则结束
      if (nowNum == stopNum) {
        return;
      }
      animationToAnchor(nowNum, stopNum); // 只要还符合缓动条件，则递归调用
    });
  };
  const anchor = (id: string = "fund") => {
    navigate("/");
    setTimeout(() => {
      const fund_top = document.getElementById(id)!.getBoundingClientRect().top;
      const screenTop = document.documentElement.scrollTop;
      animationToAnchor(screenTop, fund_top + screenTop);
    }, 100);
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
      <div className="w-full leading-10 font-bold p-4 flex justify-between md:justify-around">
        <div className="flex-1 md:flex md:justify-end md:items-center">
          <img src="/assets/avant.png" className="cursor-pointer w-36" alt="" onClick={() => navigate("/")} />
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-1 overflow-hidden md:leading-[3] md:ml-20">
          <Space size="large">
            <div className="cursor-pointer hover:scale-105" onClick={() => anchor()}>
              基金
            </div>
            <div className="cursor-pointer  hover:scale-105">新手指南</div>
            <div className="cursor-pointer  hover:scale-105">资产发行</div>
          </Space>
        </div>
        <div className="w-0 h-0 md:h-auto md:flex-[2] text-right mr-4 overflow-hidden">
          <Space size="large">
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={32} className="mr-2 rounded-full" alt="" />}
                  {users.email.replace(/^(.{2}).*(.{6})$/, "$1...$2")}
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
        <div className="w-0 h-0 md:h-auto md:flex-1 overflow-hidden">
          <Space className="rounded-full border p-2 px-4 h-[37px]" size="large">
            <WrapperImg src="/assets/download.png" onClick={() => anchor("download")} />
            <WrapperImg src="/assets/phone.png" onClick={() => anchor("footer")} />
            <WrapperImg src="/assets/email.png" onClick={() => anchor("footer")} />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" />
              </a>
            </Dropdown>
          </Space>
        </div>
        <div className="flex-[2] md:grow-0 overflow-hidden text-right md:w-0 md:h-0">
          <Space size="large">
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={20} className="mr-2 rounded-full" alt="" />}
                  {users.email.replace(/^(.{2}).*(.{6})$/, "$1...$2")}
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
              <a onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" width={20} />
              </a>
            </Dropdown>
            {openMenu ? <img src="/assets/close.png" width={20} onClick={() => setOpenMenu(false)} /> : <img src="/assets/menu.png" width={24} onClick={() => setOpenMenu(true)} />}
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
