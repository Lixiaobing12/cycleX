import { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";
import { product_info } from "../atom/product";
import Constitute from "../components/Assets/Constitute";
import Deposit from "../components/Assets/Deposit";
import Performance from "../components/Assets/Performance";
import { fundProductApiType } from "../types/fundProduct";
import { scientific } from "../utils/BigNumberToString";
import { request } from "../utils/request";

export default function Assets() {
  const params = useParams();
  const [product, setProductInfo] = useAtom(product_info);

  useEffect(() => {
    request.post("/api/api/fundProduct/getDetail", { id: params.id }).then(({ data }: { data: AxiosResponse<fundProductApiType> }) => {
      setProductInfo(data.data);
    });
   
  }, [params]);
  return (
    <>
      <div className="relative text-white">
        <div className="relative flex items-center justify-center">
          <img src="/assets/assets_bg.png" className="w-full h-[80vh]" alt="" />
          <div className="absolute flex flex-col left-4 top-[20%] md:left-[20%] ">
            <p className="tracking-widest	text-4xl font-bold font-whalebold mb-8 flex items-center gap-4">
              <img src="/assets/assets_dollor.png" className="w-14" alt="" />
              <span>{product?.name}</span>
            </p>
            <p className="text-grey text-center tracking-widest leading-relaxed text-xl w-full md:max-w-[600px]" dangerouslySetInnerHTML={{ __html: product?.desc ?? "" }}></p>
            <div className="flex gap-10 items-end mt-14 mb-10">
              <div className="text-3xl">
                $<CountUp end={Number(product?.net_worth ?? 0)} start={0} duration={10} />
              </div>
              <div className="flex items-center gap-1">
                <span>
                  +$ 0.
                  <CountUp end={5} duration={2} /> today
                </span>
                <img src="/assets/up.png" width={14} alt="" />
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="leading-normal text-base bg-white rounded-full px-4 py-1 text-[#000]">{product?.income2} APY</div>
              <div className="leading-normal text-base bg-white rounded-full px-4 py-1 text-[#000]">$ {scientific(product?.market_value || 0)} AUM</div>
              <img src="/assets/eth_white.png" width={30} alt="" />
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <Deposit />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">CFRO的资产储备和构成</h1>
          </div>
          <Constitute />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">表现</h1>
          </div>
          <Performance />
        </div>

        <div className="p-4 lg:p-20 lg:px-44 md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">常见问题</h1>
          </div>
          <div className="w-full lg:w-5/6 m-auto rounded-box border border-light p-6">
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold font-whalebold">资产的发行和赎回流程有哪些？</summary>
              <div className="collapse-content">
                <h2>代币化资产主要3个流程:</h2>
                <p>1.创建，创建新的代币资产</p>
                <p>2.赎回，投资者将代币返还给Cycle以收回资金（加上应计收益）</p>
                <p>3.转账，投资者可在CycleX App转让市场提交转让/出售代币</p>
              </div>
            </details>
            <div className="divider my-0"></div>
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold font-whalebold">用户如何进行KYC认证流程？</summary>
              <div className="collapse-content">
                <p>个人及机构投资者可在CycleX官网或App提交KYC审核，我们将在1-3个工作日协助您完成KYC审核流程，用户可根据App的提示流程进行操作</p>
              </div>
            </details>
            <div className="divider my-0"></div>
            <details className="collapse collapse-arrow bg-white text-black">
              <summary className="collapse-title text-base font-bold font-whalebold">资产标的构成和管理是怎样的？</summary>
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
              <summary className="collapse-title text-base font-bold font-whalebold">收取哪些费用？</summary>
              <div className="collapse-content">
                <p>管理费：根据资产类别不同，收取相应的管理费用，平均控制在0.1-2%区间（可根据单一资产披露进行查看）</p>
                <p>交易手续费：暂不收取</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
