import { CloseCircleOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { Avatar, List } from "antd";
import { useAtom } from "jotai";
import BulletJs from "js-bullets";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { messageContext, modalContext } from "../App";
import WrapperImg from "../components/Common/Img";
import useLocalStorage from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { request } from "../utils/request";

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
  const [page, setPage] = useState(1);
  const getData = () => {
    request
      .post("/sapi/lottery/list", {
        UserId: account?.id,
        unlock: false,
        Page: page,
        Size: 8,
      })
      .then(({ data }) => {
        setUserLotteryList(data.data.concat(userLotteryList));
      });
  };
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - 400) <= 1) {
      setPage((page) => page + 1);
      getData();
    }
  };
  useEffect(() => {
    if (account) {
      getData();
    }
  }, [account]);

  return (
    <List>
      <VirtualList data={userLotteryList} height={400} itemHeight={47} itemKey="email" onScroll={onScroll}>
        {(item) => (
          <List.Item extra={<span>{moment(item.CreatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>}>
            <List.Item.Meta
              title={
                <div className="flex gap-1">
                  <span className="text-bold">+{item.Amount}</span>
                  <span className="text-greyblack">WFC</span>
                </div>
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
const BlindBox = () => {
  const [, account] = useAccounts();
  const [, copy] = useCopyToClipboard();
  const accessToken = useLocalStorage();
  const [toast] = useAtom(messageContext);
  const [openStatus, setOpenStatus] = useState(false);
  const [modal] = useAtom(modalContext);
  const screenRef = useRef<any>();
  const [lotteryInfo, setLotteryInfo] = useState({
    LotteryNum: 0,
    Amount: 0,
    Login: false,
    Share: false,
  });
  const [data, setData] = useState([
    { title: "Login", content: "Daily login rewards 3 times", avatar: "/assets/blindbox-tasks-1.png", done: true, times: 3 },
    { title: "Share To Friends", content: "Successful sharing rewards 1 time", avatar: "/assets/blindbox-tasks-2.png", done: false, times: 1 },
    { title: "Invest in Products", content: "Invest more than 100u and rewards 5 times", avatar: "/assets/blindbox-tasks-3.png", done: false, times: 5 },
  ]);

  const handleCopy = () => {
    copy("https://cyclex.cc")
      .then(() => {
        toast?.success({
          icon: <img src="/assets/success.png" width={30} />,
          message: "Copied!",
        });
        request.post("/sapi/lottery/addNum", {
          BearerToken: "Bearer " + accessToken?.token,
          Type: "Share",
        });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const handleOpen = () => {
    setOpenStatus(true);
    request
      .post("/sapi/lottery/open", {
        BearerToken: "Bearer " + accessToken?.token,
      })
      .then(({ data }) => {
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
        }, 3000);
      });
  };

  const handleList = () => {
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
          <h1 className="w-full py-2 text-center text-xl">Records</h1>
          <AppendLotteryUserRecordComponent />
        </div>
      ),
      content: <div className="bg-white rounded-box flex flex-col justify-center items-center"></div>,
      centered: true,
      footer: null,
      width: "375px",
    });
  };

  const init = () => {
    request
      .post("/sapi/lottery/info", {
        UserId: account?.id,
      })
      .then((res) => {
        setLotteryInfo(res.data.data);
        setData((state) => {
          state[1].done = res.data.data.Share;
          return [...state];
        });
      });
    request
      .post("/sapi/lottery/list", {
        unlock: false,
        Page: page,
        Size: 8,
      })
      .then(({ data }) => {
        if (data.data.length) {
          data.data.forEach((item: any) => {
            screenRef.current.push(`
                <div class="flex gap-2 items-center text-white">
                    <img src="${item.Avatar}" width="25" class="rounded-full"/>
                    <span>${item.Email.replace(/^(.{3}.*(.{6})$)/, "$1***$2")}</span>
                    won <span>${item.Amount}</span> WFC
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
    if (account) {
      init();
    }
  }, [account]);
  useEffect(() => {
    screenRef.current = new BulletJs("#danmu-screen", { speed: 80 });
  }, []);
  return (
    <div className="bg-black">
      <div className="bg-blindboxbgh5 bg-100 xl:bg-blindboxbg gap-10 pb-10 flex-center-col">
        <div id="danmu-screen" className="w-full h-[100px]"></div>
        {openStatus ? (
          <div className="relative flex-center-col">
            <div className="absolute top-0">
              <Loader />
            </div>
            <img src="/assets/comp.gif" alt="" className="mt-10" />
          </div>
        ) : (
          <>
            <img src="/assets/WonWFC.png" alt="" width={350} className="max-w-[80vw]" />
            <img src="/assets/box-shine.png" width={500} alt="" className="my-[-50px]" />
            <div className="relative flex-center-col inline-flex">
              <div className="bg-blindboxpopbg bg-100 px-4 w-fit py-1 self-end mb-1 flex pb-[8px]">+{lotteryInfo.LotteryNum} times</div>
              <a style={lotteryInfo.LotteryNum === 0 ? { pointerEvents: "none", filter: "brightness(0.5)" } : {}}>
                <WrapperImg src="/assets/blindbox-btn-open.png" width={160} onClick={handleOpen} />
              </a>
              <div className="absolute right-[-120px] bottom-0 flex-center inline-flex bg-[rgb(33,31,33)] p-1 rounded-md" onClick={handleList}>
                <WrapperImg src="/assets/blindbox-coin.png" width={16} />
                <div className="flex flex-col justify-center items-start ml-2">
                  <span className="text-white">{lotteryInfo.Amount}</span>
                  <span className="text-grey text-xs">Earned WFC</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="rounded-t-box bg-white p-4 py-10">
        <div className="w-full lg:w-1/3 m-auto">
          <button className="btn btn-block disabled:bg-black disabled:text-white" disabled>
            Lucky Tasks
          </button>
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
                          if (index === 1) {
                            handleCopy();
                          }
                        }}>
                        +{item.times}
                      </button>
                    )
                  }>
                  <List.Item.Meta avatar={<Avatar src={item.avatar} size={60} shape="square" />} title={item.title} description={item.content} />
                </List.Item>
              )}
            />
          </div>
          <div className="bg-[#f5f7fa] rounded-box p-6 my-10">
            <h3 className="text-black text-lg">Rules</h3>
            <p className="my-2 text-black-800">1.CycleX limited time lottery activity, participating in the activity can earn rare WFC</p>
            <p className="my-2 text-black-800">2.Users will receive one lucky draw opportunity for daily login and forwarding</p>
            <p className="my-2 text-black-800">3.The sole right of interpretation belongs to xxx</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlindBox;
