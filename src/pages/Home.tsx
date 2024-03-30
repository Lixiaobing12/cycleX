import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import News from "../components/Home/News";
import Process from "../components/Home/Process";
import ProofAssets from "../components/Home/Proof_Assets";
import Reassets from "../components/Home/Re_Assets";
import TodoListAssets from "../components/Home/Todo_Assets";
import { fundProductApiType } from "../types/fundProduct";
import { scientific } from "../utils/BigNumberToString";

const getAssetsBgImg = (ind = 1) => {
  return ind % 3 === 0 ? "bg-assets_t" : ind % 2 === 0 ? "bg-assets_s" : "bg-assets_f";
};
export default function Home() {
  const [openNotice, setNotice] = useState(true);
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  const navigate = useNavigate();
  const openBook = () => {
    window.open("https://powpepe.gitbook.io/powpepe/", "_blank");
  };
  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
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
          <img src="/assets/home_content.png" className="w-full h-screen md:h-[80vh]" alt="" />
          <div className="absolute flex flex-col items-center mt-[-120px]">
            <p className="tracking-widest	text-4xl font-bold mb-10">代币化基金已上线</p>
            <p className="text-grey text-center tracking-widest leading-relaxed">
              CycleX致力于创造透明、安全的代币化资产交易平台，无论在世界的
              <br />
              任何地方，让用户更便捷的持有全球优质资产
            </p>
          </div>
        </div>
        <div className="flex p-4 lg:p-20 md:p-10 mt-20 flex-wrap gap-6 item-center justify-center" id="fund">
          {assets.map((item, ind) => (
            <div key={item.id} className={`bg-black rounded-box p-4 flex flex-col ${getAssetsBgImg(ind++)} w-full lg:w-[26%] min-h-80 bg-100`}>
              <div className="flex items-center my-4">
                <img src="/assets/dollor_r.png" width={30} alt="" />
                <span className="text-3xl font-bold ml-2">{item.name}</span>
              </div>
              <div className="flex max-w-[70%] flex-wrap gap-4 mb-10">
                {item.labels.map((ch) => (
                  <div className="rounded-full px-4 py-1 bg-[#222] text-grey" key={ch}>
                    {ch}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-3xl font-bold">{item.income2}</span>年化收益率(APY)
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4 font-bold">
                  <div className="leading-normal text-base bg-white rounded-full px-4 py-1 text-[#000]">$ {scientific(item.market_value)} AUM</div>
                  <img src="/assets/eth.png" width={38} alt="" />
                </div>
                <img src="/assets/right.png" width={38} className="cursor-pointer hover:scale-105" onClick={() => navigate(`/assets/${item.id}`)} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">海量资产实现</h1>
            <p className="text-greyblack">经公允审计的超额抵押方式代币化，无缝访问现实资产</p>
          </div>
          <Reassets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">资产列表</h1>
            <p className="text-greyblack">最可靠的真实资产，通过代币化实现标准的机构型金融产品</p>
          </div>
          <TodoListAssets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">资产储备证明（POR）</h1>
            <p className="text-greyblack">新增/锁定的现实资产每月更新/次，通过权威审计机构披露</p>
          </div>
          <ProofAssets />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">交易流程</h1>
            <p className="text-greyblack">购买代币化资产最便捷的方式，无需面临繁琐的交易流程</p>
          </div>
          <Process />
          <div className="flex flex-col gap-4 items-left text-black mt-12 ml-0 lg:ml-40">
            <h2 className="text-xl font-bold">温馨提示</h2>
            <p>
              <span className="font-bold">*资产SPV</span> <span className="text-greyblack ml-4">对应代币化基金锚定相应的底层资产并经审计及确权，确保资产安全并透明化</span>
            </p>
            <p>
              <span className="font-bold">*发行阶段</span> <span className="text-greyblack ml-4">CycleX App 发行该代币化资产/基金，并部署至公链，目前仅支持以太坊，未来将新增，届时请查阅更新提示</span>
            </p>
            <p>
              <span className="font-bold">*平台交易</span> <span className="text-greyblack ml-4">用户在平台提交KYC审核并投资该类资产，根据资产类别提供封闭/开放，购买完成后即可持仓享有对应收益</span>
            </p>
            <p>
              <span className="font-bold">*获得收益</span> <span className="text-greyblack ml-4">用户至CycleX App根据已投资的产品列表选择产品提交至C2C交易大厅转让/不同种类产品可自动赎回</span>
            </p>
          </div>
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10" id="download">
          <div className="w-full lg:w-5/6 m-auto rounded-box bg-[#19191A] flex justify-around px-4 md:px-10 flex-col md:flex-row pt-10">
            <div className="flex-1 flex flex-col gap-6 md:mt-[8%] md:ml-[5%]">
              <h2 className="text-2xl">下载我们的产品进行投资</h2>
              <h2 className="text-2xl">CycleX App</h2>
              <p>全球化RWA交易平台，这里有你需要的一切资产</p>
              <div className="flex gap-8 items-center mt-10">
                <a href="https://mp-cd080341-1a5f-41e1-a2ff-373ad4347341.cdn.bspapp.com/cyclex/cyclex_latest.apk" className="w-2/6 cursor-pointer">
                  <img src="/assets/download-googleplay.png" alt="" />
                </a>
                <img src="/assets/download-appstore.png" className="w-2/6 cursor-pointer" onClick={() => window.open("https://apps.apple.com/us/app/cyclex/id6464595733")} alt="" />
              </div>
            </div>
            <div className="flex-1">
              <img src="/assets/download-phone.png" alt="" />
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">常见问题</h1>
          </div>
          <div className="w-full lg:w-5/6 m-auto rounded-box border border-light p-6">
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold">资产的发行和赎回流程有哪些？</summary>
              <div className="collapse-content">
                <h2>代币化资产主要3个流程:</h2>
                <p>1.创建，创建新的代币资产</p>
                <p>2.赎回，投资者将代币返还给Cycle以收回资金（加上应计收益）</p>
                <p>3.转账，投资者可在CycleX App转让市场提交转让/出售代币</p>
              </div>
            </details>
            <div className="divider my-0"></div>
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold">用户如何进行KYC认证流程？</summary>
              <div className="collapse-content">
                <p>个人及机构投资者可在CycleX官网或App提交KYC审核，我们将在1-3个工作日协助您完成KYC审核流程，用户可根据App的提示流程进行操作</p>
              </div>
            </details>
            <div className="divider my-0"></div>
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold">资产标的构成和管理是怎样的？</summary>
              <div className="collapse-content">
                <p>资产管理公司： 指导服务提供商并管理基金的普通合伙人（GP）</p>
                <p>基金经理：协助基金发行并提供基金管理服务</p>
                <p>技术服务公司：提供基金代币比的技术服务支持</p>
                <p>代币化资产: 资产管理公司管理的SPV资产主体控制</p>
                <p>CycleX App：提供项目发布、用户交易管理、申赎和转让流程。</p>
                <p>资产净值咨询：独立基金管理人负责会计和报告（例如计算每日资产净值价格）</p>
              </div>
            </details>
            <div className="divider my-0"></div>
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold">收取哪些费用？</summary>
              <div className="collapse-content">
                <p>管理费：根据资产类别不同，收取相应的管理费用，平均控制在0.1-2%区间（可根据单一资产披露进行查看）</p>
                <p>交易手续费：暂不收取</p>
              </div>
            </details>
          </div>
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">新闻和洞见</h1>
          </div>
          <div className="w-full lg:w-5/6 m-auto">
            <News />
          </div>
        </div>
      </div>
    </>
  );
}
