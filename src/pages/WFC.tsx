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

const Pie = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    var chartDom = document.getElementById("pie");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ["#080808", "#A9AEC0", "#878B9B", "#474A55", "#DCDFEA"],
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
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
              formatter: "{b} ({d}%)",
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
  }, [i18n.language]);

  return <div id="pie" className="w-full h-80"></div>;
};

const WFC = () => {
  const [toast] = useAtom(messageContext);
  const { t, i18n } = useTranslation();
  const datas = [
    { name: "Ecosystems", value: "7.5%" },
    { name: "Team and Investors", value: "30%" },
    { name: "Early Airdrop", value: "20%" },
    { name: "Market Plan", value: "17.5%" },
    { name: "Market Liauidityand Trade", value: "25%" },
  ];

  return (
    <div>
      <div className="relative flex items-center justify-center bg-black">
        <img src="/assets/wfcbg.png" className="w-full lg:w-4/5 h-56 lg:h-96 object-cover ml-auto" alt="" />
        <div className="w-full absolute left-0 right-0 flex justify-around items-center xl:items-start p-4 xl:p-0">
          <div className="text-white max-w-[400px]">
            <h1 className="text-2xl leading-10 mb-4">{t("$WFC Token")}</h1>
            <p className="leading-5 xl:leading-8 font-normal">{t("wfc tips")}</p>
          </div>
          <img src="/assets/wfccoin.png" className="w-28 xl:w-48" alt="" />
        </div>
      </div>

      <div className="mt-16 p-6">
        <div className="text-center text-2xl">{t("Main usage scenarios")}</div>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mt-10 w-full lg:w-11/12 2xl:w-5/6 m-auto">
          <div className="shadow-xl rounded-box p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-center lg:justify-start gap-4">
            <img src="/assets/wfc_platform.png" className="self-start w-12 lg:w-20" alt="" />
            <div>
              <h2 className="text-lg">{t("Platform Governance")}</h2>
              <ul>
                <li className="list-none">· {t("Vote on feature improvements")}</li>
                <li className="list-none">· {t("Vote on operational activities")}</li>
                <li className="list-none">· {t("Vote on fund issuance")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-center lg:justify-start gap-4">
            <img src="/assets/wfc_fund.png" className="self-start w-12 lg:w-20" alt="" />
            <div>
              <h2 className="text-lg">{t("Fund Issuance")}</h2>
              <ul>
                <li className="list-none">· {t("Issue fund projects on the platform")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-center lg:justify-start gap-4">
            <img src="/assets/wfc_lp.png" className="self-start w-12 lg:w-20" alt="" />
            <div>
              <h2 className="text-lg">{t("LP Staking")}</h2>
              <ul>
                <li className="list-none">· {t("Participate in LP pledge of issued funds")}</li>
                <li className="list-none">· {t("Compete for LP staking rewards")}</li>
              </ul>
            </div>
          </div>

          <div className="shadow-xl rounded-box p-6 w-full h-auto flex flex-row xl:flex-col items-start justify-center lg:justify-start gap-4">
            <img src="/assets/wfc_airdrop.png" className="self-start w-12 lg:w-20" alt="" />
            <div>
              <h2 className="text-lg">{t("Fund Airdrop")}</h2>
              <ul>
                <li className="list-none">· {t("Get airdrops from new issued fund")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 p-6">
        <div className="text-center text-2xl">{t("Token Distribution Model")}</div>
        <div className="text-center text-lg mt-4">{t("Total supply $WFC 100,000,000,000")}</div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mt-10 w-full lg:w-11/12 2xl:w-5/6 m-auto">
          <div className="grid grid-cols-2 gap-4">
            {datas.map((data, index) => (
              <div key={index} className="flex flex-col">
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
