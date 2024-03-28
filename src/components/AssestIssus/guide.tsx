import { Divider } from "antd";

const Aguide = () => {
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold text-3xl mb-6">发行摘要</h1>

      <div className="rounded-box border border-light p-4">
        <p className="text-base">
          下述信息表适用于基金代币、资产代币的发行信息登记，为了不耽误您的宝贵时间，请务必根据您的实际情况填写完整，我们将根据您的信息提供必要的审核流程，提交信息后，将于 7
          个工作日内通知您进行后续流程：
        </p>
        <Divider />
        <div>
          <p> KYC 请根据您的如实情况进行填写，如有疑问请至 services@whaleflow.co与我们进行联络，协助您完成填写 </p>
          <p>资产信息表1 指发行债券类的资产信息登记，仅适用于传统资产信息登记（附件查询） </p>
          <p> 资产信息表2 指资产发行规则的信息登记，适用于加密资产、基金、现货、债券、另类资产的基金代币发行信息登记（附件查询） </p>
          <p> 提供服务（我司提供服务范围，发行报告、投资分析报告、发行平台、资产托管、运营管理、市值管理、用户流动性管理） </p>
          <p> 增值服务 （注册服务、法律服务、审计服务、翻译服务、由指定第三方提供）</p>
        </div>
      </div>

      <h1 className="font-bold text-3xl my-6">发行要素</h1>

      <div className="rounded-box border border-light p-4">
        <div>
          <p>
            <span className="text-base">审核标准</span> （KYC信息、法律意见书、审计及评估文件、发行说明文件）
          </p>
          <p>
            <span className="text-base">规模范围</span> {"（<1500万美金内，可发行资产具备有价资产范围，金融及商品类资产，发行的货币标准为美金、及数字美元稳定币）"}
          </p>
          <p>
            <span className="text-base">主体标准</span> （以SPV设立发行主体，根据符合本地合规设立，发行后的交付主体由所在地资管主体进行确权）
          </p>
          <p>
            <span className="text-base">产品标准</span> （附件查询）
          </p>
          <p>
            <span className="text-base">交易形式</span>（发行后的交易阶段仅针对可政策开放国家用户开放的平台零售用户、机构用户）
          </p>
          <p>
            <span className="text-base">协议附件</span> （附件查询）
          </p>
          <p>
            <span className="text-base">收费标准</span> （附件查询）
          </p>
          <p>
            <span className="text-base">交易周期</span> （发行的方式为代币化基金形式，可设计1-10年内的存续期，发行周期控制在1-6月内，资金交付根据发行后的资金比例10%-100%内逐渐交付）
          </p>
          <p>
            <span className="text-base">清算退出</span> （在基金到期后，由双方根据产品情况进行清算退出阶段）
          </p>
        </div>
      </div>

      <h1 className="font-bold text-3xl my-6">常见问题</h1>
      <Divider />

      <div className="mt-10">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title">资产的发行和赎回流程有哪些？</summary>
          <div className="collapse-content">
            <h2>代币化资产主要3个流程:</h2>
            <p>1.创建，创建新的代币资产</p>
            <p>2.赎回，投资者将代币返还给Cycle以收回资金（加上应计收益）</p>
            <p>3.转账，投资者可在CycleX App转让市场提交转让/出售代币</p>
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title">用户如何进行KYC认证流程？</summary>
          <div className="collapse-content">
            <p>个人及机构投资者可在CycleX官网或App提交KYC审核，我们将在1-3个工作日协助您完成KYC审核流程，用户可根据App的提示流程进行操作</p>
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title">资产标的构成和管理是怎样的？</summary>
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
          <summary className="collapse-title">收取哪些费用？</summary>
          <div className="collapse-content">
            <p>管理费：根据资产类别不同，收取相应的管理费用，平均控制在0.1-2%区间（可根据单一资产披露进行查看）</p>
            <p>交易手续费：暂不收取</p>
          </div>
        </details>
      </div>

      <p>可以通过 services@whaleflow.co 与我们取得联系，我们的动态更新会披露在我们的X和Telegram找到我们。</p>
    </div>
  );
};
export default Aguide;
