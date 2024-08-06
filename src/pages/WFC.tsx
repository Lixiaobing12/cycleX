import { Divider, Statistic } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import WrapperButton from "../components/Common/Button";
import WrapperImg from "../components/Common/Img";
import * as echarts from "echarts";
import { request } from "../utils/request";
import { useWindowSize } from "usehooks-ts";

const Pie = () => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowSize();
  useEffect(() => {
    var chartDom = document.getElementById("pie");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ["#080808", "#A9AEC0", "#878B9B", "#474A55", "#DCDFEA"],
      series: [
        {
          type: "pie",
          radius: width > 768 ? [0, "60%"] : "38%",
          data: [
            { value: 7.5, name: t("Ecosystems") },
            { value: 30, name: t("Team and Investors") },
            { value: 20, name: t("Early Airdrop") },
            { value: 17.5, name: t("Market Plan") },
            { value: 25, name: t("Market Liauidityand Trade") },
          ],
          label: {
            normal: {
              show: true,
              formatter: "{d}%\n{b}",
              overflow: "break",
            },
          },
          labelLine: {
            lineStyle: {
              type: "dashed",
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }, [i18n.language, width]);

  return <div id="pie" className="w-full h-80"></div>;
};

const WFC = () => {
  const { t, i18n } = useTranslation();
  const datas = [
    { name: "Ecosystems", value: "7.5%", className: "border-r border-b lg:border-0" },
    { name: "Team and Investors", value: "30%", className: "border-b pl-2 lg:border-0" },
    { name: "Early Airdrop", value: "20%", className: "border-r border-b pt-2 lg:border-0" },
    { name: "Market Plan", value: "17.5%", className: "border-b pl-2 pt-2 lg:border-0" },
    { name: "Market Liauidityand Trade", value: "25%", className: "border-r pt-2 lg:border-0" },
  ];

  return (
    <div>
      <div className="relative flex items-center justify-center bg-black">
        <img src="/assets/wfcbg.png" className="w-full lg:w-4/5 h-56 lg:h-80 object-cover ml-auto" alt="" />
        <div className="w-full lg:w-10/12 2xl:w-4/6 m-auto absolute left-0 right-0 flex justify-between items-center xl:items-start p-4">
          <div className="text-white max-w-[500px]">
            <h1 className="text-2xl leading-10 mb-4 font-normal">{t("$WFC Token")}</h1>
            <p className="leading-5 xl:leading-8 font-normal font-">{t("wfc tips")}</p>
          </div>
          <img src="/assets/wfccoin.png" className="w-20 xl:w-40" alt="" />
        </div>
      </div>

      <div className="mt-16 p-6">
        <div className="text-center text-xl">{t("Main usage scenarios")}</div>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mt-10 w-full lg:w-11/12 2xl:w-4/6 m-auto">
          <div className="shadow-xl rounded-box p-4 lg:p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
            <img src="/assets/wfc_platform.png" className="self-start w-12 lg:w-18" alt="" />
            <div>
              <h2 className="text-lg">{t("Platform Governance")}</h2>
              <ul>
                <li className="list-none">· {t("Vote on feature improvements")}</li>
                <li className="list-none">· {t("Vote on operational activities")}</li>
                <li className="list-none">· {t("Vote on fund issuance")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-4 lg:p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
            <img src="/assets/wfc_fund.png" className="self-start w-12 lg:w-18" alt="" />
            <div>
              <h2 className="text-lg">{t("Fund Issuance")}</h2>
              <ul>
                <li className="list-none">· {t("Issue fund projects on the platform")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-4 lg:p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
            <img src="/assets/wfc_lp.png" className="self-start w-12 lg:w-18" alt="" />
            <div>
              <h2 className="text-lg">{t("LP Staking")}</h2>
              <ul>
                <li className="list-none">· {t("Participate in LP pledge of issued funds")}</li>
                <li className="list-none">· {t("Compete for LP staking rewards")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-4 lg:p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
            <img src="/assets/wfc_airdrop.png" className="self-start w-12 lg:w-18" alt="" />
            <div>
              <h2 className="text-lg">{t("Fund Airdrop")}</h2>
              <ul>
                <li className="list-none">· {t("Get airdrops from new issued fund")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6">
        <div className="text-center text-xl font-bold font-whalebold">{t("Token Distribution Model")}</div>
        <div className="text-center text-base mt-4">{t("Total supply $WFC 100,000,000,000")}</div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center lg:gap-8 mt-10 w-full lg:w-11/12 2xl:w-5/6 m-auto">
          <div className="grid grid-cols-2 mb-[-40px] lg:mb-0">
            {datas.map((data, index) => (
              <div key={index} className={`flex flex-col pb-2 ${data.className}`}>
                <div className="text-xl">{data.value}</div>
                <div>{t(data.name)}</div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <Pie />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WFC;
