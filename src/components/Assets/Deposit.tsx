import { Tabs } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard, useEventListener } from "usehooks-ts";
import { messageContext, modalContext } from "../../App";
import { product_info } from "../../atom/product";
import { useTranslateLocalStorage } from "../../hooks/localStorage";
import useAccounts from "../../hooks/user";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";
import WrapperImg from "../Common/Img";
import Loader from "../Loader";


const SafetyInput: React.FC<{
  onSave: Function;
}> = ({ onSave }) => {
  const [words, setWords] = useState([{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }])
  const passwords = useRef('');

  const handleInput = ({ key, e }: { key: number; e: React.ChangeEvent<HTMLInputElement> }) => {
    setWords(state => {
      state[key].value = '*';
      return [...state];
    })
    passwords.current += e.target.value;
    if (key < 5) {
      (document.querySelector(`#dinput${key + 1}`) as any)?.focus();
    } else {
      (document.querySelector(`#dinput${key}`) as any)?.blur();
      onSave(passwords.current);
    };
  };
  useEventListener("keydown", (evnet) => {
    if (evnet.key === 'Delete' || evnet.key === 'Backspace') {
      for (let i = 5; i > -1; i--) {
        if (!!words[i].value) {
          setWords(state => {
            state[i].value = '';
            return [...state];
          });
          (document.querySelector(`#dinput${i}`) as any)?.focus();
          break;
        }
      }
    }
  })
  useEffect(() => {
    (document.querySelector(`#dinput0`) as any)?.focus();
  }, [])
  return (
    <div className="flex items-center gap-2 w-full justify-center">
      {words.map((item, key) => (
        <input type="text" className="input border-black w-12 bg-white" value={words[key].value} onChange={(e) => handleInput({ e, key })} key={key} id={`dinput${key}`} autoComplete="off" />
      ))}
    </div>
  );
};
const ItemDeposit = () => {
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
  const [, copy] = useCopyToClipboard();

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

  const checkSecurity = async () => {
    if (!secrityKey.current) return Promise.reject();
    if (loading) return;
    setLoading(true);
    const { data } = await request.post("/api/api/fundOrder/create", {
      amount: amount.toString(),
      product_id: String(product?.id),
      security_password: secrityKey.current,
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);

    if (data.res_code !== 0) {
      if (i18n.language === "en") {
        toast?.warning({
          message: await handleTranslate(data.res_msg),
          icon: <img src="/assets/error.png" width={30} />,
        });
      } else {
        toast?.warning({
          message: data.res_msg,
          icon: <img src="/assets/error.png" width={30} />,
        });
      }
      return Promise.reject();
    } else {
      toast?.success({
        icon: <img src="/assets/success.png" width={30} />,
        message: t("Congratulations on your successful subscription!"),
      });
    }
  };
  const handlerClick = () => {
    if (!isSign) {
      toast?.warning({
        icon: <img src="/assets/error.png" width={30} />,
        message: t("please sign in"),
      });
    } else {
      const min = product?.min_pay;
      const balance = walletInfo?.balance;
      secrityKey.current = '';
      if (amount < Number(min)) {
        setDisabled(true);
        return toast?.warning({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Less than minimum purchase quantity"),
        });
      }
      if (amount > Number(balance)) {
        setDisabled(true);
        return toast?.warning({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Insufficient balance"),
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
            className="btn btn-block bg-black text-white hover:bg-black hover:text-white hover:scale-x-95 m-auto mt-4 disabled:text-threePranentTransblack"
            onClick={() => {
              checkSecurity().then(() => {
                context.destroy();
              });
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
      <div className="flex justify-between items-center">
        <span>{t("settlement period")}</span>
        <div className="rounded-full border border-light p-1 flex items-center px-4 gap-1">
          T+{product?.pay_t_n}
          <div>
            <img src="/assets/countdowm_notactive.png" width={16} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full relative items-center flex">
        <input
          type="number"
          className="w-full input bg-[#F7F8FA] rounded-md border-0 placeholder:text-xs"
          onChange={(e) => {
            setDisabled(false);
            setAmount(Number(e.target.value));
          }}
          placeholder={`${t("Min Purchase")}${product?.min_pay}`}
        />
        <div className="absolute flex items-center right-4 gap-2">
          <div>
            <img src="/assets/usdt.png" width={16} />
          </div>
          <span className="text-black font-bold font-whalebold">USDT</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div>
          {t("Minimum amount")}: {product?.min_pay} USDT
        </div>
        <div>
          {t("Available Balance")}: {walletInfo?.balance ?? 0} USDT
        </div>
      </div>
      <button disabled={btnDisabled} className="btn btn-block bg-[#161618] disabled:text-threePranentTransblack border-0 rounded-md text-white p-4" onClick={handlerClick}>
        {!isSign ? t("please sign in") : t("Confirm purchase")}
      </button>
      <div className="flex items-center justify-center gap-1">
        <span className="text-xs">{t("Contact services@whaleflow.co to gain access")}</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} onClick={() => handleCopy("services@whaleflow.co")} />
          <a href="https://t.me/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363] w-8">
            <WrapperImg src="/assets/transparent_telegram.png" width={18} />
          </a>
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
          <span className="text-base">{t("invest")}</span>
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
    //         <img src={active === "2" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={18} />
    //       </div>
    //     </div>
    //   ),
    //   children: <ItemWithDraw />,
    // },
  ];
  return (
    <div className="p-4 flex flex-col">
      <div className="inline-flex p-2 items-center gap-2 bg-[#F5F6F8] rounded-md w-fit">
        <img src="/assets/eth.png" width={20} />
        Ethereum
        <img src="/assets/down.png" width={10} alt="" />
      </div>
      <div>
        <Tabs items={items} onChange={setActive}></Tabs>
      </div>
    </div>
  );
};
const Deposit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [toast] = useAtom(messageContext);
  const [product] = useAtom(product_info);
  const [, copy] = useCopyToClipboard();
  const assetsData = [
    { value: "$ " + scientific(product?.market_value ?? 0), name: t("Total assets") },
    { value: product?.rate ?? "0%", name: t("MG fee") },
    { value: "150%", name: t("OC rate") },
    { value: product?.income2 ?? "5%", name: t("Rate Fee") },
  ];
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
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-4">
          <span className="text-2xl mr-4">{t("Fairly audited over-collateralization tokenization for seamless access to real-world assets")}</span>
          <span className="text-greyblack">{t("Earn risk-free U.S. Treasury yields on-chain, fully backed by U.S. Treasury bonds maturing in 6 months and reverse repos")}</span>
          <div className="text-greyblack flex items-center gap-2 md:gap-10 my-2 text-sm">
            <div className="flex gap-2 items-center">
              <span>{t("Disclaimer")}</span>
              <div className="ml-1">
                <WrapperImg src="/assets/goto.png" width={12} onClick={() => navigate("/issus")} />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span>{t("Release summary")}</span>
              <div className="ml-1">
                <WrapperImg src="/assets/goto.png" width={12} onClick={() => navigate("/guide")} />
              </div>
            </div>
            <div className="flex gap-2">
              <span>ERC1400</span>
            </div>
          </div>
        </div>

        <div className="rounded-box border border-light p-4 flex flex-col gap-4  text-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {assetsData.map((item, index) => (
              <div key={item.name} className="flex items-center relative flex-1">
                <div className="flex flex-col">
                  <div className="text-greyblack flex items-center">
                    <span>{item.name}</span>
                    {/* <div>
                      <WrapperImg src="/assets/question.png" width={12} />
                    </div> */}
                  </div>
                  <div className="text-black text-xl font-bold font-whalebold">{item.value}</div>
                </div>
                <div className="divider divider-vertical w-px	h-2/3  bg-transblack absolute right-[20%]"></div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFC] rounded-box md:p-4">
            <div className="join join-vertical w-full text-xs">
              <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("Audit Report")}</span>
                  {/* <div>
                    <WrapperImg src="/assets/question.png" width={12} />
                  </div> */}
                </div>
              </div>
              <div className="join-item flex justify-between p-2 text-greyblack border-b border-transblack">
                <div className="flex gap-2">
                  <span>{t("fluidity")}</span>
                  {/* <div>
                    <WrapperImg src="/assets/question.png" width={12} />
                  </div> */}
                </div>
                <div>{t("Daily trading volume reaches $25 million")}</div>
              </div>
              <div className="join-item flex justify-between p-2 text-greyblack">
                <div className="flex gap-2">
                  <span>{t("On-chain address")}</span>
                  {/* <div>
                    <WrapperImg src="/assets/question.png" width={12} />
                  </div> */}
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span>{product?.contract_address.replace(/^(.{6}).*(.{4})$/, "$1...$2")}</span>
                    {/* <WrapperImg src="/assets/copy.png" width={14} onClick={() => handleCopy(product?.contract_address ?? "")} /> */}
                    {/* <a href={`https://etherscan.io/address/${product?.contract_address}`} target="_blank">
                      <WrapperImg src="/assets/goto.png" width={12} />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-greyblack">
            {t("last updated date")} {moment(product?.updated_at ?? "", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-box shadow-2xl p-4 pt-10">
        <Card />
      </div>
    </div>
  );
};

export default Deposit;
