import { Chart } from "@antv/g2";
import { useEffect, useState } from "react";
import WrapperButton from "../Common/Button";

/** k线 */
const KLine = () => {
  const [activeItem, setItem] = useState(1);

  useEffect(() => {
    const chart = new Chart({
      container: "ichart",
      autoFit: true,
      width: document.querySelector("#pv")!.clientWidth,
    });
    chart
      .line()
      .data({
        type: "fetch",
        value: "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
      })
      .encode("x", "date")
      .encode("y", "close");
    chart.render();
  }, []);
  return (
    <div className="w-full rounded-box shadow-2xl p-4 pt-10" id="pv">
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
      <div id="ichart"></div>
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
      <div className="flex-1">
        <KLine />
      </div>
      <div className="flex-1 flex flex-col gap-8">
        {lines.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <img src={item.icon} className="w-16 h-16" />
            <div className="flex flex-col">
              <div className="text-xl text-black font-bold opacity-85">{item.title}</div>
              <div className="text-greyblack text-md">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reassets;
