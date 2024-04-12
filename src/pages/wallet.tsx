import { Col, Row, Table, TableProps } from "antd";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCopyToClipboard } from "usehooks-ts";
import { messageContext, modalContext } from "../App";
import WrapperImg from "../components/Common/Img";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { RechargeType } from "../types/Recharge";
import { request } from "../utils/request";

const Wallet = () => {
  const [toast] = useAtom(messageContext);
  const [, copy] = useCopyToClipboard();
  const { t, i18n } = useTranslation();
  const page = useRef({
    page: 1,
    size: 50,
  });
  const [rechargeInfo, setRechargeInfo] = useState<RechargeType>();
  const navigate = useNavigate();
  const [modal] = useAtom(modalContext);
  const { handleTranslate } = useTranslateLocalStorage();
  const [isSign, user, walletInfo] = useAccounts();
  const [records, setRecords] = useState<any[]>([]);
  const total_assets = useMemo(() => {
    let total = Number(
      Number(walletInfo?.balance || 0) + Number(walletInfo?.freeze || 0) + Number(walletInfo?.current_amount || 0) + Number(walletInfo?.regular_amount || 0) + Number(walletInfo?.fund_amount || 0)
    );
    return walletInfo ? total : 0;
  }, [walletInfo]);
  const columns: TableProps<any>["columns"] = [
    {
      title: t("Category/type"),
      dataIndex: "description",
      key: "description",
      width: 100,
      render(value, record, index) {
        return i18n.language === "en" ? record.descDcts.en : record.descDcts.zh;
      },
    },
    {
      title: t("Earnings/Change"),
      dataIndex: "balance_change",
      key: "balance_change",
      width: 100,
      render(value, record, index) {
        return value + " USDT";
      },
    },
    {
      title: t("Update Time"),
      dataIndex: "updated_at",
      key: "updated_at",
      width: 100,
    },
  ];

  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast?.success("Copied!");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  const Recharge = async () => {
    const context: any = modal?.info({
      closable: false,
      icon: <></>,
      onCancel: () => context.destroy(),
      title: null,
      width: 600,
      maskClosable: true,
      content: (
        <div className="w-full flex flex-col items-center pointer-events-auto relative">
          <img src="/assets/close.png" className="absolute cursor-pointer top-0 right-0" width={25} onClick={() => context.destroy()} />

          <strong className="text-2xl">Recharge</strong>

          <div className="w-full p-2 flex flex-col gap-2 mt-4">
            <div className="bg-lightgrey rounded-md p-2 flex items-center gap-2">
              <img src="/assets/usdt.png" width={22} alt="" />
              <span>USDT</span>
            </div>

            <div className="mt-4">{t("Recharge network")}</div>
            <div className="bg-lightgrey rounded-md p-2 flex items-center gap-2">USDT-ERC20</div>

            <div className="mt-4">{t("Recharge address")}</div>
            <div className="bg-lightgrey rounded-md p-2 flex items-center gap-2 truncate">
              <WrapperImg src="/assets/copy-active.png" width={18} onClick={() => handleCopy(walletInfo?.wallet_account_address ?? "")} />
              {walletInfo?.wallet_account_address}
            </div>

            <div className="mt-4 bg-lightgrey rounded-md p-4 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-threePranentTransblack">{t("Minimum recharge amount")}</span>
                <span>{Number(rechargeInfo?.deposit_min).toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-threePranentTransblack">{t("Number of block confirmations")}</span>
                <span>{i18n.language === "en" ? rechargeInfo?.deposit_account_dct?.en : rechargeInfo?.deposit_account_dct?.zh}</span>
              </div>
            </div>
            <div className="mt-2">
              <p>{t("You can only deposit USDT-ERC20 to this address. If you deposit other assets, you will not be able to retrieve them.")}</p>
            </div>

            <div className="mt-4 text-center">
              <button className="btn btn-widt" onClick={() => handleCopy(walletInfo?.wallet_account_address ?? "")}>
                {t("Copy address")}
              </button>
            </div>
          </div>
        </div>
      ),
      centered: true,
      footer: null,
    });
  };
  const fetch = () => {
    request
      .post("/api/api/walletAccountAssetChange/getList", {
        category_code: "ALL",
        page: page.current.page,
        size: page.current.size,
      })
      .then(async ({ data }) => {
        if (Array.isArray(data.data)) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].descDcts = {
              key: data.data[i].description,
              zh: data.data[i].description,
              en: await handleTranslate(data.data[i].description),
            };
          }
          setRecords(data.data);
        }
      });
    request.post("/api/api/asset/getDetail", { id: 3 }).then(async ({ data }: any) => {
      data.data.deposit_account_dct = {
        key: data.data.deposit_account,
        en: await handleTranslate(data.data.deposit_account),
        zh: data.data.deposit_account,
      };
      setRechargeInfo(data.data);
    });
  };
  useEffect(fetch, []);
  return (
    <div className="w-full p-4 py-10 min-h-11/12">
      <Row justify="center">
        <Col xs={24} md={22} lg={18}>
          <div className="rounded-box bg-black flex flex-col p-8 gap-4 relative">
            <div className="absolute right-4 top-4 flex gap-2">
              <button className=" btn btn-sm border-grey text-white hover:text-black hover:bg-white" onClick={Recharge}>
                {t("Recharge")}
              </button>
              <button className=" btn btn-sm border-grey text-white hover:text-black hover:bg-white" onClick={() => navigate("/platform")}>
                WFC
              </button>
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
                  <CountUp end={Number(walletInfo?.yesterday_output) ?? 0} separator="," decimal="." decimals={2} prefix={Number(walletInfo?.yesterday_output) > 0 ? "+" : "-"} />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-start md:items-end">
                <div className="text-white text-md">{t("wallet")}</div>
                <div className="text-grey text-md flex gap-2 items-center">
                  <div>
                    {window.innerWidth < 600
                      ? (walletInfo?.wallet_account_address ?? ethers.constants.AddressZero).replace(/^(.{6}).*(.{6})$/, "$1...$2")
                      : walletInfo?.wallet_account_address ?? ethers.constants.AddressZero}
                  </div>
                  <WrapperImg src="/assets/copy.png" width={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-14">
            <Table columns={columns} dataSource={records} pagination={false} className="w-full" scroll={{ x: 500, y: 500 }} rowKey="id" rootClassName="pretter-scroll" rowClassName="pretter-scroll" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wallet;
