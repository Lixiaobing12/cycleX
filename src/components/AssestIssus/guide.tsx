import { Divider } from "antd";
import { Trans, useTranslation } from "react-i18next";

const Aguide = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Value-added Services")}</h1>

      <div className="rounded-box border border-light p-4">
        <p className="text-base">
          {t(
            "If you require additional value-added services such as registration services, legal services, audit services, translation services, etc., please specify in the form and indicate whether the services will be provided by a designated third party."
          )}
        </p>
        <p className="text-base mt-2">
          <Trans i18nKey={"makesure"} components={{ a: <a /> }}></Trans>
        </p>
      </div>

      <h1 className="font-bold font-whalebold text-3xl my-6">{t("Issue Elements")}</h1>

      <div className="rounded-box border border-light">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Review criteria")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2 ml-2">
              <p>
                <span className="text-base text-black mr-2">{t("KYC information")}:</span> {t("Strictly implement KYC (Know your Customer) policies to ensure that investors are true and compliant.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Legal opinions")}:</span>{" "}
                {t(
                  "Execute in accordance with the law to ensure that the issuance and transactions are in compliance with local laws and regulations, including securities laws and KYC requirements."
                )}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Audit and appraisal documents")}:</span>{" "}
                {t("An audit and appraisal of an asset is conducted to verify its authenticity, viability and value.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Issuance description documents")}:</span>
                {t("describe the assets, issuance rules, risk disclosure, etc., in detail to provide investors with comprehensive information.")}
              </p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Size range")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>
                <span className="text-base text-black mr-2">{t("Issue amount")}:</span> {t("limited to 15 million USDT.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Range of issuable assets")}:</span> {t("including marketable assets, financial and commodity assets.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Currency standard")}:</span> {t("USDT and corresponding value digital currency.")}
              </p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Subject standard")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>
                <span className="text-base text-black mr-2">{t("Issuer")}:</span> {t("set up as SPV (special purpose entity) and meet local compliance requirements.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Delivery subject")}:</span> {t("the rights shall be confirmed by the local asset management subject.")}
              </p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Product standard")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>{t("Including detailed provisions on product characteristics, investment strategies, risk factors, etc.")}</p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Form of transaction")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>{t("Open only to users in policy compliant regions, including retail and institutional users.")}</p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Appendix to the Agreement")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>{t("Include relevant agreements, contracts, terms and other attached documents.")}</p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Fee standard")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>{t("Including management fee, transaction fee, custodian fee and other fees.")}</p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Transaction cycle")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>
                <span className="text-base text-black mr-2">{t("Issuance method")}:</span> {t("in the form of tokenized fund, the duration can be designed for 1-10 years.")}
              </p>
              <p>
                <span className="text-base text-black mr-2">{t("Issuance period")}:</span> {t("controlled within 1-6 months, fund delivery is carried out gradually.")}
              </p>
            </div>
          </div>
        </details>

        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Liquidation exit")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <div className="flex flex-col gap-2 ml-2">
              <p>{t("Upon maturity of the fund, liquidation and withdrawal shall be carried out according to the agreement of both parties.")}</p>
            </div>
          </div>
        </details>
      </div>

      <h1 className="font-bold font-whalebold text-3xl mt-12">{t("Q&A")}</h1>
      <Divider />

      <div className="mt-10">
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("What is tokenization?")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <p>
              {t(
                "Tokenized assets are the process of using blockchain technology to digitize physical assets or equity interests in the real world and issue, circulate and trade them on the blockchain in the form of tokens. These tokens can represent the ownership, equity, or value of the actual asset and are transacted securely and transparently through the blockchain network."
              )}
            </p>

            <h3 className="text-black  font-bold font-whalebold my-2">{t("The advantages of tokenized assets include")}:</h3>
            <ul className="ml-6">
              <li>{t("Global liquidity: Blockchain technology enables assets to be traded globally, with greater flexibility both in terms of location and time.")}</li>
              <li>
                {t(
                  "Transparency and traceability: All transaction records are recorded on the blockchain, which is open and transparent and cannot be tampered with, ensuring transparency and credibility of transactions."
                )}
              </li>
              <li>
                {t(
                  "24-hour global transactions: Due to the round-the-clock operation of the blockchain network, tokenized assets can realize round-the-clock global transactions, improving the liquidity and accessibility of the market."
                )}
              </li>
              <li>
                {t(
                  "Reduced transaction costs: Compared with traditional financial markets, tokenized assets trade at a lower cost, reducing intermediate links and related formalities, while speeding up transactions."
                )}
              </li>
              <li>
                {t(
                  "Expand investment opportunities: Tokenized assets provide investors with more types of asset investment opportunities, including real estate, art, enterprise equity, etc., making the investment portfolio more diversified."
                )}
              </li>
              <li>{t("Enhanced asset liquidity: The digital nature of tokenized assets makes it easier to divide and transfer assets, improving the liquidity and tradability of assets.")}</li>
            </ul>
          </div>
        </details>
        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Are tokenized assets compliant? What are the distribution cases?")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <p>
              {t(
                "Compliance with tokenized assets depends on the legal and regulatory requirements of the location. In some countries and regions, governments have started to formulate relevant regulations to regulate the issuance and trading of tokenized assets. Compliance typically involves procedures such as KYC (Know your Customer) and AML (anti-money laundering), as well as meeting the requirements of securities laws or other financial regulatory regulations."
              )}
            </p>
            <h3 className="text-black  font-bold font-whalebold my-2">{t("Here are some of the distribution cases of tokenized assets")}:</h3>
            <ul className="ml-6">
              <li>
                <span>{t("Green bonds")}:</span>
                <span>
                  {t(
                    "Some financial institutions such as jpmorgan Chase, Goldman Sachs, Citibank, etc., as well as some governments such as the governments of Singapore and Hong Kong, have issued tokenized assets such as green bonds."
                  )}
                </span>
              </li>
              <li>
                <span>{t("Real estate tokenization")}:</span>
                <span>
                  {t("Some real estate developers and platforms have digitized real estate and issued tokenized assets, which allow investors to hold and trade real estate through tokens.")}
                </span>
              </li>
              <li>
                <span>{t("Tokenization of artworks")}:</span>
                <span>{t("Some art trading platforms and art funds have digitized artworks and issued tokenized assets, allowing investors to hold and trade artworks through tokens.")}</span>
              </li>
              <li>
                <span>{t("Tokenization of venture capital assets")}:</span>
                <span>
                  {t(
                    "Some start-ups and venture capital institutions have digitized venture capital assets and issued tokenized assets, allowing investors to invest in and hold equity in startups through tokens."
                  )}
                </span>
              </li>
            </ul>
          </div>
        </details>

        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("What if the issuance doesn't work out")}?</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <p>
              {t(
                "Theoretically, if the tokenized assets are issued in strict accordance with the standard issuance process of other overseas countries, and have passed procedures such as legal opinions, audit reports, issuance instructions and code review, there should be no problem of unsuccessful issuance in the issuance process. These steps ensure the compliance and credibility of the issuance plan, and improve investors' confidence and recognition of the project."
              )}
            </p>
            <p className="mt-2">
              {t(
                "However, in the actual situation, even if the issuance is carried out according to strict standards and procedures, some challenges and difficulties may still be faced. For example, changes in the market environment, fluctuations in investor sentiment, the influence of competitors and other factors may have an impact on the results of the issuance.Therefore, even if the issuance proposal has passed various procedures and reviews, it is necessary to pay close attention to market dynamics and investor feedback and make corresponding adjustments and response measures at any time to ensure the smooth progress and ultimate success of the issuance."
              )}
            </p>
          </div>
        </details>

        <div className="divider my-0"></div>
        <details className="collapse collapse-arrow bg-white text-black">
          <summary className="collapse-title text-md font-normal">{t("Issuance cost of tokenized assets")}</summary>
          <div className="collapse-content text-sm text-black-800 leading-6">
            <p>
              {t(
                "The cost of issuing tokenized assets depends on a variety of factors, including the complexity of the project, local legal and regulatory requirements, market demand, technical requirements, and more. Here are some of the factors that may affect the cost of issuing tokenized assets"
              )}
              :
            </p>
            <ul className="ml-6">
              <li>
                <span>{t("Legal and regulatory costs")}:</span>
                <span>{t("these include legal advisory fees, compliance review fees, regulatory registration fees, etc.")}</span>
              </li>
              <li>
                <span>{t("Technology development costs")}:</span>
                <span>{t("including blockchain development fees, smart contract writing fees, code audit fees, etc.")}</span>
              </li>
              <li>
                <span>{t("Tokenization of artworks")}:</span>
                <span>{t("Some art trading platforms and art funds have digitized artworks and issued tokenized assets, allowing investors to hold and trade artworks through tokens.")}</span>
              </li>
              <li>
                <span>{t("Project management costs")}:</span>
                <span>{t("including project management costs, team compensation, administrative costs, etc.")}</span>
              </li>
              <li>
                <span>{t("Marketing and promotion costs")}:</span>
                <span>{t("including publicity and promotion costs, market research costs, community construction costs, etc.")}</span>
              </li>
              <li>
                <span>{t("Exchange launch cost")}:</span>
                <span>{t("If you plan to trade online on a digital currency exchange, you also need to consider the launch cost and marketing cost.")}</span>
              </li>

              <li>
                <span>{t("Legal documents and audit costs")}:</span>
                <span>{t("including the preparation and review costs of legal opinions, audit reports, issuance instructions, etc.")}</span>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
};
export default Aguide;
