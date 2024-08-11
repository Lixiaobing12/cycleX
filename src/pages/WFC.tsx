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
          radius: "85%",
          data: [
            { value: 7.5, name: t("Ecosystems") },
            { value: 30, name: t("Team and Investors") },
            { value: 20, name: t("Early Airdrop") },
            { value: 17.5, name: t("Market Plan") },
            { value: 25, name: t("Market Liauidity and Trade") },
          ],
          label: {
            normal: {
              show: false,
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

  return <div id="pie" className="w-52 h-52"></div>;
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
            <h1 className="text-2xl leading-10 mb-4 font-bold font-gotham-bold ">{t("$WFC TOKEN")}</h1>
            <p className="leading-8 text-sm xl:leading-8 font-gotham text-base font-light">{t("wfc tips")}</p>
          </div>
          <div className="relative flex justify-center">
            <img src="/assets/wfccoin.png" className="w-44 lg:w-32 xl:w-48 z-10" alt="" />
            <div className="absolute top-16 md:top-48 z-[0] h-[650px] w-[1px] bg-[#575757] lg:hidden"></div>
          </div>
        </div>

        <div className="mb-6 p-6 text-white font-gotham relative">
          <div className="text-left text-2xl font-bold font-gotham-bold w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto">{t("Main Usage Scenarios")}</div>
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mt-10 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto">
            <div className="p-3 lg:pl-0 lg:py-0 lg:pr-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
              <img src="/assets/wfc_platform.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Platform Governance")}</h2>
                <ul>
                  <li className="list-none text-xs">{t("Vote on feature improvements")}</li>
                  <li className="list-none text-xs">{t("Vote on operational activities")}</li>
                  <li className="list-none text-xs">{t("Vote on fund issuance")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
              <img src="/assets/wfc_fund.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Fund Issuance")}</h2>
                <ul>
                  <li className="list-none text-xs">{t("Issue fund projects on the platform")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
              <img src="/assets/wfc_lp.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("LP Staking")}</h2>
                <ul>
                  <li className="list-none text-xs">{t("Participate in LP pledge of issued funds")}</li>
                  <li className="list-none text-xs">{t("Compete for LP staking rewards")}</li>
                </ul>
              </div>
            </div>

            <div className="p-3 lg:py-0 lg:px-6 w-full h-auto flex flex-row xl:flex-col items-start justify-start lg:justify-start lg:justify-start gap-4">
              <img src="/assets/wfc_airdrop.png" className="self-start w-14 lg:w-18" alt="" />
              <div>
                <h2 className="text-base">{t("Fund Airdrop")}</h2>
                <ul>
                  <li className="list-none text-xs">{t("Get airdrops from new issued fund")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 font-gotham">
        <div className="flex flex-col lg:flex-row items-stretch justify-center lg:gap-8 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto text-left font-bold text-base">
          <p>{t("$WFC plan")}</p>
        </div>
      </div>
      <div className="p-6 font-gotham">
        <div className="block lg:hidden">
          <div className="text-center text-xs font-bold font-gotham-bold">{t("Token Distribution Model")}</div>
          <div className="text-center text-base mt-2 font-bold font-gotham-bold">{t("Total supply $WFC 100,000,000,000")}</div>
        </div>

        <div className="flex items-center justify-between lg:gap-8 mt-10 w-full lg:w-10/12 xl:w-4/6 4xl:w-3/6 m-auto relative lg:mb-20">
          <div className="hidden lg:block border-t text-[#e5e7eb] h-[1px] absolute z-[0] w-[80%] right-[10%]"></div>
          <div className="hidden w-full lg:block lg:w-1/2">
            <div className="w-full flex flex-col items-start gap-8">
              <div className="text-center text-xs font-bold font-gotham-bold">{t("Token Distribution Model")}:</div>
              <Pie />
              <div className="text-center text-base mt-2 font-bold font-gotham-bold">{t("Total supply $WFC 100,000,000,000")}</div>
            </div>
          </div>
          {width > 768 ? (
            <div className="grid grid-cols-1 border-l pl-8 sticky gap-4 bg-white">
              {datas.map((data, index) => (
                <div key={index} className={`flex flex-col pb-2`}>
                  <div className="text-base font-bold">{data.value}</div>
                  <div className="text-xs">{t(data.name)}</div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="border-t py-4 w-full">
                {datas.map((data, index) => (
                  <div key={index} className="flex items-center w-full">
                    <div className="p-2 text-xs flex-1">{t(data.name)}</div>
                    <div className="text-base p-2 font-bold w-16">{data.value}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default WFC;
