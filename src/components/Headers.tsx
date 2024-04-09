import { DownOutlined, WarningOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { Drawer, Dropdown, Menu, MenuProps, Space } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const items: MenuProps["items"] = [
    {
      label: "中文",
      key: "zh",
      onClick: () => {
        i18n.changeLanguage("zh");
      },
    },
    {
      label: "English",
      key: "en",
      onClick: () => {
        i18n.changeLanguage("en");
      },
    },
  ];

  const accountItems: MenuProps["items"] = [
    {
      label: t("Certification"),
      icon: (
        <div className="flex items-center">
          <Icon size={15}>
            <WarningOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </Icon>
        </div>
      ),
      key: "realName",
      onClick: () => navigate("/verify"),
    },
    { label: t("wallet"), icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
    { label: t("Invite"), icon: <img src="/assets/users.png" width={12} />, key: "users" },
    {
      label: t("Logout"),
      icon: <img src="/assets/exit.png" width={12} />,
      key: "exit",
      onClick: () => {
        window.localStorage.removeItem("token");
        const setItemEvent = new Event("localstorage_save");
        window.dispatchEvent(setItemEvent);
      },
    },
  ];

  const MobileItems: MenuProps["items"] = [
    {
      label: t("Home"),
      key: "home",
      onClick: () => {
        navigate("/");
        setOpenMenu(false);
      },
    },
    {
      label: t("Fund"),
      key: "fund",
      onClick: () => {
        anchor();
        setOpenMenu(false);
      },
    },
    {
      label: t("Newbie Guide"),
      key: "guide",
      onClick: () => {
        navigate("/guide");
        setOpenMenu(false);
      },
    },
    {
      label: t("Asset Backed Securities"),
      key: "issus",
      onClick: () => {
        navigate("/issus");
        setOpenMenu(false);
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
              {t("Fund")}
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/guide")}>
              {t("Newbie Guide")}
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/issus")}>
              {t("Asset Backed Securities")}
            </div>
            <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/airdrop")}>
              {t("Airdrop")}
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
                      <DownOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </Icon>
                  </div>
                </a>
              </Dropdown>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  {t("Sign in")}
                </div>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
                  {t("Sign up")}
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
              <div onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="flex-[2] md:hidden flex justify-end">
          {/* <Space>
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={20} className="mr-2 rounded-full" alt="" />}
                  {users.email.replace(/^(.{2}).*(.{10})$/, "$1...$2")}
                  <div className="mt-1 ml-1">
                    <Icon size={12}>
                      <DownOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </Icon>
                  </div>
                </a>
              </Dropdown>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  {t("Sign in")}
                </div>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=up")}>
                  {t("Sign up")}
                </div>
              </>
            )}
            <Dropdown menu={{ items }}>
              <WrapperImg src="/assets/lang.png" width={20} onClick={(e) => e.preventDefault()} />
            </Dropdown>
          </Space> */}
          <img src="/assets/menu.png" width={30} onClick={() => setOpenMenu(true)} />
        </div>
      </div>
      <Drawer
        placement="right"
        height="auto"
        width="70vw"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        getContainer={false}
        styles={{
          body: {
            padding: 0,
            border: 0,
            background: "#000",
          },
        }}>
        <div className="mt-4 flex justify-between px-6">
          <img src="/assets/icon.png" width={30} />
          <img src="/assets/menu-white.png" width={30} />
        </div>
        <Menu mode="inline" items={MobileItems} theme="dark" />
      </Drawer>
    </>
  );
};
export default HeaderComponent;
