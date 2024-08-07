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
            { value: 25, name: t("Market Liauidity and Trade") },
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
  const { width } = useWindowSize();
  const { t, i18n } = useTranslation();
  const datas = [
    { name: "Ecosystems", value: "7.5%", className: "border-r border-b lg:border-0" },
    { name: "Team and Investors", value: "30%", className: "border-b pl-2 lg:border-0" },
    { name: "Early Airdrop", value: "20%", className: "border-r border-b pt-2 lg:border-0" },
    { name: "Market Plan", value: "17.5%", className: "border-b pl-2 pt-2 lg:border-0" },
    { name: "Market Liauidity and Trade", value: "25%", className: "border-r pt-2 lg:border-0" },
  ];

  return (
    <div>
      <div className="bg-wfc_barner_bg bg-100 relative pb-1">
        <div className="w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto flex justify-between items-center xl:items-start p-4 pt-10">
          <div className="text-white max-w-[500px]">
            <h1 className="text-2xl leading-10 mb-4 font-bold font-gotham-bold ">{t("$WFC Token")}</h1>
            <p className="leading-8 text-sm xl:leading-8 font-gotham text-base font-light">{t("wfc tips")}</p>
          </div>
          <div>
            <img src="/assets/wfccoin.png" className="w-44 lg:w-32 xl:w-48" alt="" />
          </div>
        </div>

        <div className="mb-20 p-6 text-white font-gotham">
          <div className="text-left text-2xl font-bold font-gotham-bold w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto">{t("Main Usage Scenarios")}</div>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mt-10 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto">
            <div className="p-3 lg:pl-0 lg:py-0 lg:pr-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4 border-b lg:border-0 lg:border-r border-[#2b2b2b]">
              <img src="/assets/wfc_platform.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Platform Governance")}</h2>
                <ul>
                  <li className="list-none text-xs">· {t("Vote on feature improvements")}</li>
                  <li className="list-none text-xs">· {t("Vote on operational activities")}</li>
                  <li className="list-none text-xs">· {t("Vote on fund issuance")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4 border-b lg:border-0 lg:border-r border-[#2b2b2b]">
              <img src="/assets/wfc_fund.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Fund Issuance")}</h2>
                <ul>
                  <li className="list-none text-xs">· {t("Issue fund projects on the platform")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4 border-b lg:border-0 lg:border-r border-[#2b2b2b]">
              <img src="/assets/wfc_lp.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("LP Staking")}</h2>
                <ul>
                  <li className="list-none text-xs">· {t("Participate in LP pledge of issued funds")}</li>
                  <li className="list-none text-xs">· {t("Compete for LP staking rewards")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
              <img src="/assets/wfc_airdrop.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Fund Airdrop")}</h2>
                <ul>
                  <li className="list-none text-xs">· {t("Get airdrops from new issued fund")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 font-gotham">
        <div className="flex flex-col lg:flex-row items-stretch justify-center lg:gap-8 mt-10 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto text-center">
          <p>{t("$WFC plan")}</p>
        </div>
      </div>
      <div className="mt-12 p-6 font-gotham">
        <div className="text-center text-xl font-bold font-gotham-bold">{t("Token Distribution Model")}</div>
        <div className="text-center text-base mt-2">{t("Total supply $WFC 100,000,000,000")}</div>

        <div className="flex flex-col lg:flex-row items-stretch justify-around lg:gap-8 mt-10 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto ">
          {width > 768 ? (
            <div className="grid grid-cols-2 mb-[-40px] lg:mb-0">
              {datas.map((data, index) => (
                <div key={index} className={`flex flex-col pb-2 ${data.className}`}>
                  <div className="text-xl">{data.value}</div>
                  <div>{t(data.name)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-[-40px] lg:mb-0">
              {datas.map((data, index) => (
                <div key={index} className="grid grid-cols-3">
                  <div className="col-span-2 border-b border-r p-2">{t(data.name)}</div>
                  <div className="text-base border-b p-2">{data.value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="w-full lg:w-1/2">
            <Pie />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WFC;
