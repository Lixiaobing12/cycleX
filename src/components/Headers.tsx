import { Drawer, Dropdown, Menu, MenuProps, Space } from "antd";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { messageContext, modalContext } from "../App";
import { DrawerShow } from "../atom/menu";
import { userInfo_atom } from "../atom/userInfo";
import useLocalStorage from "../hooks/localStorage";
import { request } from "../utils/request";
import WrapperImg from "./Common/Img";
import { useWindowSize } from "usehooks-ts";

const HeaderComponent = () => {
  const location = useLocation();
  const accessToken = useLocalStorage();
  const navigate = useNavigate();
  const [users, setUsersInfo] = useAtom(userInfo_atom);
  const [toast, setMessage] = useAtom(messageContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [modal] = useAtom(modalContext);
  const invite_img = useRef("");
  // const { openConnectModal } = useConnectModal();
  // const { address, isConnected } = useAccount();
  const { t, i18n } = useTranslation();
  const { width } = useWindowSize();
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
        { label: t("Wallet"), icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
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
        { label: t("Wallet"), icon: <img src="/assets/wallet.png" width={12} />, key: "wallet", onClick: () => navigate("/wallet") },
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
      label: t("Invest"),
      key: "fund",
      onClick: () => {
        navigate("/#fund");
        setOpenMenu(false);
      },
    },
    {
      label: t("Docs"),
      key: "guide",
      onClick: () => {
        navigate("/guide");
        setOpenMenu(false);
      },
    },
    // {
    //   label: t("$WFC TOKEN"),
    //   key: "wfc",
    //   onClick: () => {
    //     navigate("/wfc");
    //     setOpenMenu(false);
    //   },
    // },

    // {
    //   label: t("About"),
    //   key: "issus",
    //   onClick: () => {
    //     navigate("/issus");
    //     setOpenMenu(false);
    //   },
    // },
    // {
    //   label: <img src="/assets/airdrop-btn.png" className="rounded-lg" />,
    //   key: "Airdrop",
    //   onClick: () => {
    //     navigate("/blindbox");
    //     setOpenMenu(false);
    //   },
    // },
    {
      label: <img src="/assets/blindbox-btn.png" className="w-full" />,
      key: "Mystery Box",
      onClick: () => {
        navigate("/blindbox");
        setOpenMenu(false);
      },
      style: {
        marginTop: "20px",
      },
    },
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
    // {
    //   label: t("Connect Wallet"),
    //   icon: <WrapperImg src="/assets/connection.png" width={15} />,
    //   key: "connectWallet",
    //   onClick: () => {
    //     toast?.warning({ message: t("Waiting for upgrade..."), icon: <img src="/assets/error.png" width={30} /> });
    //   },
    // },
  ];

  const MobileAccountActiveItems: MenuProps["items"] = useMemo(() => {
    return users?.user_type === 1
      ? [
        {
          label: t("Wallet"),
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
          label: t("Wallet"),
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
    navigate("/blindbox");

    // const invite_url = window.location.href + "?code=" + users?.referral_code;
    // const context: any = modal?.info({
    //   closable: false,
    //   icon: <></>,
    //   onCancel: () => context.destroy(),
    //   title: null,
    //   modalRender: () => (
    //     <div className="w-full flex flex-col items-center pointer-events-auto bg-white rounded-box relative py-10 px-6">
    //       <button className="absolute top-4 right-4 btn btn-circle mb-2 bg-black border-0 btn-sm hover:bg-black hover:scale-105" onClick={() => context.destroy()}>
    //         <img src="/assets/x.png" width={20} alt="" />
    //       </button>
    //       <div className="text-xl">Share link</div>
    //       <input type="text" value={invite_url} className="bg-white text-black border rounded-lg w-full my-4 py-1 px-2" />
    //       <button className="btn btn-sm rounded-full bg-black text-white text-normal">{t("COPY")}</button>
    //     </div>
    //   ),
    //   centered: true,
    //   footer: null,
    // });
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
      <div className="w-full leading-10 font-bold font-whalebold p-4 flex justify-between items-center md:justify-around border-b border-transblack md:px-[4%] 2xl:px-[10%] pt-6 gap-6">
        <div className="inline-flex md:justify-end md:items-center cursor-pointer gap-1" onClick={() => navigate("/")}>
          <div>
            <img src="/assets/loader.png" className="" width={30} height={30} alt="" />
          </div>
          <span className="font-bold text-2xl font-whalebold">CycleX</span>
        </div>
        <div className="hidden md:flex md:flex-1 md:leading-[3] ml-6 xl:ml-16 gap-10">
          <div className={`cursor-pointer hover:scale-105 leading-normal flex items-center	${location.pathname === "/" && "underline"}`} onClick={() => navigate("/#fund")}>
            {t("Invest")}
          </div>
          <div className={`cursor-pointer  hover:scale-105 leading-normal flex items-center xl:w-fit ${location.pathname === "/guide" && "underline"}`} onClick={() => navigate("/guide")}>
            {t("Docs")}
          </div>
          {/* <div className={`cursor-pointer  hover:scale-105 leading-normal flex items-center xl:w-fit ${location.pathname === "/wfc" && "underline"}`} onClick={() => navigate("/wfc")}>
            {t("$WFC TOKEN")}
          </div> */}
          {/* <div className="cursor-pointer leading-normal xl:w-fit" onClick={() => navigate("/blindbox")}>
            <img src="/assets/airdrop-btn.png" width={120} />
          </div> */}
          <div className="cursor-pointer leading-normal xl:w-fit ml-auto" onClick={() => navigate("/blindbox")}>
            <img src="/assets/blindbox-btn.png" width={170} />
          </div>
        </div>
        <div className="hidden md:flex text-right mr-10">
          <Space size="large">
            {users && accessToken ? (
              <>
                <Dropdown menu={{ items: accountItems }}>
                  <div onClick={(e) => e.preventDefault()} className="flex items-center cursor-pointer">
                    {users.avatar && <img src={users.avatar} width={32} className="mr-2 rounded-full" alt="" />}
                    {users.email?.replace(/^(.{2}).*(.{10})$/, "$1...$2") ?? users.mobile}
                    <div className="mt-1 ml-1">
                      <img src="/assets/down.png" width={15} alt="" />
                    </div>
                  </div>
                </Dropdown>
                {/* <button
                  className="btn btn-sm bg-black text-white rounded-md border-0"
                  onClick={() => {
                    toast?.warning({ message: t("Waiting for upgrade..."), icon: <img src="/assets/error.png" width={30} /> });
                  }}>
                  {t("Connect Wallet")}
                </button> */}
              </>
            ) : (
              <>
                <div className="cursor-pointer  hover:scale-105" onClick={() => navigate("/login?t=in")}>
                  {t("Sign in")}
                </div>
                <button className="btn btn-sm bg-black text-white rounded-md border-0" onClick={() => navigate("/login?t=up")}>
                  {t("Sign up")}
                </button>
                {/* <button
                  className="btn btn-sm bg-black text-white rounded-md border-0"
                  onClick={() => {
                    toast?.warning({ message: t("Waiting for upgrade..."), icon: <img src="/assets/error.png" width={30} /> });
                  }}>
                  {t("Connect Wallet")}
                </button> */}
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
        placement="right"
        width="70vw"
        closable={false}
        onClose={() => setOpenMenu(false)}
        forceRender
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
                    className="btn btn-sm rounded-full bg-black border-grey text-white border-0"
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
                <>
                  <div className="flex gap-4">
                    <button
                      className="btn btn-sm rounded-full bg-white text-black flex-1 border-0"
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/login?t=in");
                        }, 200);
                        setOpenMenu(false);
                      }}>
                      {t("Sign in")}
                    </button>
                    <button
                      className="btn btn-sm rounded-full bg-black border-grey flex-1 text-white border-0"
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/login?t=up");
                        }, 100);
                        setOpenMenu(false);
                      }}>
                      {t("Sign up")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default HeaderComponent;
