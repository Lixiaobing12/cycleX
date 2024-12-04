import { Col, Modal, Pagination, Row, Select, Table, TableProps } from "antd";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard, useWindowSize } from "usehooks-ts";
import { messageContext, modalContext } from "../App";
import WrapperImg from "../components/Common/Img";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { RechargeType } from "../types/Recharge";
import { request } from "../utils/request";

const Wallet = () => {
  const size = useWindowSize();
  const [toast] = useAtom(messageContext);
  const [, copy] = useCopyToClipboard();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    size: 8,
    total: 0,
  });
  const [rechargeInfo, setRechargeInfo] = useState<RechargeType>();
  const navigate = useNavigate();
  const [modal] = useAtom(modalContext);
  const { handleTranslate } = useTranslateLocalStorage();
  const [, user, walletInfo] = useAccounts();
  const [records, setRecords] = useState<any[]>([]);
  const [recharge_network, set_recharge_network] = useState("Ethereum");
  const [recharge_coin, set_recharge_coin] = useState("USDT");
  const [recharge_modal_visible, set_recharge_modal_visible] = useState(false);

  const total_assets = useMemo(() => {
    let total = Number(
      Number(walletInfo?.balance || 0) + Number(walletInfo?.freeze || 0) + Number(walletInfo?.current_amount || 0) + Number(walletInfo?.regular_amount || 0) + Number(walletInfo?.fund_amount || 0)
    );
    return walletInfo ? total : 0;
  }, [walletInfo]);

  const columns: TableProps<any>["columns"] = [
    {
      title: t("Category/Type"),
      dataIndex: "Description",
      key: "Description",
      width: 100,
      render(value, record, index) {
        return i18n.language === "en" ? record.descDcts.en : record.descDcts.zh;
      },
    },
    {
      title: t("Earnings/Change"),
      dataIndex: "BalanceChange",
      key: "BalanceChange",
      width: 100,
      render(value, record, index) {
        if (record.AssetId === 2) {
          return value + " ETH" + `(${record.Status === 1 ? t("receipt") + Number(record.TotalValue).toFixed(4) + " USDT" : t("pending")})`;
        } else if (record.AssetId === 3) {
          return value + " USDT";
        } else {
          return value + " BTC" + `(${record.Status === 1 ? t("receipt") + Number(record.TotalValue).toFixed(4) + " USDT" : t("pending")})`;
        }
      },
    },
    {
      title: t("Update Time"),
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      width: 100,
      render(value, record, index) {
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ];

  const handleCopy = (text: string) => {
    console.log(text);
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
  const Recharge = async () => {
    set_recharge_modal_visible(true);
  };

  const Withdraw = () => {
    toast?.warning({
      message: t("tip_withdraw_not_open"),
      icon: <></>,
    });
  }

  const handleChange = (_page: number, pageSize: number) => {
    page.page = _page;
    page.size = pageSize;
    fetch();
  };
  const fetch = () => {
    if (user) {
      setLoading(true);
      request
        .post("/sapi/walletAccountAssetChange/list", {
          UserId: user?.id,
          Page: page.page,
          Size: page.size,
        })
        .then(async ({ data }) => {
          if (Array.isArray(data.data)) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].descDcts = {
                key: data.data[i].Description,
                zh: data.data[i].Description,
                en: await handleTranslate(data.data[i].Description),
              };
            }
            setRecords(data.data);
          }
          setPage((state) => ({
            ...state,
            page: data.page.currentPage,
            total: data.page.count,
          }));
        })
        .finally(() => {
          setLoading(false);
        });
      request.post("/api/api/asset/getDetail", { id: 3 }).then(async ({ data }: any) => {
        data.data.deposit_account_dct = {
          key: data.data.deposit_account,
          en: await handleTranslate(data.data.deposit_account),
          zh: data.data.deposit_account,
        };
        setRechargeInfo(data.data);
      });
    }
  };

  useEffect(() => {
    if (size.width < 600) {
      setPage((state) => ({ ...state, size: 5 }));
    } else {
      setPage((state) => ({ ...state, size: 8 }));
    }
    !records.length && fetch();
  }, [user?.id, size]);


  return (
    <div className="w-full p-4 py-10 min-h-11/12" id="main">
      <Row justify="center">
        <Col xs={24} md={22} lg={18}>
          <div className="rounded-box bg-black flex flex-col p-8 pt-16 lg:pt-8 gap-4 relative  bg-wallet bg-100">
            <div className="absolute right-4 top-4 flex gap-2">
              {/* <button className=" btn btn-sm border-light bg-black text-white hover:text-white hover:bg-black" onClick={Withdraw}>
                {t("Withdraw")}
              </button> */}
              <button className=" btn btn-sm border-light bg-black text-white hover:text-black hover:bg-white" onClick={Recharge}>
                {t("Recharge")}
              </button>
              {/* <button className=" btn btn-sm border-light bg-black text-white hover:text-black hover:bg-white" onClick={() => navigate("/platform")}>
                WFC
              </button> */}
            </div>
            <div className="text-grey">{t("Total assets")} US$</div>
            <div className="text-white text-2xl">
              <CountUp end={total_assets as number} separator="," decimal="." decimals={2} />
            </div>
            <div className="flex justify-between gap-4 md:gap-14 flex-wrap">
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Total available")} US$</div>
                <div className="text-white text-md">
                  <CountUp end={Number(walletInfo?.balance) ?? 0} separator="," decimal="." decimals={2} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Today's profit and loss")} US$</div>
                <div className="text-white text-md">
                  <CountUp
                    end={Number(walletInfo?.yesterday_output) ?? 0}
                    separator=","
                    decimal="."
                    decimals={2}
                    prefix={Number(walletInfo?.yesterday_output) > 0 ? "+" : Number(walletInfo?.yesterday_output) < 0 ? "-" : ""}
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-start md:items-end">
                <div className="text-white text-md">{t("Wallet")}</div>
                <div className="text-grey text-md flex gap-2 items-center">
                  <div>
                    {size.width < 600
                      ? (walletInfo?.wallet_account_address ?? ethers.constants.AddressZero).replace(/^(.{6}).*(.{6})$/, "$1...$2")
                      : walletInfo?.wallet_account_address ?? ethers.constants.AddressZero}
                  </div>
                  <WrapperImg src="/assets/copy.png" width={16} onClick={() => handleCopy(walletInfo?.wallet_account_address ?? "")} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-14">
            <Table
              loading={{
                indicator: <img src="/assets/loader.png" className="rotating-image" />,
                spinning: loading,
              }}
              columns={columns}
              dataSource={records}
              className="w-full"
              pagination={false}
              scroll={{ x: 500, y: 500 }}
              rowKey="Id"
              rootClassName="pretter-scroll"
              rowClassName="pretter-scroll"
            />
            {records.length > 0 && (
              <div className="text-right">
                <Pagination simple total={page.total} defaultCurrent={1} showSizeChanger onChange={handleChange} onShowSizeChange={handleChange} />
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Modal
        open={recharge_modal_visible}
        modalRender={() => (
          <div className="rounded-box p-6 bg-white w-full flex flex-col items-center pointer-events-auto relative text-xs">
            <img src="/assets/close.png" className="absolute cursor-pointer top-4 right-4" width={25} onClick={() => set_recharge_modal_visible(false)} />

            <strong className="text-xl">Recharge</strong>

            <div className="w-full p-2 flex flex-col gap-2 mt-4">
              <div className="mt-4">{t("Recharge network")}</div>
              <Select
                value={recharge_network}
                onChange={(e) => {
                  set_recharge_network(e);
                  set_recharge_coin(e === "BEVM" || e === "Merlin" ? "BTC" : "USDT");
                }}
                options={[
                  { value: "Ethereum", label: "Ethereum Mainnet" },
                  { value: "BEVM", label: "BEVM Mainnet" },
                  { value: "Merlin", label: "Merlin Mainnet" },
                ]}
              />

              <div className="mt-4">{t("Recharge network")}</div>
              <Select
                value={recharge_coin}
                onChange={set_recharge_coin}
                options={
                  recharge_network === "BEVM" || recharge_network === "Merlin"
                    ? [{ value: "BTC", label: "BTC" }]
                    : [
                      { value: "USDT", label: "USDT" },
                      { value: "ETH", label: "ETH" },
                    ]
                }
              />

              <div className="mt-4">{t("Recharge address")}</div>
              <div className="bg-lightgrey rounded-md p-2 flex items-center gap-2 text-xs overflow-auto pointer-events-auto">
                <WrapperImg src="/assets/copy-active.png" width={18} onClick={() => handleCopy(walletInfo?.wallet_account_address ?? "")} />
                {walletInfo?.wallet_account_address}
              </div>

              <div className="mt-4 bg-lightgrey rounded-md p-4 gap-4">
                {recharge_coin === "USDT" ? (
                  <div className="flex justify-between items-center">
                    <span className="text-threePranentTransblack">{t("Minimum recharge amount")}</span>
                    <span>{Number(rechargeInfo?.deposit_min).toFixed(2)} USDT</span>
                  </div>
                ) : recharge_coin === "ETH" ? (
                  <div className="flex justify-between items-center">
                    <span className="text-threePranentTransblack">{t("Minimum recharge amount")}</span>
                    <span>0.003 ETH</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-threePranentTransblack">{t("Minimum recharge amount")}</span>
                    <span>0.0001 BTC</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-threePranentTransblack">{t("Block Confirmations")}</span>
                  <span>{i18n.language === "en" ? rechargeInfo?.deposit_account_dct?.en : rechargeInfo?.deposit_account_dct?.zh}</span>
                </div>
              </div>
              <div className="mt-2">
                {recharge_coin === "USDT" ? (
                  <p>{t("You can only deposit USDT-ERC20 to this address. If you deposit other assets, you will not be able to retrieve them.")}</p>
                ) : recharge_coin === "ETH" ? (
                  <p>{t("You can only deposit ETH-ERC20 to this address. If you deposit other assets, you will not be able to retrieve them.")}</p>
                ) : recharge_network === "BEVM" ? (
                  <p>{t("You can only deposit BTC-BEVM to this address. If you deposit other assets, you will not be able to retrieve them.")}</p>
                ) : (
                  <p>{t("You can only deposit BTC-Merlin to this address. If you deposit other assets, you will not be able to retrieve them.")}</p>
                )}
              </div>

              <div className="mt-4 text-center">
                <button className="btn btn-widt text-xs btn-sm" onClick={() => handleCopy(walletInfo?.wallet_account_address ?? "")}>
                  {t("Copy address")}
                </button>
              </div>
            </div>
          </div>
        )}></Modal>
    </div>
  );
};

export default Wallet;
