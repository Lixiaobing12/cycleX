import { CaretRightOutlined, CloseCircleOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { Avatar, Collapse, CollapseProps, Divider, List, Table, TableProps } from "antd";
import { useAtom } from "jotai";
import BulletJs from "js-bullets";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard, useWindowSize } from "usehooks-ts";
import { messageContext, modalContext } from "../App";
import WrapperImg from "../components/Common/Img";
import useLocalStorage from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { request } from "../utils/request";
import { useTranslation } from "react-i18next";

let CloseCircleOutlineds = CloseCircleOutlined as any;
let page = 1;

const Loader = () => {
  const [picture, setPicture] = useState("");

  useEffect(() => {
    let index = 1;
    const timer = setInterval(() => {
      setPicture(`/assets/loading${index}.png`);
      index++;
      if (index > 3) index = 1;
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <img src={picture} alt="" style={{ width: "200px", height: "43px" }} />;
};

const AppendLotteryUserRecordComponent = () => {
  const [userLotteryList, setUserLotteryList] = useState<any[]>([]);
  const [, account] = useAccounts();
  const { t } = useTranslation();
  const columns: TableProps["columns"] = [
    {
      title: t("Rewards num"),
      key: "Amount",
      render: ({ Amount }) => <span>{Amount} WFC</span>,
    },
    {
      title: t("Rewards time"),
      key: "CreatedAt",
      render: ({ CreatedAt }) => <span>{moment(CreatedAt).format("MM/DD HH:mm")}</span>,
    },
  ];
  const getData = () => {
    if (account?.id) {
      request
        .post("/sapi/lottery/list", {
          UserId: account?.id,
          unlock: false,
          Page: 1,
          Size: 9999,
        })
        .then(({ data }) => {
          const newdata = new Set<any>(data.data);
          setUserLotteryList(Array.from(newdata));
        });
    } else {
      setTimeout(getData, 1000);
    }
  };
  getData();
  return (
    // <List>
    //   <VirtualList data={userLotteryList} height={400} itemHeight={47} itemKey="email">
    //     {(item) => (
    //       <List.Item extra={<span>{moment(item.CreatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>}>
    //         <List.Item.Meta
    //           title={
    //             <div className="flex gap-1">
    //               <span className="text-bold">+{item.Amount}</span>
    //               <span className="text-greyblack">WFC</span>
    //             </div>
    //           }
    //         />
    //       </List.Item>
    //     )}
    //   </VirtualList>
    // </List>
    <Table columns={columns} dataSource={userLotteryList} pagination={false} className="w-full" />
  );
};

const BlindBox = () => {
  const navigate = useNavigate();
  const [, account] = useAccounts();
  const [, copy] = useCopyToClipboard();
  const accessToken = useLocalStorage();
  const [toast] = useAtom(messageContext);
  const [openStatus, setOpenStatus] = useState(false);
  const [modal] = useAtom(modalContext);
  const screenRef = useRef<any>();
  const { t } = useTranslation();
  const invite_img = useRef("");
  const { width } = useWindowSize();
  const [invite_url, setInviteUrl] = useState("");

  const [lotteryInfo, setLotteryInfo] = useState({
    LotteryNum: 0,
    Amount: 0,
    Login: false,
    Share: false,
    firstRecharge: false,
  });
  const [data, setData] = useState([
    { title: "Sign Up", content: "Users are given 1 lottery chance for completing registration.", avatar: "/assets/blindbox-tasks-1.png", done: true, times: 1 },
    { title: "Share To Friends", content: "Successful sharing rewards 1 time", avatar: "/assets/blindbox-tasks-2.png", done: false, times: 1 },
    { title: "First Recharge", content: "First recharge rewards 2 times", avatar: "/assets/blindbox-tasks-4.png", done: false, times: 2 },
    { title: "Invest In Products", content: "Invest more than $10 and unclock more times", avatar: "/assets/blindbox-tasks-3.png", done: false, times: 5 },
  ]);

  // const invite = async () => {
  //   const context: any = modal?.info({
  //     closable: false,
  //     icon: <></>,
  //     onCancel: () => context.destroy(),
  //     title: null,
  //     modalRender: () => (
  //       <div className="w-full flex flex-col items-center pointer-events-auto">
  //         <button className="btn btn-circle mb-2 bg-black border-0 btn-sm hover:bg-black hover:scale-105" onClick={() => context.destroy()}>
  //           <img src="/assets/x.png" width={26} alt="" />
  //         </button>
  //         <img src={invite_img.current} alt="" className="w-[320px] md:w-[380px]" />

  //         <a href={invite_img.current} download target="_blank">
  //           <button className="btn btn-wide  mt-2">{t("Download")}</button>
  //         </a>
  //       </div>
  //     ),
  //     centered: true,
  //     footer: null,
  //   });
  // };
  // const handleCopy = () => {
  // navigate("/blindbox")
  // invite();
  // copy("https://cyclex.cc")
  //   .then(() => {
  //     toast?.success({
  //       icon: <img src="/assets/success.png" width={30} />,
  //       message: "Copied!",
  //     });

  //   })
  //   .catch((error) => {
  //     console.error("Failed to copy!", error);
  //   });
  // };
  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast?.success({
          icon: <img src="/assets/success.png" width={30} />,
          message: "Copied!",
        });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  const handleOpen = () => {
    init();
    if (openStatus) return;
    setOpenStatus(true);
    request
      .post("/sapi/lottery/open", {
        BearerToken: "Bearer " + accessToken?.token,
      })
      .then(({ data }) => {
        init();
        setTimeout(() => {
          setOpenStatus(false);
          const context: any = modal?.info({
            closable: {
              closeIcon: (
                <Icon size={25}>
                  <CloseCircleOutlineds />
                </Icon>
              ),
            },
            icon: <></>,
            onCancel: () => context.destroy(),
            title: (
              <div className="text-center">
                <h1 className="w-full py-2 text-center text-xl">You Earned</h1>
                <div className="text-xl my-10">{data.data} WFC</div>
                <div>
                  <button className="btn btn-sm bg-black text-white rounded-full px-10" onClick={() => context.destroy()}>
                    OK
                  </button>
                </div>
              </div>
            ),
            content: <div className="bg-white rounded-box flex flex-col justify-center items-center"></div>,
            centered: true,
            footer: null,
            width: "375px",
          });
        }, 4500);
      });
  };

  const handleList = () => {
    const context: any = modal?.info({
      closable: {
        closeIcon: (
          <Icon size={18}>
            <img src="/assets/close_r.png" />
          </Icon>
        ),
      },
      icon: <></>,
      onCancel: () => context.destroy(),
      title: (
        <div className="text-center">
          <h1 className="w-full py-2 text-center text-xl">Records</h1>
        </div>
      ),
      content: <AppendLotteryUserRecordComponent />,
      centered: true,
      footer: null,
      width: "375px",
      height: "400px",
    });
  };

  const init = () => {
    if (account) {
      request
        .post("/sapi/lottery/info", {
          UserId: account?.id,
        })
        .then((res) => {
          setLotteryInfo(res.data.data);
          // setData((state) => {
          //   state[1].done = res.data.data.Share;
          //   return [...state];
          // });
        });
      request.get("/api/api/user/validUserFirstRecharge").then((res) => {
        setLotteryInfo((state) => ({ ...state, firstRecharge: res.data.data }));
        setData(state => {
          state[2].done = res.data.data;
          return [...state];
        })
      });
    } else {
      setTimeout(init, 1000);
    }
  };
  const getBullet = () => {
    request
      .post("/sapi/lottery/list", {
        unlock: false,
        Page: page,
        Size: 3,
      })
      .then(({ data }) => {
        if (data.data.length) {
          data.data.forEach((item: any) => {
            screenRef.current.push(`
                <div class="flex gap-2 items-center text-white bg-[rgba(255,255,255,0.1)] px-4 rounded-full py-1">
                    <img src="${item.Avatar}" width="25" class="rounded-full"/>
                    <span>${item.Email.replace(/^(.{3}).*(.{2}@.*\.com)$/, "$1***$2")}</span>won<span class="text-[#61f6ff]">${item.Amount}</span> WFC
                </div>`);
          });
          if (data.data.length < 8) {
            page = page + 1;
          } else {
            page = 1;
          }
        }
      });
  };
  useEffect(() => {
    init();
    setInviteUrl(window.location.origin + "?referral=" + account?.referral_code)
  }, [account]);
  useEffect(() => {
    screenRef.current = new BulletJs("#danmu-screen", { speed: 80, trackHeight: 50 });
    request.post("/api/api/my/getInvite").then(({ data }) => {
      invite_img.current = data.data;
    });
    init();
    getBullet();
    const interval = setInterval(init, 6000);
    const interval2 = setInterval(getBullet, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  return (
    <>
      <div className="bg-black bg-blindboxbgh5 bg-100 xl:bg-blindboxbg flex flex-col lg:flex-row justify-center items-center lg:items-start py-10 gap-14 lg:py-20">
        <div className="relative">
          {openStatus && (
            <div className="flex-center-col absolute">
              <div className="absolute top-0">
                <Loader />
              </div>
              <div className="w-full h-[60px]"></div>
              <img src="/assets/comp.gif" alt="" width={600} />;
            </div>
          )}
          <div className={`gap-4 pb-10 flex-center-col ${openStatus ? "opacity-0" : ""} justify-start`}>
            <img src={width > 600 ? "/assets/titlepc.png" : "/assets/titlemb.png"} alt="" width={width > 600 ? 700 : 300} className="max-w-[80vw]" />
            <div id="danmu-screen" className="w-full lg:w-[130%] h-[150px] "></div>
            <img src="/assets/box-shine.png" width={500} alt="" className="lg:my-[-30px]" />
            <div className={`relative flex-center gap-4 w-full`}>
              <div className="flex-center self-end flex bg-[rgb(33,31,33)] p-1 px-2 rounded-md" onClick={handleList}>
                <WrapperImg src="/assets/blindbox-coin.png" width={16} />
                <div className="flex flex-col justify-center items-start ml-2">
                  <span className="text-white">{lotteryInfo.Amount}</span>
                  <span className="text-grey text-xs">Earned WFC</span>
                </div>
              </div>
              <div className="flex-center-col w-fit">
                <div className="bg-blindboxpopbg bg-100 px-4 py-1 self-end mb-1 flex pb-2">+{lotteryInfo.LotteryNum} times</div>
                <a style={lotteryInfo.LotteryNum === 0 ? { pointerEvents: "none", filter: "brightness(0.5)" } : {}}>
                  <WrapperImg src="/assets/blindbox-btn-open.png" className="h-[50px]" width={200} onClick={handleOpen} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 lg:pt-0">
          <div className="w-full m-auto">
            <div className="bg-[transparent] text-white border border-[#555555] text-center py-2 rounded-lg text-lg">Lucky Tasks</div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item
                    extra={
                      item.done ? (
                        <img src="/assets/done.png" className="w-14" />
                      ) : (
                        <button
                          className="btn btn-sm hover:bg-black hover:scale-105 bg-black text-white rounded-full w-14"
                          onClick={() => {
                            if (index === 2) {
                              navigate("/wallet");
                            } else if (index === 3) {
                              navigate("/#fund");
                            }
                          }}>
                          +{item.times}
                        </button>
                      )
                    }>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} size={60} shape="square" />}
                      title={<span className="text-white text-md">{t(item.title)}</span>}
                      description={<div>{
                        index === 1 ? (
                          <div>
                            <div className="text-grey">{t(item.content)}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-white">{invite_url}</div>
                              <div className="btn btn-xs text-white bg-transparent border-white hover:bg-white hover:text-black rounded-full" onClick={() => handleCopy(invite_url)}>COPY</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-grey">{t(item.content)}</span>
                        )
                      }</div>}
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className="border border-[#555555] rounded-box p-6 px-4 my-6">
              <h3 className="text-white text-base max-w-[500px]">Rules</h3>
              <ul className="marker:text-grey-700 ml-6">
                <li className="list-item">
                  <p className="my-2 text-grey-700 text-xs">{t("CycleX Ignition Gala! Ignite the Mystery box by participating in the tasks and claim rare $WFC tokens!")}</p>
                </li>
                <li>
                  <p className="my-2 text-grey-700 text-xs">{t("Users are given 1 lottery chance for completing registration.")}</p>
                </li>
                <li>
                  <p className="my-2 text-grey-700 text-xs">{t("Users are given 2 lottery chances for making their first payment.")}</p>
                </li>
                <li>
                  <p className="my-2 text-grey-700 text-xs">{t("Users are given 1 lottery chances for each successful share.")}</p>
                </li>
                <li>
                  <div className="my-2 text-grey-700 text-xs">
                    {t("Users who invest over $10 USDT will unlock more chances!")}
                    <ul className="ml-8 text-grey">
                      <li className="my-1">{t("Deposit between $10-100 - Giveaway 3 lottery draw chances")}</li>
                      <li className="my-1">{t("Deposit between $100-1000 - Giveaway 6 lottery draw chances")}</li>
                      <li className="my-1">{t("Deposit between $1000-10,000 - Giveaway 15 lottery draw chances")}</li>
                      <li className="my-1">{t("Deposit between $10,000-100,000 - Giveaway 20 lottery draw chances")}</li>
                      <li className="my-1">{t("Deposit more than $100,000- Giveaway 35 lottery draw chances.")}</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <p className="my-2 text-grey-700 text-xs">{t("The final interpretation rights of this event belong solely to CycleX.")}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" m-auto h-[1px] bg-[#aaa] "></div>
    </>
  );
};

export default BlindBox;
