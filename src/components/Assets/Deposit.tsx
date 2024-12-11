import { Flex, Modal, Pagination, Progress, Select, Skeleton, Space, Spin, Table, TableProps, Tabs } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { ConnectButton, useAccountModal, useChainModal, useConnectModal, WalletButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useClient, usePublicClient, useReadContract, useSendTransaction, useToken, useWatchAsset, useWriteContract } from "wagmi";
import Countdown from "antd/es/statistic/Countdown";
import { createPublicClient, erc20Abi, formatEther, getContract, http, parseEther, size } from "viem";
import BigNumber from "bignumber.js";
import { i18n } from "@rainbow-me/rainbowkit/dist/locales";
import { t } from "i18next";
import { userInfo_atom } from "../../atom/userInfo";
let CloseCircleOutlineds = CloseCircleOutlined as any;
let countDownTimer: any;
const PaymentCroptyCard: React.FC<{ timeStamp: number; amount: number; product_name?: string; product_id?: string; chain_id: number; show: boolean; setModalShow: Function }> = (props) => {
  const { t } = useTranslation();

  return (
    <Modal
      destroyOnClose
      open={props.show}
      onCancel={() => props.setModalShow(false)}
      onClose={() => props.setModalShow(false)}
      maskClosable={true}
      footer={null}
      modalRender={() => <>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div></>}></Modal>
  );
};

const ItemDeposit: React.FC<{
  network: string;
}> = ({ network }) => {
  const { t, i18n } = useTranslation();
  const account = useAccount();
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
  const [croptyPaymentModalShow, setCroptyPaymentModalShow] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>();
  const [expirationTime, setExpirationTime] = useState<number>(0);
  const [users] = useAtom(userInfo_atom);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { writeContract } = useWriteContract();
  const { watchAssetAsync } = useWatchAsset();
  const client = usePublicClient();

  const userTokenBalance = useCallback(() => {
    return (account?.address && client) ? client.readContract({
      address: import.meta.env.VITE_USDT_ETH,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account.address]
    }) : Promise.resolve(0n);
  }, [account, client])
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
      return;
    }

    if (loading) return;
    if (account.isConnected) {
      if (orderInfo && expirationTime > 0) {
        payment();
      } else {
        handleCreateOrder();
      }
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
    }
  };

  const payment = async () => {
    setLoading(true);
    const balance = await userTokenBalance();
    if (balance < BigInt(BigNumber(amount).times(10 ** 6).toNumber())) {
      toast?.warning({
        message: t("Wallet Insufficient balance"),
        icon: <img src="/assets/error.png" width={30} />,
      });
      setLoading(false);
      return;
    }
    writeContract({
      abi: erc20Abi,
      address: import.meta.env.VITE_USDT_ETH,
      functionName: "transfer",
      args: [
        import.meta.env.VITE_PAYMENT_ADDRESS,
        BigInt(BigNumber(amount).times(10 ** 6).toNumber()),
      ],
    }, {
      onSuccess(data, variables, context) {
        //console.log("payment success", data, variables, context);
        const params = {
          id: orderInfo.id,
          txid: data
        }
        request.post('/api/api/cryptoPayment/confirm', params).then(res => {
          if (res.data.res_code === 0) {
            setLoading(false);
            setOrderInfo(res.data.data);
            setTimeout(() => {
              const el = document.querySelector('#order_container');
              if (el) {
                el?.classList.add('animate__animated', 'animate__zoomOutUp');
                el?.addEventListener('animationend', () => {
                  setCroptyPaymentModalShow(false);
                  setOrderInfo(null);
                });
              }
            }, 1500)
          } else {
            setTimeout(() => {
              setLoading(false);
              toast?.warning({
                message: t("Payment failed, please contract us"),
                icon: <img src="/assets/error.png" width={30} />,
              });
            }, 1500)
          }
        })
      },
      onError(error, variables, context) {
        //console.log("payment error", error, variables, context);
        setLoading(false);
        toast?.warning({
          message: t("Payment failed, try again later"),
          icon: <img src="/assets/error.png" width={30} />,
        });
      }
    })
  }
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

  const handleCreateOrder = async () => {
    if (isSign) {
      const min = product?.min_pay;
      //console.log(min, amount)
      if (min && (Number(amount) < Number(min))) {
        return;
      }
      setLoading(true)
      setCroptyPaymentModalShow(true)
      const params = {
        amount: amount,
        product_id: product?.id,
        product_type: "FUND",
        asset_id: 3,
        chain_id: account.chainId,
        payment_address: account.address
      }
      try {
        const res = await request.post('/api/api/cryptoPayment/create', params);
        //console.log('data', res.data)
        if (res.data.res_code === 0) {
          setTimeout(() => {
            setLoading(false)
            setOrderInfo(res.data.data);
            setExpirationTime(moment(res.data.data.expiration_time, 'YYYY-MM-DD HH:mm:ss').valueOf() - moment().valueOf());
            if (countDownTimer) clearInterval(countDownTimer);
            countDownTimer = setInterval(() => {
              let timestamp = moment(res.data.data.expiration_time, 'YYYY-MM-DD HH:mm:ss').valueOf() - moment().valueOf();
              if (timestamp <= 0) {
                clearInterval(countDownTimer);
                setExpirationTime(0);
              } else {
                setExpirationTime(timestamp);
              }
            }, 10 * 1000)
          }, 2000)
        } else {
          setTimeout(() => {
            setCroptyPaymentModalShow(false);
            toast?.warning({
              message: t("Payment failed, try again later"),
              icon: <img src="/assets/error.png" width={30} />,
            });
          }, 2000)
        }
      } catch (e) {
        setLoading(false)
        setCroptyPaymentModalShow(false)
      }
    }
  }

  useEffect(() => {
    if (expirationTime === 0 && orderInfo && orderInfo.payment_status === 'CREATED') {
      handleCreateOrder();
    }
  }, [expirationTime])

  useEffect(() => {
    let min = product?.min_pay;
    if (min && (Number(amount) >= Number(min))) {
      if (croptyPaymentModalShow) {
        setOrderInfo(null);
        setExpirationTime(0);
        handleCreateOrder()
      }
    } else {
      setCroptyPaymentModalShow(false);
      setOrderInfo(null);
      setExpirationTime(0);
    }
  }, [amount])

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
      <Modal
        destroyOnClose
        centered
        width={400}
        open={openWalletModal}
        onCancel={() => setOpenWalletModal(false)}
        onClose={() => setOpenWalletModal(false)}
        closable={false}
        footer={null}
        style={{ borderRadius: '24px' }}
      >
        <Space direction="vertical">
          <div>Connect a wallet</div>
          <WalletButton wallet="metamask" />
        </Space>
      </Modal>
      {/* <PaymentCroptyCard
        timeStamp={Date.now()}
        amount={Number(amount)}
        product_name={product?.name}
        product_id={product?.id.toString()}
        chain_id={1}
        show={croptyPaymentModalShow}
        setModalShow={setCroptyPaymentModalShow}
      /> */}
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
            setAmount(prevCount => {
              prevCount = value;
              return prevCount;
            });
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

      <div style={{ height: croptyPaymentModalShow ? 'auto' : 0, transition: "height 0.3s ease-in-out" }} className="overflow-hidden">
        {
          orderInfo ?
            <div id="order_container">
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between items-center">
                  <span>{t("Payment ID")}</span>
                  <span>{orderInfo.order_sn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t("Payment Crypto")}</span>
                  <img src='/assets/usdt.png' width={16}></img>
                </div>
                {
                  orderInfo.payment_status === 'CREATED' ?
                    <div className="flex justify-between items-center">
                      <span>{t("Expired time")}</span>
                      <Flex align="center">
                        {
                          expirationTime && <Progress type="circle" percent={expirationTime / 60 / 1000 / 20 * 100} size={16} className="mr-2" />
                        }
                        <Countdown
                          title=""
                          value={moment(orderInfo.expiration_time, 'YYYY-MM-DD HH:mm:ss').valueOf()}
                          format="mm:ss"
                          valueStyle={{
                            fontFamily: "Whale-bold",
                            fontWeight: "bold",
                            fontSize: "0.9em",
                            textAlign: "center",
                          }}
                        />
                      </Flex>
                    </div> :
                    <div className="flex justify-between items-center">
                      <span>{t("Payment Status")}</span>
                      {
                        orderInfo.payment_status === 'PENDING' && <span className="text-xs text-yellow-300">{t("Being confirmed")}</span>
                      }
                      {
                        orderInfo.payment_status === 'SUCCESS' && <span className="text-xs text-green">{t("Completed")}</span>
                      }
                      {
                        orderInfo.payment_status === 'FAILED' && <span className="text-xs text-red-300">{t("Failed")}</span>
                      }
                    </div>
                }
              </div>
              <div className="border-[1px] border-[#e4e5ea] p-4 flex gap-2 items-start rounded-lg mt-2">
                <img src="/assets/info.svg" width={16} alt="" className="mt-4" />
                <p className="text-xs">
                  <Trans i18nKey="deposit_tip" components={{ a: <a></a> }}></Trans>
                </p>
              </div>
            </div> :
            <Skeleton active></Skeleton>
        }
      </div>

      <Flex gap={12} align="center">
        <button disabled={btnDisabled} className="btn flex-1 bg-[#161618] disabled:bg-[#e4e4e4] disabled:text-threePranentTransblack border-0 rounded-md text-white p-4" onClick={handlerClick}>
          {!isSign ? t("please sign in") : loading ?
            <Loader spinning={loading} />
            : t("Purchase")}
        </button>

        <div className="w-fit">

          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button"
                          className="btn bg-black border-[1px] rounded-box text-white"
                        >
                          {t("Connect Wallet")}
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openAccountModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type="button"
                          className="btn bg-transparent border-[1px] rounded-box border-[#bbb]"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 24,
                                height: 24,
                                borderRadius: 999,
                                overflow: 'hidden',
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 24, height: 24 }}
                                />
                              )}
                            </div>
                          )}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </Flex>
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
    </div >
  );
};

const Records: React.FC<{
  active: string;
  width: number
}> = (props) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { handleTranslate } = useTranslateLocalStorage();
  const columns: TableProps<any>["columns"] = [
    {
      title: t("Order Sn"),
      dataIndex: "order_no",
      key: "order_no",
      width: 100,
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (value) => <strong>${Number(value).toFixed(2)}</strong>,
    },
    {
      title: t("Payment Method"),
      dataIndex: "payment_type",
      key: "payment_type",
      width: 100,
      render: (value) => <span className="capitalize">{value}</span>,
    },
    {
      title: t("Order Status"),
      key: "Labels",
      dataIndex: "Labels",
      width: 100,
      render: (value, row) => (<>
        {row.status === 'CREATED' ? <span className="text-xs text-yellow-300">{i18n.language === 'en' ? row.StatusNameDct.en : row.StatusNameDct.zh}</span> : <span className="text-xs text-green">{i18n.language === 'en' ? row.StatusNameDct.en : row.StatusNameDct.zh}</span>}
      </>),
    },
  ];
  const [page, setPage] = useState({
    page: 0,
    size: 5,
    total: 0
  })
  const [list, setList] = useState<any[]>([]);


  const handleChange = (_page: number, pageSize: number) => {
    page.page = _page - 1;
    page.size = pageSize;
    getData();
  };
  const getData = async () => {
    setLoading(true)
    const res = await request.post('/api/api/fundOrder/getList', {
      page: page.page,
      size: page.size
    });
    if (res.data.res_code === 0) {
      for (let item of res.data.data) {
        item.StatusNameDct = {
          en: await handleTranslate(item.status_name),
          zh: item.status_name
        }
      }
      //console.log(res.data)
      setPage(state => {
        //console.log({ ...state, total: res.data.page.total })
        return { ...state, total: res.data.page.total }
      })
      setList(res.data.data);
    }
    setLoading(false)
  }

  useEffect(() => {
    if (props.active === "2") {
      page.page = 0;
      getData();
    }
  }, [props.active])
  return (
    <div className="flex flex-col items-center gap-10" style={{
      width: props.width + 'px',
    }}>
      <Table columns={columns} dataSource={list} pagination={false} className="w-full" scroll={{ x: 400 }} rowKey="order_no" loading={loading} />
      {list.length > 0 && (
        <div className="text-right flex items-center">
          <Pagination simple total={page.total} defaultCurrent={1} pageSize={page.size} onChange={handleChange} onShowSizeChange={handleChange} />
        </div>
      )}
    </div>
  )
}

const Card = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState("1");
  const [network, set_network] = useState("Ethereum");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [elementWidth, setElementWidth] = useState(0);

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
    {
      key: "2",
      label: (
        <div className="flex gap-1 items-center">
          <span className="text-base">{t("Records")}</span>
          <div>
            <img src={active === "2" ? "/assets/wallet_record_active.png" : "/assets/wallet_record.png"} width={14} />
          </div>
        </div>
      ),
      children: <Records active={active} width={elementWidth} />,
    },
  ];

  useEffect(() => {
    const el = document.getElementById("card_container");
    if (el) {
      setElementWidth(el.offsetWidth)
    }
  }, [])
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
        <div id="card_container">
          <Spin spinning={loading}>
            <div className="w-full overflow-hidden">
              <Tabs items={items} onChange={setActive}></Tabs>
            </div>
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
