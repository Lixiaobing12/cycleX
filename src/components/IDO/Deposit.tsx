import { Pagination, Table, TableProps, Tabs } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { messageContext, modalContext } from "../../App";
import { product_info } from "../../atom/product";
import useLocalStorage, { useTranslateLocalStorage } from "../../hooks/localStorage";
import useAccounts from "../../hooks/user";
import { request } from "../../utils/request";
import WrapperImg from "../Common/Img";
import Loader from "../Loader";

const SafetyInput: React.FC<{
  onSave: Function;
}> = ({ onSave }) => {
  const inputs = useRef([{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
    inputs.current[key].value = e.target.value;
    if (key < inputs.current.length - 1) {
      (document.querySelector(`#dinput${key + 1}`) as any)?.focus();
    } else {
      (document.querySelector(`#dinput${key}`) as any)?.blur();
      onSave(inputs.current.map((i) => i.value).join(""));
    }
  };
  return (
    <div className="flex items-center gap-2 w-full justify-center">
      {inputs.current.map((item, key) => (
        <input type="password" className="input  border-black w-12 bg-white" onChange={(e) => handleInput(e, key)} key={key} id={`dinput${key}`} autoComplete="new-password" />
      ))}
    </div>
  );
};

const ItemDeposit = () => {
  const accessToken = useLocalStorage();
  const { t, i18n } = useTranslation();
  const [toast] = useAtom(messageContext);
  const [product] = useAtom(product_info);
  const [isSign, user, walletInfo] = useAccounts();
  const [amount, setAmount] = useState(0);
  const [modal] = useAtom(modalContext);
  const [btnDisabled, setDisabled] = useState(false);
  const secrityKey = useRef<string>();
  const [loading, setLoading] = useState(false);
  const { handleTranslate } = useTranslateLocalStorage();

  const checkSecurity = async () => {
    if (!secrityKey.current) return;
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await request.post("/sapi/presale/create", {
        BearerToken: "Bearer " + accessToken?.token,
        UsdAmount: amount,
        SecurityPassowrd: secrityKey.current,
      });

      if (data.code !== 0) {
        if (i18n.language === "en") {
          toast?.warning({
            message: await handleTranslate(data.msg),
            icon: <img src="/assets/error.png" width={30} />,
          });
        } else {
          toast?.warning({
            message: data.msg,
            icon: <img src="/assets/error.png" width={30} />,
          });
        }
        return Promise.reject();
      } else {
        toast?.success({
          icon: <img src="/assets/success.png" width={30} />,
          message: t("Congratulations on your successful participation!"),
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast?.warning({
        message: t("Something went wrong, try again later"),
        icon: <img src="/assets/error.png" width={30} />,
      });
      return Promise.reject();
    }
  };
  const handlerClick = () => {
    if (!isSign) {
      toast?.warning({
        message: t("please sign in"),
        icon: <img src="/assets/error.png" width={30} />,
      });
    } else {
      const min = 1000;
      const balance = walletInfo?.balance;
      if (amount < Number(min)) {
        setDisabled(true);
        return toast?.warning({
          message: t("Less than minimum purchase quantity"),
          icon: <img src="/assets/error.png" width={30} />,
        });
      }
      if (amount > Number(balance)) {
        setDisabled(true);
        return toast?.warning({
          message: t("Insufficient balance"),
          icon: <img src="/assets/error.png" width={30} />,
        });
      }

      const context: any = modal?.info({
        closable: true,
        icon: <></>,
        onCancel: () => context.destroy(),
        title: <h1 className="w-full py-2 text-center text-lg">{t("Please enter security key")}</h1>,
        content: (
          <SafetyInput
            onSave={(e: string) => {
              secrityKey.current = e;
            }}
          />
        ),
        centered: true,
        footer: () => (
          <button
            className="btn btn-block m-auto mt-4 disabled:text-threePranentTransblack"
            onClick={() => {
              checkSecurity()
                .then(() => {
                  context.destroy();
                })
                .catch(() => {});
            }}>
            <Loader spinning={loading} />
            {t("confirm")}
          </button>
        ),
        styles: {
          body: {
            width: "100%",
          },
        },
      });
    }
  };
  return (
    <div className="flex flex-col gap-4  text-greyblack font-bold font-whalebold">
      <div className="w-full relative items-center flex">
        <input
          type="number"
          className="w-full input bg-[#F7F8FA] rounded-md border-0 placeholder:text-xs"
          onChange={(e) => {
            setDisabled(false);
            setAmount(Number(e.target.value));
          }}
          placeholder={`${t("Min Purchase")} 1000`}
        />
        <div className="absolute flex items-center right-4 gap-2">
          <div>
            <img src="/assets/usdt.png" width={20} />
          </div>
          <span className="text-black font-bold font-whalebold">USDT</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>{t("Minimum amount")}: 1000 USDT</div>
        <div>1 USDT = 1000 WFC</div>
        <div>
          {t("Available Balance")}: {walletInfo?.balance ?? 0} USDT
        </div>
      </div>
      <button disabled={btnDisabled} className="btn btn-block bg-[#161618] disabled:text-threePranentTransblack border-0 rounded-md text-white p-4" onClick={handlerClick}>
        {!isSign ? t("please sign in") : t("Confirm purchase")}
      </button>
      <div className="flex items-center justify-center gap-1">
        <span>{t("Contact support@cyclex.cc to gain access")}</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} />
          <WrapperImg src="/assets/transparent_telegram.png" width={18} />
        </div>
      </div>
    </div>
  );
};
const ItemWithDraw = () => {
  const { t } = useTranslation();
  const [product] = useAtom(product_info);
  const [btnDisabled, setDisabled] = useState(false);
  const [isSign, user, walletInfo] = useAccounts();

  const handlerClick = () => {};
  return (
    <div className="flex flex-col gap-4  text-greyblack font-bold font-whalebold">
      <div className="w-full relative items-center flex">
        <input type="text" className="w-full input bg-[#F7F8FA] rounded-md border-0" />
        <div className="absolute flex items-center right-4 gap-2">
          <div>
            <img src="/assets/usdt.png" width={20} />
          </div>
          <span className="text-black font-bold font-whalebold">USDT</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>{t("Minimum amount")}：100,000 USDT</div>
        <div>1 CRFS =1000 USD</div>
      </div>
      <button disabled={btnDisabled} className="btn btn-block bg-[#161618] disabled:text-threePranentTransblack border-0 rounded-md text-white p-4" onClick={handlerClick}>
        {!isSign ? t("please sign in") : t("Confirm purchase")}
      </button>
      <div className="flex items-center justify-center gap-1">
        <span>{t("Contact support@cyclex.cc to gain access")}</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} />
          <WrapperImg src="/assets/transparent_telegram.png" width={18} />
        </div>
      </div>
    </div>
  );
};
const ItemParticipate = () => {
  const [records, setRecords] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const [, user] = useAccounts();
  const defaultPage = {
    page: 1,
    size: 10,
    total: 0,
  };
  const [page, setPage] = useState(defaultPage);
  const columns: TableProps<any>["columns"] = [
    {
      title: "",
      dataIndex: "ID",
      render: (value, record, index) => ++index,
      width: 30,
    },
    {
      title: t("participation time"),
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      width: 130,
      render(value, record, index) {
        return moment(record.Presale.CreatedAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: t("cost"),
      dataIndex: "UsdAmount",
      key: "UsdAmount",
      width: 100,
      render(value, record, index) {
        return record.Presale.UsdAmount + " USDT";
      },
    },
    {
      title: "WFC",
      dataIndex: "TokenAmount",
      key: "TokenAmount",
      width: 100,
      render(value, record, index) {
        return record.Presale.TokenAmount + " WFC";
      },
    },
    {
      title: t("Unlock time"),
      dataIndex: "UnlockAt",
      key: "UnlockAt",
      width: 130,
      render(value, record, index) {
        return moment(record.Presale.UnlockAt).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ];

  const handleChange = (_page: number) => {
    page.page = _page;
    fetch();
  };
  const fetch = () => {
    if (user) {
      request
        .post("/sapi/presale/list", {
          UserId: user?.id,
          Page: page.page,
          Size: page.size,
        })
        .then(async ({ data }) => {
          if (Array.isArray(data.data)) {
            setRecords(data.data);
          }
          setPage({
            page: data.page.currentPage,
            size: 10,
            total: data.page.count,
          });
        });
    }
  };
  useEffect(fetch, [user]);
  return (
    <div className="flex-auto flex flex-col gap-4  text-greyblack font-bold font-whalebold">
      <div className="w-full relative flex flex-col">
        <Table columns={columns} dataSource={records} className="w-full" pagination={false} scroll={{ x: 500, y: 500 }} rowKey="Presale.ID" />
        {records.length && (
          <div className="text-right">
            <Pagination simple total={page.total} onChange={handleChange} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-1">
        <span>{t("Contact support@cyclex.cc to gain access")}</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} />
          <WrapperImg src="/assets/transparent_telegram.png" width={18} />
        </div>
      </div>
    </div>
  );
};
const Card = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("1");

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-1 items-center">
          <span className="text-base">Donate</span>
          <div>
            <img src={active === "1" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={16} />
          </div>
        </div>
      ),
      children: <ItemDeposit />,
    },
    // {
    //   key: "2",
    //   label: (
    //     <div className="flex gap-1">
    //       <span className="text-base">{t("redemption")}</span>
    //       <div>
    //         <img src={active === "2" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={16} />
    //       </div>
    //     </div>
    //   ),
    //   children: <ItemWithDraw />,
    // },
    {
      key: "3",
      label: (
        <div className="flex gap-1 items-center">
          <span className="text-base">{t("Participating")}</span>
          <div>
            <img src={active === "3" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={16} />
          </div>
        </div>
      ),
      children: <ItemParticipate />,
    },
  ];
  return (
    <div className="p-4 flex flex-col w-full">
      <div className="inline-flex p-2 items-center gap-2 bg-[#F5F6F8] rounded-md w-fit">
        <img src="/assets/eth.png" width={20} />
        Ethereum
        <img src="/assets/down.png" width={10} alt="" />
      </div>
      <div className="w-full">
        <Tabs items={items} onChange={setActive}></Tabs>
      </div>
    </div>
  );
};
const Deposit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, user] = useAccounts();

  const assetsData = [
    { value: "$5M", name: t("Total assets") },
    { value: "100B", name: t("TotalSupply") },
    { value: "$ 0.001", name: t("IDO Price") },
    { value: "3 mo", name: t("lock-in") },
  ];
  const defaultIDOInfo = {
    TvlPresaleUsdAmount: 0,
    TvlPresaleTokenAmount: 0,
    OwnerTvlTokenAmount: 0,
    OwnerLockTokenAmount: 0,
    OwnerPengingTokenAmount: 0,
    OwnerReceiveTokenAmount: 0,
    OwnerPayUsdAmount: 0,
    OwnerBalance: 0,
  };

  const [idoInfo, setIdoInfo] = useState(defaultIDOInfo);
  useEffect(() => {
    if (user) {
      request
        .post("/sapi/presale/getInfoByUserId", {
          UserId: user?.id || 10000006,
        })
        .then(async ({ data }) => {
          setIdoInfo(data.data);
        });
    }
  }, [user]);
  return (
    <div className="flex flex-col xl:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-4">
          <span className="text-2xl mr-4">WFC | Whale Flow Coin</span>
          <span className="text-greyblack">
            {t("WFC token has the characteristics of currency-stock linkage, combining the dual income characteristics of traditional financial markets and crypto markets.")}
          </span>
          <div className="text-greyblack flex items-center gap-2 md:gap-10 my-2 text-sm">
            <div className="flex gap-2">
              <span>{t("IDO briefing")}</span>
              <div>
                <WrapperImg src="/assets/goto.png" width={14} onClick={() => navigate("/issus")} />
              </div>
            </div>
            <div className="flex gap-2">
              <span>{t("Release summary")}</span>
              <div>
                <WrapperImg src="/assets/goto.png" width={14} onClick={() => navigate("/guide")} />
              </div>
            </div>
            <div className="flex gap-2">
              <span>ERC20</span>
            </div>
          </div>
        </div>

        <div className="rounded-box border border-light p-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {assetsData.map((item, index) => (
              <div key={item.name} className="flex items-center relative flex-1">
                <div className="flex flex-col">
                  <div className="text-greyblack flex items-center">
                    <span className="text-sm">{item.name}</span>
                    <div>
                      <WrapperImg src="/assets/question.png" width={16} />
                    </div>
                  </div>
                  <div className="text-black text-xl font-bold font-whalebold">{item.value}</div>
                </div>
                <div className="divider divider-vertical w-px	h-2/3  bg-transblack absolute right-[20%]"></div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFC] rounded-box md:p-4 text-sm">
            <div className="join join-vertical w-full">
              <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("Audit Report")}</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  WFC Report <WrapperImg src="/assets/goto.png" width={14} />
                </div>
              </div>

              <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("Pre-sold")} USDT</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div className="flex items-center gap-1 items-black">{idoInfo.TvlPresaleUsdAmount}</div>
              </div>

              <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("Pre-sold")} WFC</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div className="flex items-center gap-1 items-black">{idoInfo.TvlPresaleTokenAmount}</div>
              </div>
              <div className="join-item flex justify-between p-2 text-greyblack border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("fluidity")}</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div>{t("Not applicable yet")}</div>
              </div>
            </div>
          </div>
          <div className="text-greyblack">
            {t("last updated date")} {moment().format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-box shadow-2xl p-4 pt-10 w-full">
        <Card />
      </div>
    </div>
  );
};

export default Deposit;
