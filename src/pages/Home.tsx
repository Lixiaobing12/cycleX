import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reassets from "../components/Home/Re_Assets";

const getAssetsBgImg = (ind = 1) => {
  return ind % 3 === 0 ? "bg-assets_t" : ind % 2 === 0 ? "bg-assets_s" : "bg-assets_f";
};
export default function Home() {
  const [openNotice, setNotice] = useState(true);
  const [assets, setAssetsItems] = useState([
    { name: "CUSDA", chars: ["随时申赎", "流动性强", "现实资产锚定"], apy: "5", price: "2M", id: 0 },
    { name: "CFRO", chars: ["可赎回", "收益稳定", "现实资产锚定"], apy: "5", price: "2M", id: 1 },
    { name: "CFRC", chars: ["可赎回", "上市收益", "现实资产锚定"], apy: "5", price: "2M", id: 2 },
  ]);
  const navigate = useNavigate();
  const openBook = () => {
    window.open("https://powpepe.gitbook.io/powpepe/", "_blank");
  };

  return (
    <>
      <div className="relative text-white">
        {openNotice && (
          <div className="bg-[#1a1a1a] w-full absolute top-0 h-[50px] leading-[50px] text-center">
            最新上线RWA
            <a className="ml-10 cursor-pointer">了解更多</a>
            <img src="/assets/x.png" className="absolute cursor-pointer top-[10px] right-10" width={25} onClick={() => setNotice(false)} />
          </div>
        )}
        <div className="relative flex items-center justify-center">
          <img src="/assets/home_content.png" className="w-full h-[80vh]" alt="" />
          <div className="absolute flex flex-col items-center mt-[-120px]">
            <p className="tracking-widest	text-4xl font-bold mb-10">代币化基金已上线</p>
            <p className="text-grey text-center tracking-widest leading-relaxed">
              CycleX致力于创造透明、安全的代币化资产交易平台，无论在世界的
              <br />
              任何地方，让用户更便捷的持有全球优质资产
            </p>
          </div>
        </div>
        <div className="flex p-4 lg:p-20 md:p-10 mt-20 flex-wrap gap-6 item-center justify-center">
          {assets.map((item, ind) => (
            <div key={item.id} className={`bg-black rounded-box p-4 flex flex-col ${getAssetsBgImg(ind++)} w-full lg:w-[26%] min-h-80 bg-100`}>
              <div className="flex items-center my-4">
                <img src="/assets/dollor_r.png" width={30} alt="" />
                <span className="text-3xl font-bold ml-2">{item.name}</span>
              </div>
              <div className="flex max-w-[70%] flex-wrap gap-4 mb-10">
                {item.chars.map((ch) => (
                  <div className="rounded-full px-4 py-1 bg-[#222] text-grey" key={ch}>
                    {ch}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-3xl font-bold">{item.apy}%</span>年化收益率(APY)
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4 font-bold">
                  <div className="leading-normal text-base bg-white rounded-full px-4 py-1 text-[#000]">$ {item.price} AUM</div>
                  <img src="/assets/eth.png" width={38} alt="" />
                </div>
                <img src="/assets/right.png" width={38} className="cursor-pointer hover:scale-105" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10">
          <div className="w-full text-center mb-20">
            <h1 className="text-black text-3xl mb-6">海量资产实现</h1>
            <p className="text-greyblack">经公允审计的超额抵押方式代币化，无缝访问现实资产</p>
          </div>
          <Reassets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10">
          <div className="w-full text-center mb-20">
            <h1 className="text-black text-3xl mb-6">资产列表</h1>
            <p className="text-greyblack">最可靠的真实资产，通过代币化实现标准的机构型金融产品</p>
          </div>
          <Reassets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10">
          <div className="w-full text-center mb-20">
            <h1 className="text-black text-3xl mb-6">资产储备证明（POR）</h1>
            <p className="text-greyblack">新增/锁定的现实资产每月更新/次，通过权威审计机构披露</p>
          </div>
          <Reassets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10">
          <div className="w-full text-center mb-20">
            <h1 className="text-black text-3xl mb-6">交易流程</h1>
            <p className="text-greyblack">购买代币化资产最便捷的方式，无需面临繁琐的交易流程</p>
          </div>
          <Reassets />
        </div>
      </div>
    </>
  );
}
