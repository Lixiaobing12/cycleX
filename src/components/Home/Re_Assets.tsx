import * as echarts from "echarts";
import { graphic } from "echarts/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../utils/request";
import WrapperButton from "../Common/Button";

/** k线 */
const KLine = () => {
  const { t } = useTranslation();
  const [activeItem, setItem] = useState(40);
  const option = (lineDatas: number[], XPosition: number[]) => {
    return {
      grid: {
        x: 0,
        y: 60,
        x2: -10,
        y2: 0,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        show: false,
        axisTick: {
          show: false, // 设置为false来隐藏刻度线
        },
        axisLabel: {
          color: "rgba(0, 0, 0, 0.58)",
          fontSize: 11,
          align: "left",
          padding: [0, 5, 0, 5],
          formatter: function (value: any, index: any) {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 获取月份（注意：月份从0开始）
            if (month % 3 === 1) {
              // 每季度的第一个月显示刻度
              const quarter = Math.floor((month + 2) / 3); // 计算季度
              return `Q${quarter}/${year}`;
            } else {
              return ""; // 其他月份隐藏刻度
            }
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: ["rgba(0, 0, 0, 0.2)"],
          },
        },
        data: XPosition,
      },
      yAxis: [
        {
          type: "value",
          show: true,
          scale: true,
          min: 0, // 设置最小值为2
          max: 6, // 设置最大值为10
          interval: 1, // 设置刻度间隔为2
          splitNumber: 1, // 设置刻度线数量为8

          axisLabel: {
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: 9,

            interval: "auto",
            formatter: `{value}%`,
          },
          axisLine: {
            lineStyle: {
              color: ["rgba(0, 0, 0, 0.2)"],
            },
          },
          splitLine: {
            lineStyle: {
              width: 0.2,
              // 使用深浅的间隔色
              color: ["rgba(0, 0, 0, 0.2)"],
              //type: [15, 10, 5, 10, 15],
            },
          },
        },
      ],
      series: [
        {
          data: lineDatas,
          type: "line",
          color: "rgba(32, 89, 192, 1)",
          smooth: true,
          showSymbol: false,

          itemStyle: {
            normal: {
              lineStyle: {
                width: 0.8, // 0.1的线条是非常细的了
              },
            },
          },
          areaStyle: {
            opacity: 0.125,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0.8,
                color: "rgba(32, 89, 192, 0.1)",
              },
              {
                offset: 0,
                color: "rgba(32, 89, 192, 1)",
              },
            ]),
          },
        },
      ],
    };
  };

  useEffect(() => {
    var chartDom = document.getElementById("ichart");
    var myChart = echarts.init(chartDom);

    request
      .get("/api/api/bondState/getList", {
        params: {
          page: 0,
          size: activeItem,
        },
      })
      .then(({ data }) => {
        const _list = data.data?.filter((l: any) => l?.yield_2y) || [];
        const homePlatformDataPosition2 = _list.map((l: any) => l.yield_2y);
        const XPositions = Array.from({ length: data.data.map((l: any) => l.yield_2y).length }, (value, index) => index);
        myChart.setOption(option(homePlatformDataPosition2, XPositions));
      });
  }, [activeItem]);
  return (
    <div className="w-full pt-10 h-full" id="pv">
      <div className="flex gap-6 w-full">
        <WrapperButton click={() => setItem(40)} isActive={activeItem === 40}>
          {t("All")}
        </WrapperButton>
        <WrapperButton click={() => setItem(7)} isActive={activeItem === 7}>
          {t("7 APY")}
        </WrapperButton>
        <WrapperButton click={() => setItem(14)} isActive={activeItem === 14}>
          {t("Accumulated interest paid")}
        </WrapperButton>
      </div>
      <div id="ichart" className="w-full min-h-[260px]"></div>
    </div>
  );
};

/** 海量资产实现 -- commonent */
const Reassets = () => {
  const { t } = useTranslation();
  const lines = [
    { icon: "/assets/reicon1.png", title: t("Quality assets and managers"), description: t("The fund specializes in investing with the world's leading highly liquid assets") },
    {
      icon: "/assets/reicon2.png",
      title: t("Regulated and service provider provided"),
      description: t("Our funds are held in an independent third-party depository, subject to periodic daily NAV accounting and subject to annual audits"),
    },
    {
      icon: "/assets/reicon3.png",
      title: t("Third party audit security"),
      description: t("Implement the best security policies and practices, and all key smart contracts are audited and certified"),
    },
    {
      icon: "/assets/reicon4.png",
      title: t("Experienced management team"),
      description: t("The executive team draws from leading asset managers and extensive management experience in the crypto space"),
    },
  ];
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10">
      <div className="flex-1 w-full p-4 rounded-box shadow-2xl ">
        <KLine />
      </div>
      <div className="flex-1 flex flex-col gap-8">
        {lines.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <img src={item.icon} className="w-12 md:w-16 h-12 md:h-16" />
            <div className="flex flex-col">
              <div className="text-lg text-black font-bold font-whalebold opacity-85">{item.title}</div>
              <div className="text-greyblack text-sm">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reassets;
