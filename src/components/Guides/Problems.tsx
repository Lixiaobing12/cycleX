import { Divider } from "antd";
import { useTranslation } from "react-i18next";

const Problems = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Q&A")}</h1>
      <Divider />

      <div className="mt-10">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Operational process")}</summary>
          <div className="collapse-content text-sm text-black-800">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("In terms of technical execution, CycleX combines the automated execution at the online contract level with the offline real asset circulation. The specific implementation process is as follows")}:</h2>

            <h3 className="text-black text-base my-2">{t("Off-chain process")}:</h3>
            <p>{t('Fund establishment and SPV control of assets: According to the characteristics of different products, CycleX establishes corresponding funds and SPV (special purpose company) controls the assets. Publication of asset data and documents: SPV regularly publishes reserve asset pool data, and issues token fund explanation documents, audit reports, and other necessary asset disclosure documents and data to ensure transparency and credibility.')}</p>

            <h3 className="text-black text-base my-2">{t("On-chain process")}:</h3>
            <p>{t("Data transfer to blockchain: Asset-related data is transferred to the blockchain so that it can be publicly recorded and traceable, improving the traceability and transparency of assets. Smart contract execution: For the asset circulation process, CycleX automates the execution of relevant transactions through smart contracts, ensuring that the transactions are carried out quickly, efficiently and safely.")}</p>

            <h3 className="text-black text-base my-2">{t("User process")}:</h3>
            <p>{t("Purchase and redemption of assets: After the user purchases an asset, the platform provides an agreed redemption period. After the redemption period expires, the user can directly repurchase or transfer the asset through the platform. Transaction cost link: through fund establishment and SPV control, the transaction cost and formality cost in the subsequent process are reduced. At the same time, the execution of smart contracts also reduces the intermediary link, and reduces the intermediary fee and management fee of the transaction.")}</p>
          </div>
        </details>
        <Divider className="my-1" />
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Compliance and regulation")}</summary>
          <div className="collapse-content text-sm text-black-800">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("CycleX has made the following preparations in terms of regulatory compliance")}:</h2>

            <h3 className="text-black text-base my-2">{t("Holding licenses")}:</h3>
            <p>{t("CycleX has obtained the relevant licenses of MSA in the United States and other countries, and is applying for the relevant licenses of the United Kingdom, Canada and other countries. All future product releases and business will meet the regulatory requirements of the target countries.")}</p>

            <h3 className="text-black text-base my-2">{t("Renewal of other regulated licenses")}:</h3>
            <p>{t("In addition to the licenses already held, CycleX is also renewing other regulated licenses to meet the regulatory requirements of different regions.")}</p>

            <h3 className="text-black text-base my-2">{t("Meeting the compliance standards for RWA product offerings")}:</h3>
            <p>{t("CycleX is committed to meeting the compliance standards for RWA product offerings, ensuring that its product design and operation are in compliance with the regulations of the relevant regulatory authorities, and protecting the rights and interests of investors and the safety of assets.")}</p>

            <h3 className="text-black text-base my-2">{t("Compliance market opening")}:</h3>
            <p>{t("Currently, CycleX is only open for the compliance market and provides compliance services in accordance with regulatory requirements. Ensure compliance with the regulatory requirements of the target market.")}</p>

            <h3 className="text-black text-base my-2">{t("Future regulatory direction")}:</h3>
            <p>{t("cycleX plans to gradually acquire more regulatory licenses according to the requirements of the target markets and comply with the laws and regulatory direction of the target governments to ensure compliance.")}</p>
          </div>
        </details>

        <Divider className="my-1" />
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Asset management and review")}</summary>
          <div className="collapse-content text-sm text-black-800">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("CycleX has taken strict security measures to ensure the authenticity of offline assets and the flow of online assets")}:</h2>

            <h3 className="text-black text-base my-2">{t("Security measures for offline asset verification")}:</h3>
            <p>{t('Standard document provision: CycleX provides standardized documents, including asset audit report, evaluation report, SPV document and fund element description document, etc., in line with international audit standards, providing reliable proof and guarantee for the authenticity of assets.')}</p>

            <h3 className="text-black text-base my-2">{t("Security measures for online asset flow")}:</h3>
            <p>{t("Smart contract execution: CycleX uses smart contract technology to realize asset flow on the chain and ensure the security and transparency of the transaction process. The automatic execution mechanism of smart contracts reduces the possibility of human intervention and prevents potential fraud.")}</p>
          </div>
        </details>
        <Divider className="my-1" />
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Multiple preparations and security corroboration")}</summary>
          <div className="collapse-content text-sm text-black-800">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("Regulatory authority approval")}:</h2>
            <p>{t("CycleX's offline assets have been reviewed and recognized by regulatory authorities and obtained relevant assurance certificates certifying the authenticity and compliance of the assets. These supporting documents form an important basis for compliance documents. Asset preservation Services provided by insurance institutions: CycleX plans to work with insurance institutions to provide proof of asset preservation services to ensure the safety of assets. This further strengthens investors' confidence in the safety of assets.")}</p>
          </div>
        </details>

        <Divider className="my-1" />
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Underlying product composition")}</summary>
          <div className="collapse-content text-sm text-black-800">
            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("The current composition and structure of CycleX's main products are as follows")}:</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>{t("Product Categories")}</th>
                    <th>{t("AUM percentage")}</th>
                    <th>{t("Expected annualized yield")}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>{t("Listed company assets and bonds offered on traditional stock exchanges")}</td>
                    <td>60% (RWA)</td>
                    <td>7-12%</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <td>{t("Crypto assets contain tokenization (BTC, ETH)")}</td>
                    <td>20% (Token Fund)</td>
                    <td>{t("The average annualized return on crypto assets is calculated based on the current market return")}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td>{t("Hybrid token base")}</td>
                    <td>{t("20% (hybrid fund with both crypto and non-crypto market products)")}</td>
                    <td>30-60%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("CycleX's token economy model design makes it highly relevant for anchoring cryptocurrencies such as USDT, BTC and ETH, thus providing investors with diversified investment options and return advantages. For the direction of subsequent product iterations, CycleX's planning may include the following aspects")}:</h2>

            <h3 className="text-black text-base my-2">{t("Increase product diversity")}:</h3>
            <p>{t("Further expand the product line and introduce more kinds of tokenized assets, including but not limited to real estate, art, bills, equity, etc., to meet the needs of different investors.")}</p>

            <h3 className="text-black text-base my-2">{t("Optimize the return on investment")}:</h3>
            <p>{t("Continuously optimize the product mix and management strategy to improve the return on investment and attract more investors to participate.")}</p>

            <h3 className="text-black text-base my-2">{t("Improve trading platform experience")}:</h3>
            <p>{t("Continuously improve the functions and user experience of the trading platform, improve trading efficiency and security, and provide better trading experience for users.")}</p>

            <h3 className="text-black text-base my-2">{t("Expand partnerships")}:</h3>
            <p>{t("Strengthen cooperation with traditional financial institutions, crypto asset platforms and other ecological partners to jointly promote the development and growth of the ecosystem. Through continuous product iteration and development planning, CycleX will be able to better meet market demand, enhance competitiveness and achieve long-term development goals.")}</p>
          </div>
        </details>
      </div>
    </div>
  );
};
export default Problems;
