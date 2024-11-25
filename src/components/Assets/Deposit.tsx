import { Modal, Select, Spin, Tabs } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
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
import SafetyInput from "./SafetyInput";
import ForgetSafetyCode from "./ForgotSafetyCode";
import { Icon } from "@ricons/utils";
import { CloseCircleOutlined } from "@ricons/antd";
let CloseCircleOutlineds = CloseCircleOutlined as any;

const ItemDeposit: React.FC<{
  network: string;
}> = ({ network }) => {
  const { t, i18n } = useTranslation();
  const [toast] = useAtom(messageContext);
  const [product] = useAtom(product_info);
  const [isSign, user, walletInfo] = useAccounts();
  const [amount, setAmount] = useState("");
  const [modal] = useAtom(modalContext);
  const [btnDisabled, setDisabled] = useState(true);
  const [secrityKey, setSecrityKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleTranslate } = useTranslateLocalStorage();
  const [, copy] = useCopyToClipboard();
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const navigate = useNavigate();

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

  const open = (num = 3) => {
    const context: any = modal?.info({
      closable: {
        closeIcon: (
          <Icon size={25}>
            <CloseCircleOutlineds />
          </Icon>
        ),
      },
      icon: <></>,
      onCancel: () => {
        context.destroy();
      },
      zIndex: 100,
      title: (
        <div className="text-center">
          <h1 className="w-full py-2 text-center text-xl">{t("Congratulations！")}</h1>
          <div className="font-normal">{t("You have drawn a lucky box")}</div>
        </div>
      ),
      content: (
        <div className="bg-white rounded-box flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <img src="/assets/box.png" width={160} alt="" className="animate__animated animate__pulse animate__infinite" />
            <span className="text-3xl font-bold text-[#6c6c6c]">X {num}</span>
          </div>

          <button
            className="btn btn-wide m-auto mt-4 bg-black text-white hover:bg-black hover:scale-105"
            onClick={() => {
              context.destroy();
              navigate("/blindBox");
            }}>
            Open
          </button>
        </div>
      ),
      centered: true,
      footer: null,
      width: "375px",
    });
  };
  const checkSecurity = async () => {
    if (!secrityKey) return;
    if (loading) return;
    setLoading(true);
    const { data } = await request.post("/api/api/fundOrder/create", {
      amount: Number(amount).toString(),
      product_id: String(product?.id),
      security_password: secrityKey,
      chain_id: 1,
      // ChainId: network === "Ethereum" ? 1 : 11501,
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
    } else {
      setConfirmModalShow(false);
      setSecrityKey("");
      toast?.success({
        icon: <img src="/assets/success.png" width={30} />,
        message: t("Congratulations on your successful subscription!"),
      });
      const _amount = Number(amount);
      if (_amount >= 10 && _amount <= 100) {
        open(3);
      } else if (_amount > 100 && _amount <= 1000) {
        open(6);
      } else if (_amount > 1000 && _amount <= 10000) {
        open(15);
      } else if (_amount > 10000 && _amount <= 100000) {
        open(20);
      } else if (_amount > 100_000) {
        open(35);
      }
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
      setSecrityKey("");
      if (Number(amount) < Number(min)) {
        setDisabled(true);
        return toast?.warning({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Less than minimum purchase quantity"),
        });
      }
      if (Number(amount) > Number(balance)) {
        setDisabled(true);
        return toast?.warning({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Insufficient balance"),
        });
      }

      setConfirmModalShow(true);
      // const context: any = modal?.info({
      //   closable: true,
      //   icon: <></>,
      //   onCancel: () => context.destroy(),
      //   title: <h1 className="w-full py-2 text-center text-lg">{t("Please enter security key")}</h1>,
      //   content: (
      //     <SafetyInput
      //       onSave={(e: string) => {
      //         secrityKey.current = e;
      //       }}
      //     />
      //   ),
      //   centered: true,
      //   footer: () => (
      //     <>
      //       <button
      //         className="btn btn-block bg-black text-white hover:bg-black hover:text-white hover:scale-x-95 m-auto mt-4 disabled:text-threePranentTransblack"
      //         onClick={() => {
      //           checkSecurity().then(() => {
      //             context.destroy();
      //           });
      //         }}>
      //         <Loader spinning={loading} />
      //         {t("Confirm")}
      //       </button>
      //       <div
      //         onClick={() => {
      //           context.destroy();
      //           setTimeout(openForgotSafetyModal, 200);
      //         }}
      //         className="text-center text-sm mt-2">
      //         {t("Forget the password")}?
      //       </div>
      //     </>
      //   ),
      //   styles: {
      //     body: {
      //       width: "100%",
      //     },
      //   },
      // });
    }
  };

  const openForgotSafetyModal = () => {
    const context: any = modal?.info({
      closable: true,
      icon: <></>,
      onCancel: () => context.destroy(),
      title: <h1 className="w-full py-2 text-center text-lg">{t("Please enter security key")}</h1>,
      zIndex: 1000,
      content: (
        <ForgetSafetyCode
          onComplate={() => {
            context.destroy();
          }}
        />
      ),
      centered: true,
      footer: null,
      styles: {
        body: {
          width: "100%",
        },
      },
    });
  };
  return (
    <div className="flex flex-col gap-4  text-greyblack font-bold font-whalebold">
      <Modal
        destroyOnClose
        centered
        width={400}
        open={confirmModalShow}
        onCancel={() => setConfirmModalShow(false)}
        onClose={() => setConfirmModalShow(false)}
        maskClosable={false}
        closable
        style={{ background: "#fff" }}
        title={<h1 className="w-full py-2 text-center text-lg">{t("Please enter security key")}</h1>}
        footer={
          <>
            <button
              className="btn btn-block bg-black text-white hover:bg-black hover:text-white hover:scale-x-95 m-auto mt-4 disabled:bg-[#e4e4e4] disabled:text-threePranentTransblack"
              onClick={checkSecurity}
              disabled={loading || !secrityKey}>
              <Loader spinning={loading} />
              {t("Confirm")}
            </button>
            <div onClick={openForgotSafetyModal} className="text-center text-sm mt-2 hover:cursor-pointer">
              {t("Forget the password")}?
            </div>
          </>
        }>
        <SafetyInput onSave={setSecrityKey} />
      </Modal>
      <div className="flex justify-between items-center">
        <span>{t("Settlement Period")}</span>
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
          value={amount}
          onChange={(e) => {
            // 获取输入值
            let value = e.target.value;
            if (value === "") {
              setDisabled(true);
              setAmount("");
              return;
            }
            // 使用正则表达式检查合法性: 只允许正数，小数位最多8位
            const regex = /^\d+(\.\d{0,8})?$/;

            // 如果是以0开头，但不是0.几的情况，则设置为0
            if (value.startsWith("0") && !value.startsWith("0.")) {
              value = "0";
            }

            // 若输入不合法，直接返回
            if (!regex.test(value)) {
              return;
            }
            setDisabled(false);
            // 最终设置金额
            setAmount(value);
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
          {t("Minimum Amount")}: {product?.min_pay} USDT
        </div>
        <div className="flex justify-between items-center">
          <div>
            {t("Available Balance")}: {walletInfo?.balance ?? 0} USDT
          </div>
          <div className="w-fit bg-black text-white rounded-full py-1 px-2 text-xxs md:text-xs whitespace-pre	self-start" onClick={() => navigate("/wallet#main")}>
            {t("TOP-UP")}
          </div>
        </div>
      </div>
      <button disabled={btnDisabled} className="btn btn-block bg-[#161618] disabled:bg-[#e4e4e4] disabled:text-threePranentTransblack border-0 rounded-md text-white p-4" onClick={handlerClick}>
        {!isSign ? t("please sign in") : t("Confirm Purchase")}
      </button>
      <div className="flex items-center justify-center gap-1">
        <span className="text-xs">
          <Trans i18nKey={"access"} components={{ a: <a /> }}></Trans>
        </span>
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
  const [network, set_network] = useState("Ethereum");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: "Ethereum" | "BEVM") => {
    setLoading(true);
    set_network(e);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-1 items-center">
          <span className="text-base">{t("Invest")}</span>
          <div>
            <img src={active === "1" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={16} />
          </div>
        </div>
      ),
      children: <ItemDeposit network={network} />,
    },
  ];
  return (
    <div className="flex flex-col justify-center gap-6 h-full">
      <img src="/assets/airdropbox.gif" className="hidden lg:block" alt="" onClick={() => navigate("/blindbox")} />
      <div className="shadow-2xl rounded-lg p-4">
        <div className="inline-flex p-2 items-center gap-2 bg-[#F5F6F8] rounded-md w-fit">
          {network === "Ethereum" ? (
            <img src="/assets/eth.png" width={20} />
          ) : network === "BEVM" ? (
            <img src="/assets/bevm.png" width={20} />
          ) : network === "Merlin" ? (
            <img src="/assets/merlin.png" width={20} />
          ) : (
            <></>
          )}
          <Select
            size="small"
            defaultValue="Ethereum"
            onChange={handleClick}
            options={[
              { value: "Ethereum", label: "Ethereum" },
              { value: "BEVM", label: "BEVM" },
              { value: "Merlin", label: "Merlin" },
            ]}
            style={{ fontSize: "12px" }}
          />
        </div>
        <div>
          <Spin spinning={loading}>
            <Tabs items={items} onChange={setActive}></Tabs>
          </Spin>
        </div>
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
    {
      value: product?.simple_name === "CDEX" ? "--" : product?.simple_name === "CMTF" ? "$ " + scientific(Number(product?.market_value)) : "$ " + scientific(Number(product?.market_value) + 300000),
      name: "TVL",
    },
    { value: product?.lockDct?.en ?? "0", name: "Lock" },
    { value: "$" + product?.unit, name: "NAV" },
    { value: Number(product?.income).toFixed(0) + "%", name: "APY" },
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
    <>
      <img src="/assets/airdropbox.gif" className="block lg:hidden mb-6" alt="" onClick={() => navigate("/blindbox")} />
      <div className="grid lg:grid-cols-2 w-full items-center gap-10 text-black">
        <div className="flex-1 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2 shadow-lg rounded-lg p-4">
            <span className="text-2xl mr-4 hyphens-auto">{t("Fairly audited over-collateralization tokenization for seamless access to real-world assets")}</span>
            <span className="text-greyblack hyphens-auto mt-4">{t("Earn risk-free U.S. Treasury yields on-chain, fully backed by U.S. Treasury bonds maturing in 6 months and reverse repos")}</span>
            <div className="text-greyblack flex items-center text-sm justify-between">
              <div className="flex gap-2 items-center">
                <span>{t("Disclaimer")}</span>
                <div className="ml-1">
                  <img src="/assets/goto.png" width={12} onClick={() => navigate("/guide#law")} />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span>{t("Release summary")}</span>
                <div className="ml-1">
                  <img src="/assets/goto.png" width={12} onClick={() => product?.fund_annex?.[0].annex && window.open(product?.fund_annex?.[0].annex, "blank")} />
                </div>
              </div>
              <div className="flex gap-2">
                <span>ERC1400</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4  text-sm  shadow-lg rounded-lg p-4">
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-1 my-4">
              {assetsData.map((item, index) => (
                <div key={item.name} className="flex items-center relative flex-1">
                  <div className="flex flex-col">
                    <div className="text-greyblack flex items-center text-xs">
                      <span>{item.name}</span>
                    </div>
                    <div className="text-black text-md font-bold font-whalebold">{item.value}</div>
                  </div>
                  {index < 3 && <div className="divider divider-vertical w-px	h-2/3  bg-transblack absolute right-[20%]"></div>}
                </div>
              ))}
            </div>
            <div className="bg-[#FAFAFC] rounded-box md:p-4">
              <div className="join join-vertical w-full text-xs">
                <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                  <div className="flex gap-2">
                    <span>{t("Audit Report")}</span>
                  </div>
                </div>

                <div className="join-item flex justify-between p-2 text-greyblack">
                  <div className="flex gap-2">
                    <span>{t("On-chain Address")}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <span>{product?.contract_address.replace(/^(.{6}).*(.{4})$/, "$1...$2")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-greyblack">
              {t("Last updated date")} {moment(product?.updated_at ?? "", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-box h-full">
          <Card />
        </div>
      </div>
    </>
  );
};

export default Deposit;
