import * as echarts from "echarts";
import { graphic } from "echarts/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../utils/request";
import WrapperButton from "../Common/Button";
import { useAtom } from "jotai";
import { product_info } from "../../atom/product";

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
      <div className="flex gap-6 w-full flex-wrap">
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
const Performance = () => {
  const { t } = useTranslation();
  const [product, setProductInfo] = useAtom(product_info);
  return (
    <div className="flex flex-col w-full items-center  rounded-box shadow-2xl p-4 text-black">
      <div className="flex justify-between items-center w-full md:px-6 lg:px-10 3xl:px-14">
        <div>
          <div className="text-[#bbb] text-normal">{t("NAV Price Fluctuation Over 2 Years With Different Scenarios")}</div>
          <div>{
            product?.simple_name !== 'CDEX' ?
              '(+100%APY)' : '(+179.2%APY)'}</div>
        </div>
        <div>
          {
            product?.simple_name !== 'CDEX' &&
            <img src="/assets/box.png" alt="" className="w-28 lg:w-32 xl:w-32 2xl:w-32 animate__animated animate__pulse animate__infinite animate__slow" />
          }
          {/* <img src="/assets/incomegrowthboxbtn2.gif" className="w-36 lg:w-36 xl:w-36 2xl:w-40 mt-[-20px] mr-[-20px]" alt="" /> */}
        </div>
      </div>
      <div>
        <img src="/assets/performance.png" className="w-full" alt="" />
      </div>
    </div>
  );
};
export default Performance;
