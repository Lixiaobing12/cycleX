import { Col, Empty, List, Pagination, Row } from "antd";
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
  const [data, setData] = useState<any[]>([]);
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
  const [page, setPage] = useState(defaultPage);

  const handleChange = (_page: number) => {
    page.page = _page;
    fetch();
  };

  const fetch = () => {
    if (userInfo?.id) {
      request
        .post("/sapi/presale/getInfoByUserId", {
          UserId: userInfo?.id || 10000006,
        })
        .then(async ({ data }) => {
          settokenInfo(data.data);
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
            <div className="flex gap-4 md:gap-14 flex-wrap">
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("Locked up")} WFC</div>
                <div className="text-white text-md">
                  <CountUp end={tokenInfo.OwnerLockTokenAmount} separator="," decimal="." decimals={2} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">{t("released")} WFC</div>
                <div className="text-white text-md">
                  <CountUp end={tokenInfo.OwnerReceiveTokenAmount} separator="," decimal="." decimals={2} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-14">
            <div className="text-center text-black text-2xl mb-10">{t("WFC records")}</div>
            <div className="bg-transblack rounded-box">
              {data.length ? (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item key={index}>
                        <div className="p-4 w-full grid grid-cols-3 text-center">
                          <div>{i18n.language === "en" ? item.DescDct.en : item.DescDct.zh}</div>
                          <div>{item.Amount} WFC</div>
                          <div>{moment(item.UpdatedAt as any).format("MM-DD HH:mm")}</div>
                        </div>
                      </List.Item>
                    )}
                  />
                  <div className="text-right">
                    <Pagination simple total={page.total} onChange={handleChange} />
                  </div>
                </>
              ) : (
                <Empty description="not Data" />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Platform;
