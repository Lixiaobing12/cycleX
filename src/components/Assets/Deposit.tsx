import { Tabs } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { messageContext } from "../../App";
import { product_info } from "../../atom/product";
import useAccounts from "../../hooks/user";
import { scientific } from "../../utils/BigNumberToString";
import WrapperImg from "../Common/Img";

const ItemDeposit = () => {
  const [toast] = useAtom(messageContext);
  const [product] = useAtom(product_info);
  const [isSign, user, walletInfo] = useAccounts();
  const [amount, setAmount] = useState(0);
  const handlerClick = () => {
    if (!isSign) {
      toast?.warning("请先登录！");
    } else {
      const min = product?.min_pay;
      const balance = walletInfo?.balance;
      
    }
  };
  return (
    <div className="flex flex-col gap-4  text-greyblack font-bold">
      <div className="flex justify-between items-center">
        <span>结算期</span>
        <div className="rounded-full border border-light p-1 flex items-center px-4 gap-1">
          T+{product?.pay_t_n}
          <div>
            <img src="/assets/countdowm_notactive.png" width={16} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full relative items-center flex">
        <input type="number" className="w-full input bg-[#F7F8FA] rounded-md border-0" onChange={(e) => setAmount(Number(e.target.value))} placeholder={`最小购买数量${product?.min_pay}`} />
        <div className="absolute flex items-center right-4 gap-2">
          <div>
            <img src="/assets/usdt.png" width={20} />
          </div>
          <span className="text-black font-bold">USDT</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>最低金额：{product?.min_pay} USDT</div>
        <div>可用余额: {walletInfo?.balance ?? 0} USDT</div>
      </div>
      <button className="btn btn-block bg-[#161618] border-0 rounded-md text-white p-4" onClick={handlerClick}>
        {!isSign ? "请先登录" : "确定购买"}
      </button>
      <div className="flex items-center justify-center gap-1">
        <span>联系support@cyclex.com获取访问权限</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} />
          <WrapperImg src="/assets/transparent_telegram.png" width={18} />
        </div>
      </div>
    </div>
  );
};
const ItemWithDraw = () => {
  const [product] = useAtom(product_info);
  return (
    <div className="flex flex-col gap-4  text-greyblack font-bold">
      <div className="flex justify-between items-center">
        <span>结算期</span>
        <div className="rounded-full border border-light p-1 flex items-center px-4 gap-1">
          T+{product?.sell_t_n}
          <div>
            <img src="/assets/countdowm_notactive.png" width={16} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full relative items-center flex">
        <input type="text" className="w-full input bg-[#F7F8FA] rounded-md border-0" placeholder="最小购买数量1.0000" />
        <div className="absolute flex items-center right-4 gap-2">
          <div>
            <img src="/assets/usdt.png" width={20} />
          </div>
          <span className="text-black font-bold">USDT</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>最低金额：100,000 USDT</div>
        <div>1 CRFS =1000 USD</div>
      </div>
      <button className="button btn-block bg-[#161618] border-0 rounded-md text-white p-4">请先登录</button>
      <div className="flex items-center justify-center gap-1">
        <span>联系support@cyclex.com获取访问权限</span>
        <div className="flex items-center gap-1">
          <WrapperImg src="/assets/transparent_copy.png" width={18} />
          <WrapperImg src="/assets/transparent_telegram.png" width={18} />
        </div>
      </div>
    </div>
  );
};
const Card = () => {
  const [active, setActive] = useState("1");

  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 items-center">
          <span className="text-base">投资</span>
          <div>
            <img src={active === "1" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={18} />
          </div>
        </div>
      ),
      children: <ItemDeposit />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-1">
          <span className="text-base">赎回</span>
          <div>
            <img src={active === "2" ? "/assets/countdowm.png" : "/assets/countdowm_notactive.png"} width={18} />
          </div>
        </div>
      ),
      children: <ItemWithDraw />,
    },
  ];
  return (
    <div className="p-4 flex flex-col">
      <div className="inline-flex p-2 items-center gap-2 bg-[#F5F6F8] rounded-md w-fit">
        <img src="/assets/eth.png" width={20} />
        以太坊
        <img src="/assets/down.png" width={10} alt="" />
      </div>
      <div>
        <Tabs items={items} onChange={setActive}></Tabs>
      </div>
    </div>
  );
};
const Deposit = () => {
  const [toast] = useAtom(messageContext);
  const [product] = useAtom(product_info);
  const [, copy] = useCopyToClipboard();
  const assetsData = [
    { value: "$ " + scientific(product?.market_value ?? 0), name: "总资产" },
    { value: product?.rate ?? "0%", name: "管理费" },
    { value: "150%", name: "超额抵押率" },
    { value: product?.income2 ?? "5%", name: "收益率" },
  ];
  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast?.success("Copied!");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col gap-4">
          <span className="text-2xl mr-4">经公允审计的超额抵押方式代币化，无缝访问现实资产</span>
          <span className="text-greyblack">链上赚取无风险美国国债收益率，由6个月内到期的美国国债和逆回购提供全面支持</span>
          <div className="text-greyblack flex items-center gap-10">
            <div className="flex gap-2">
              <span>免责声明</span>
              <div>
                <WrapperImg src="/assets/goto.png" width={18} />
              </div>
            </div>
            <div className="flex gap-2">
              <span>发行摘要</span>
              <div>
                <WrapperImg src="/assets/goto.png" width={18} />
              </div>
            </div>
            <div className="flex gap-2">
              <span>ERC1400标准</span>
            </div>
          </div>
        </div>

        <div className="rounded-box border border-light p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            {assetsData.map((item, index) => (
              <div key={item.name} className="flex items-center relative flex-1">
                <div className="flex flex-col">
                  <div className="text-greyblack flex items-center">
                    <span>{item.name}</span>
                    <div>
                      <WrapperImg src="/assets/question.png" width={16} />
                    </div>
                  </div>
                  <div className="text-black text-2xl font-bold">{item.value}</div>
                </div>
                {index < 3 && <div className="divider divider-vertical w-px	h-2/3  bg-transblack absolute right-[20%]"></div>}
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFC] rounded-box p-4">
            <div className="join join-vertical w-full">
              <div className="join-item flex justify-between p-2 text-greyblack  border-b border-transblack">
                <div className="flex gap-2">
                  <span>审计报告</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
              </div>
              <div className="join-item flex justify-between p-2 text-greyblack border-b border-transblack">
                <div className="flex gap-2">
                  <span>流动性</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div>日交易量达 0.25 亿美元</div>
              </div>
              <div className="join-item flex justify-between p-2 text-greyblack">
                <div className="flex gap-2">
                  <span>链上地址</span>
                  <div>
                    <WrapperImg src="/assets/question.png" width={15} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span>{product?.contract_address.replace(/^(.{6}).*(.{4})$/, "$1...$2")}</span>
                    <WrapperImg src="/assets/copy.png" width={15} onClick={() => handleCopy(product?.contract_address ?? "")} />
                    <a href={`https://etherscan.io/address/${product?.contract_address}`} target="_blank">
                      <WrapperImg src="/assets/goto.png" width={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-greyblack">最后更新日期 {moment(product?.updated_at ?? "", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}</div>
        </div>
      </div>
      <div className="flex-1 rounded-box shadow-2xl p-4 pt-10">
        <Card />
      </div>
    </div>
  );
};

export default Deposit;
