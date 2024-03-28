import { Divider } from "antd";

const Book = () => {
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold text-3xl mb-6">白皮书</h1>
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
    </div>
  );
};
export default Book;
