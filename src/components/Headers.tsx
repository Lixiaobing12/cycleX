import { Drawer, Dropdown, Menu, MenuProps, Space } from "antd";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { modalContext } from "../App";
import { DrawerShow } from "../atom/menu";
import { userInfo_atom } from "../atom/userInfo";
import useLocalStorage from "../hooks/localStorage";
import { request } from "../utils/request";
import WrapperImg from "./Common/Img";

const HeaderComponent = () => {
  const location = useLocation();
  const accessToken = useLocalStorage();
  const navigate = useNavigate();
  const [users, setUsersInfo] = useAtom(userInfo_atom);
  const [openMenu, setOpenMenu] = useAtom(DrawerShow);
  const [modal] = useAtom(modalContext);
  const invite_img = useRef("");
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

  const accountItems: MenuProps["items"] = useMemo(() => {
    return users?.user_type === 1
      ? [
        { label: t("wallet"), icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
        { label: t("Invite"), icon: <img src="/assets/users.png" width={12} />, key: "users", onClick: () => invite() },
        {
          label: t("Logout"),
          icon: <img src="/assets/exit.png" width={12} />,
          key: "exit",
          onClick: () => {
            window.localStorage.removeItem("token");
            const setItemEvent = new Event("localstorage_save");
            window.dispatchEvent(setItemEvent);
            setTimeout(() => {
              navigate("/login");
            }, 200);
          },
        },
      ]
      : [
        // {
        //   label: t("Certification"),
        //   icon: (
        //     <div className="flex items-center">
        //       <img src="/assets/risk.png" width={15} alt="" />
        //     </div>
        //   ),
        //   key: "realName",
        //   onClick: () => navigate("/verify"),
        // },
        { label: t("wallet"), icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
        { label: t("Invite"), icon: <img src="/assets/users.png" width={12} />, key: "users", onClick: () => invite() },
        {
          label: t("Logout"),
          icon: <img src="/assets/exit.png" width={12} />,
          key: "exit",
          onClick: () => {
            window.localStorage.removeItem("token");
            const setItemEvent = new Event("localstorage_save");
            window.dispatchEvent(setItemEvent);
            setTimeout(() => {
              navigate("/login");
            }, 200);
          },
        },
      ];
  }, [users, t]);

  const MobileRouterItems: MenuProps["items"] = [
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
        navigate("/#fund");
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
    {
      label: t("Airdrop"),
      key: "Airdrop",
      onClick: () => {
        navigate("/airdrop");
        setOpenMenu(false);
      },
    },
    // {
    //   label: <div className="flex gap-2 items-center">
    //     IDO
    //     <div><img src="/assets/hot.png" width={20} alt="" /></div>
    //   </div>,
    //   key: "IDO",
    //   onClick: () => {
    //     navigate("/ido");
    //     setOpenMenu(false);
    //   },
    // },
  ];

  const MobileActiveItems: MenuProps["items"] = [
    {
      label: t("Download"),
      key: "download",
      icon: <WrapperImg src="/assets/download-light.png" />,
      onClick: () => {
        setOpenMenu(false);
        navigate("/#download");
      },
    },
    {
      label: t("Contact us"),
      key: "Contact us",
      icon: <WrapperImg src="/assets/phone-light.png" />,
      onClick: () => {
        setOpenMenu(false);
        navigate("/#footer");
      },
    },
    {
      label: t("Email"),
      key: "Email",
      icon: <WrapperImg src="/assets/email-light.png" />,
      onClick: () => {
        setOpenMenu(false);
        navigate("/#footer");
      },
    },
    {
      label: t("Language"),
      icon: <WrapperImg src="/assets/lang-light.png" />,
      key: "Language",
      children: items,
    },
  ];

  const MobileAccountActiveItems: MenuProps["items"] = useMemo(() => {
    return users?.user_type === 1
      ? [
        {
          label: t("wallet"),
          icon: <WrapperImg src="/assets/wallet-light.png" />,
          key: "wallet",
          onClick: () => {
            setOpenMenu(false);
            navigate("/wallet");
          },
        },
        { label: t("Invite"), icon: <WrapperImg src="/assets/invite-light.png" />, key: "users" },
      ]
      : [
        // {
        //   label: t("Certification"),
        //   icon: <WrapperImg src="/assets/warning-light.png" />,
        //   key: "realName",
        //   onClick: () => {
        //     setOpenMenu(false);
        //     navigate("/verify");
        //   },
        // },
        {
          label: t("wallet"),
          icon: <WrapperImg src="/assets/wallet-light.png" />,
          key: "wallet",
          onClick: () => {
            setOpenMenu(false);
            navigate("/wallet");
          },
        },
        {
          label: t("Invite"),
          icon: <WrapperImg src="/assets/invite-light.png" />,
          key: "users",
          onClick: () => {
            setOpenMenu(false);
            invite();
          },
        },
      ];
  }, [users, t]);

  const invite = async () => {
    const context: any = modal?.info({
      closable: false,
      icon: <></>,
      onCancel: () => context.destroy(),
      title: null,
      modalRender: () => (
        <div className="w-full flex flex-col items-center pointer-events-auto">
          <button className="btn btn-circle mb-2 bg-black border-0 btn-sm hover:bg-black hover:scale-105" onClick={() => context.destroy()}>
            <img src="/assets/x.png" width={26} alt="" />
          </button>
          <img src={invite_img.current} alt="" className="w-[320px] md:w-[380px]" />

          <a href={invite_img.current} download target="_blank">
            <button className="btn btn-wide  mt-2">{t("Download")}</button>
          </a>
        </div>
      ),
      centered: true,
      footer: null,
    });
  };

  useEffect(() => {
    if (accessToken) {
      request.post("/api/api/my/getMyInfo").then(({ data }) => {
        setUsersInfo(data.data);
      });
      request.post("/api/api/my/getInvite").then(({ data }) => {
        invite_img.current = data.data;
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (location.hash) {
      const anchorElement = document.querySelector(location.hash);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <div className="w-full leading-10 font-bold font-whalebold p-4 flex justify-between items-center md:justify-around border-b border-transblack md:px-[4%] 2xl:px-[10%] pt-6">
        <div className="inline-flex md:justify-end md:items-center cursor-pointer gap-1" onClick={() => navigate("/")}>
          <div><img src="/assets/loader.png" className="" width={30} height={30} alt="" /></div>
          <span className="font-bold text-2xl font-whalebold">CycleX</span>
        </div>
        <div className="hidden md:flex md:flex-1 md:leading-[3] md:ml-20">
          <Space size="large">
            <div className="cursor-pointer hover:scale-105" onClick={() => navigate("/#fund")}>
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
            {/* <div className="cursor-pointer  hover:scale-105 flex items-center gap-1" onClick={() => navigate("/ido")}>
              IDO
              <img src="/assets/hot.png" width={15} alt="" />
            </div> */}
          </Space>
        </div>
        <div className="hidden md:flex text-right mr-10">
          <Space size="large">
            {users && accessToken ? (
              <Dropdown menu={{ items: accountItems }}>
                <a onClick={(e) => e.preventDefault()} className="flex items-center">
                  {users.avatar && <img src={users.avatar} width={32} className="mr-2 rounded-full" alt="" />}
                  {users.email?.replace(/^(.{2}).*(.{10})$/, "$1...$2") ?? users.mobile}
                  <div className="mt-1 ml-1">
                    <img src="/assets/down.png" width={15} alt="" />
                  </div>
                </a>
              </Dropdown>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  {t("Sign in")}
                </div>
                <button className="btn btn-sm bg-black text-white rounded-md" onClick={() => navigate("/login?t=up")}>
                  {t("Sign up")}
                </button>
              </>
            )}
          </Space>
        </div>
        <div className="hidden md:flex">
          <div className="rounded-full border border-transblack p-2 px-4 h-[37px] w-fit flex gap-4">
            <WrapperImg src="/assets/download.png" onClick={() => navigate("/#download")} />
            <WrapperImg src="/assets/phone.png" onClick={() => navigate("/#footer")} />
            <WrapperImg src="/assets/email.png" onClick={() => navigate("/#footer")} />
            <Dropdown menu={{ items }}>
              <div onClick={(e) => e.preventDefault()}>
                <WrapperImg src="/assets/lang.png" />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="flex-[2] md:hidden flex justify-end">
          <img src="/assets/menu.png" width={30} onClick={() => setOpenMenu(true)} />
        </div>
      </div>
      <Drawer
        destroyOnClose
        placement="right"
        width="70vw"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        styles={{
          body: {
            padding: 0,
            border: 0,
            background: "#000",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}>
        <div className="my-6 flex justify-between px-6">
          <img src="/assets/icon.png" width={30} />
          <img src="/assets/x.png" width={30} onClick={() => setOpenMenu(false)} />
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          <Menu mode="inline" items={MobileRouterItems} theme="dark" />
          <div className="flex flex-col text-white h-full justify-end">
            {users && accessToken && (
              <>
                <Menu mode="inline" items={MobileAccountActiveItems} theme="dark" />
                <div className="divider my-0"></div>
              </>
            )}
            <Menu mode="inline" items={MobileActiveItems} theme="dark" />
            <div className="p-4">
              {users && accessToken ? (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {users.avatar && <img src={users.avatar} width={20} className="mr-2 rounded-full" alt="" />}
                    {users.email?.replace(/^(.{2}).*(.{10})$/, "$1...$2") ?? users.mobile}
                  </div>
                  <button
                    className="btn btn-sm rounded-full bg-black border-grey text-white"
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      const setItemEvent = new Event("localstorage_save");
                      window.dispatchEvent(setItemEvent);
                      setTimeout(() => {
                        navigate("/login");
                      }, 200);
                    }}>
                    {t("Logout")}
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="btn btn-sm rounded-full bg-white text-black flex-1"
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/login?t=in");
                    }}>
                    {t("Sign in")}
                  </button>
                  <button
                    className="btn btn-sm rounded-full bg-black border-grey flex-1 text-white"
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/login?t=up");
                    }}>
                    {t("Sign up")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default HeaderComponent;
