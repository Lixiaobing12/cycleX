import { Col, Empty, List, Pagination, Row, Table, TableProps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { request } from "../utils/request";

const Platform = () => {
  const { t, i18n } = useTranslation();
  const [, userInfo] = useAccounts();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const { handleTranslate } = useTranslateLocalStorage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const columns: TableProps<any>["columns"] = [
    {
      title: t("Category/Type"),
      dataIndex: "DescDct.key",
      key: "DescDct",
      width: 100,
      render(value, record, index) {
        return i18n.language === "en" ? record.DescDct.en : record.DescDct.zh;
      },
    },
    {
      title: t("Earnings/Change"),
      dataIndex: "Amount",
      key: "Amount",
      width: 100,
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
  const defaultPage = {
    page: 1,
    size: 10,
    total: 0,
  };
  const defaulttokenInfo = {
    TvlPresaleUsdAmount: 0,
    TvlPresaleTokenAmount: 0,
    OwnerTvlTokenAmount: 0,
    OwnerLockTokenAmount: 0,
    OwnerPengingTokenAmount: 0,
    OwnerReceiveTokenAmount: 0,
    OwnerPayUsdAmount: 0,
    OwnerBalance: 0,
  };
  const [tokenInfo, settokenInfo] = useState(defaulttokenInfo);
  const [totalValue, setTotalValue] = useState(0);
  const [dailyValue, setDailyValue] = useState(0);
  const [page, setPage] = useState(defaultPage);

  const handleChange = (_page: number, pageSize: number) => {
    page.page = _page;
    page.size = pageSize;
    fetch();
  };

  const fetch = () => {
    if (userInfo?.id) {
      setLoading(true);
      request
        .post("/sapi/presale/getInfoByUserId", {
          UserId: userInfo.id,
        })
        .then(async ({ data }) => {
          settokenInfo(data.data);
        });
      request
        .post("/sapi/tokenDetail/sum", {
          UserId: userInfo.id,
        })
        .then((res) => {
          setTotalValue(res.data.data.TotalSum * 0.001);
          setDailyValue(res.data.data.TodaySum * 0.001);
        });
      request
        .post("/sapi/tokenDetail/list", {
          UserId: userInfo?.id,
          Page: page.page,
          Size: page.size,
        })
        .then<any>(async ({ data }) => {
          if (Array.isArray(data.data)) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].DescDct = {
                key: data.data[i].Desc,
                en: await handleTranslate(data.data[i].Desc),
                zh: data.data[i].Desc,
              };
            }
            setPage({
              page: data.page.currentPage,
              size: 10,
              total: data.page.count,
            });
            setData(data.data);
            setLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    fetch();
  }, [userInfo]);
  return (
    <div className="w-full p-4 py-10 min-h-11/12">
      <Row justify="center">
        <Col xs={24} md={22} lg={18}>
          <div className="rounded-box bg-black flex flex-col p-8 gap-4 relative  bg-wallet bg-100">
            <button className=" btn btn-sm border-light bg-black text-white hover:text-black hover:bg-white w-fit absolute right-4 top-4" onClick={() => navigate("/wallet")}>
              {t("my assets")}
            </button>
            <div className="text-grey">{t("Total assets")} WFC</div>
            <div className="text-white text-2xl">
              <CountUp end={tokenInfo.OwnerTvlTokenAmount} separator="," decimal="." decimals={2} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full xl:w-2/3">
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Locked up")} WFC</div>
                <div className="text-white text-md">
                  <CountUp end={tokenInfo.OwnerLockTokenAmount} separator="," decimal="." decimals={2} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Released")} WFC</div>
                <div className="text-white text-md">
                  <CountUp end={tokenInfo.OwnerReceiveTokenAmount} separator="," decimal="." decimals={2} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Current valuation")}</div>
                <div className="text-white text-md">
                  <CountUp end={totalValue} separator="," decimal="." decimals={2} prefix="$" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Today's income")}</div>
                <div className="text-white text-md">
                  <CountUp end={dailyValue} separator="," decimal="." decimals={2} prefix={dailyValue > 0 ? "+$" : "$"} />
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
              dataSource={data}
              className="w-full"
              pagination={false}
              scroll={{ x: 500, y: 500 }}
              rowKey="Id"
              rootClassName="pretter-scroll"
              rowClassName="pretter-scroll"
            />
            {data.length > 0 && (
              <div className="text-right">
                <Pagination simple total={page.total} defaultCurrent={1} showSizeChanger onChange={handleChange} onShowSizeChange={handleChange} />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Platform;
