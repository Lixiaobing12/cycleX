import * as echarts from "echarts";
import { graphic } from "echarts/core";
import { useEffect, useState } from "react";
import { request } from "../../utils/request";
import WrapperButton from "../Common/Button";

/** k线 */
const KLine = () => {
  const [activeItem, setItem] = useState(1);
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
          size: 40,
        },
      })
      .then(({ data }) => {
        const _list = data.data?.filter((l: any) => l?.yield_2y) || [];
        const homePlatformDataPosition2 = _list.map((l: any) => l.yield_2y);
        const XPositions = Array.from({ length: data.data.map((l: any) => l.yield_2y).length }, (value, index) => index);
        myChart.setOption(option(homePlatformDataPosition2, XPositions));
      });

    // const chart = new Chart({
    //   container: "ichart",
    //   autoFit: true,
    //   width: document.querySelector("#pv")!.clientWidth,
    // });
    // chart
    //   .line()
    //   .data({
    //     type: "fetch",
    //     value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
    //   })
    //   .encode("x", "date")
    //   .encode("y", "close");
    // chart.render();
  }, []);
  return (
    <div className="w-full pt-10 h-full" id="pv">
      <div className="flex gap-6 w-full">
        <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
          全部
        </WrapperButton>
        <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
          7日APY{" "}
        </WrapperButton>
        <WrapperButton click={() => setItem(3)} isActive={activeItem === 3}>
          累计派发利息{" "}
        </WrapperButton>
      </div>
      <div id="ichart" className="w-full min-h-[260px]"></div>
    </div>
  );
};

/** 海量资产实现 -- commonent */
const Reassets = () => {
  const lines = [
    { icon: "/assets/reicon1.png", title: "优质的资产和管理人", description: "基金专门投资与世界领先的高流动性资产" },
    { icon: "/assets/reicon2.png", title: "受监管和服务商提供", description: "我们的基金存放在独立的第三方存管处，进行周期性 NAV日常会计核算，并将接受年度审计" },
    { icon: "/assets/reicon3.png", title: "第三方审计的安全性", description: "实施最佳安全策略和措施，所有关键智能合约都经过审核和认证" },
    { icon: "/assets/reicon4.png", title: "经验丰富的管理团队", description: "执行团队来自于领先的资产管理机构和加密领域的丰富管理经验" },
  ];
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10">
      <div className="flex-1 w-full p-4 rounded-box shadow-2xl ">
        <KLine />
      </div>
      <div className="flex-1 flex flex-col gap-8">
        {lines.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <img src={item.icon} className="w-16 h-16" />
            <div className="flex flex-col">
              <div className="text-xl text-black font-bold font-whalebold opacity-85">{item.title}</div>
              <div className="text-greyblack text-md">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reassets;
