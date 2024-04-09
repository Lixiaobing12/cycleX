import { Statistic } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import WrapperButton from "../components/Common/Button";
import WrapperImg from "../components/Common/Img";
import { request } from "../utils/request";

type GlobalAggregates = {
  /**活跃贷款价值 */
  active_originated_amount_sum: number;
  /**贷款总额 */
  total_originated_amount_sum: number;
  /** apy */
  total_yield_avg: number;
  /** 时间 */
  updated_at: string;
};
const Airdrop = () => {
  const { t } = useTranslation();
  const [activeItem, setItem] = useState(0);
  const [globalAggregates, setGlobalAggregates] = useReducer<React.Reducer<GlobalAggregates, GlobalAggregates>>(
    (state, value) => {
      return { ...value };
    },
    {
      active_originated_amount_sum: 0,
      total_originated_amount_sum: 0,
      total_yield_avg: 0,
      updated_at: "",
    }
  );

  useEffect(() => {
    if (activeItem === 0) {
      request.get("/next/data/HQ50hhSBSC9hYQ7hQt7z5/index.json").then(({ data }) => {
        console.log("data", data);
      });
    }
  }, [activeItem]);
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/airdrop-bg.png" className="w-full h-[80vh]" alt="" />
        <p className="text-white text-4xl text-center absolute font-bold">{t("Leading world-class RWA trading platform")}</p>
      </div>
      <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-20">
        <div className="flex justify-between flex-wrap item-center">
          <div className="flex gap-6">
            <WrapperButton click={() => setItem(0)} isActive={activeItem === 0}>
              {t("Private Credit")}
            </WrapperButton>
            <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
              {t("U.S. Treasury")}
            </WrapperButton>
            <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
              {t("Stablecoin")}
            </WrapperButton>
          </div>
          <div className="flex gap-2 items-center">
            {t("Last Updated: Apr. 2024")}
            <a>
              <WrapperImg src="/assets/reflush.png" width={18} />
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center my-10">
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
          <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
