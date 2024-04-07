import { Divider } from "antd";
import { useTranslation } from "react-i18next";

const Law = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">法律</h1>
      <Divider />

      <div className="mt-10">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title">{t("User service agreement")}</summary>
          <div className="collapse-content">
            <h2 className="text-black text-base font-bold my-2">{t("Terms of Service")}</h2>
            <p>{t("Last Updated: Apr. 2024")}</p>
            <p className="">
              These terms of service, together with any documents and additional terms they expressly incorporate by reference, which includes any other terms and conditions or other agreement that WHALE FLOW Inc. ("WHALE FLOW," "we," "us" and "our") posts publicly or makes available to you or the company or other legal entity you represent ("you" or "your") (collectively, these "Terms" or "Agreement"), are entered into between WHALE FLOW and you concerning your use of, and access to, WHALE FLOW's websites, including WHALE FLOW; web applications; mobile applications; and all associated sites linked thereto by WHALE FLOW or its affiliates (collectively with any materials and services available therein, and successor website(s) or application(s) thereto, the "Site") and the Services (as defined in Section 2.1 hereto).<br/>
              By clicking "I agree" (or a similar language) to these Terms, acknowledging these Terms by other means, or otherwise accessing or using the Site or the Services, you accept and agree to be bound by and to comply with these Terms, including, without limitation, the mandatory arbitration provision in Section 14. If you do not agree to these Terms, then you must not access or use the Site or the Services. Please carefully review the disclosures and disclaimers set forth in Section 12 in their entirety before using any software developed or owned by WHALE FLOW. The information in Section 12 provides important details about the legal obligations associated with your use of the Services.<br/>
              1. Modifications to These Terms<br/>

            </p>
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
export default Law;
