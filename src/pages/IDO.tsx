import { Divider } from "antd";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import Deposit from "../components/IDO/Deposit";

const IDO = () => {
  const [toast] = useAtom(messageContext);
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/ido-bg.png" className="w-full h-[80vh]" alt="" />
        <p className="text-white text-4xl text-center absolute  font-bold font-whalebold max-w-[800px]">
          {t("Opening up opportunities for hundred-fold growth in the RWA world and reshaping the value of the industry")}
        </p>
      </div>
      <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-20">
        <p className="text-2xl  font-bold font-whalebold my-20">{t("A platform composed of multiple listed companies and an AUM of US$1.5 billion")}</p>

        <Divider />

        <div className="my-14">
          <Deposit />
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("About us")}</div>
          <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("Project introduction")}</h2>
          <p className="my-4 text-black">
            {t(
              "CycleX focuses on building a systematic and comprehensive trading platform, not just a simple asset-backed tool. By providing seamless links between the asset side and the user side, CycleX creates a more efficient and convenient trading environment for both sides of the transaction."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "The goal of CycleX is not only to succeed in the local market, but also to build a decentralized RWA trading platform on a global scale. Through partnerships with listed companies and financial institutions from the Asia-Pacific region, Europe and the United States, CycleX can build a broad ecosystem around the world, thus providing users with more diversified trading opportunities."
            )}
          </p>

          <h2 className="text-black text-base  font-bold font-whalebold my-2 mt-4">{t("Project solution")}</h2>
          <p className="my-4 text-black">{t("CycleX's solutions to current RWA (Real World Asset) track problems")}:</p>
          <p className="my-4 text-black">
            {t(
              "Lack of systematic platform interaction mode: At present, the platform interaction mode of RWA track is relatively scattered, and there is a lack of unified standards and processes. CycleX believes that this leads to a lack of demand matching between the two sides, that is, limited interaction between customers on the asset side and the capital side. To solve this problem, CycleX is committed to building a comprehensive and systematic platform, aiming to provide efficient and convenient trading experience, so that traditional high-quality assets can face global users in a low-threshold, high-liquidity way."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Asset selection and token form: CycleX's asset selection is based on the team's rich experience in the field of traditional funds and asset management. They are more inclined to choose asset products with high liquidity and realize their token through block chain technology. This token form not only improves the liquidity and tradability of assets, but also ensures the openness and transparency of the whole process through the transparency of the block chain, thus establishing the trust and transparency of investors."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Universal user experience and lowering the threshold: On the user side, CycleX focuses on universality, hoping to provide any ordinary user with a simple, convenient and efficient investment and trading experience. To this end, the platform provides the best way of transaction between users and assets through its own C2C market, and reduces the threshold and cost of transaction through technical means, so that more people can easily use it."
            )}
          </p>

          <h2 className="text-black text-base  font-bold font-whalebold my-2 mt-4">{t("Team Introduction")}</h2>
          <p className="my-4 text-black">
            {t(
              "Our core founding team is mainly from the top 20 universities in the QS world. He has rich experience in investment banking, Internet finance, securities industry and audit firms, and has worked for top 100 financial institutions and entrepreneurs in the financial technology industry."
            )}
          </p>

          <h2 className="text-black text-base  font-bold font-whalebold my-2 mt-4">{t("Technical architecture")}</h2>
          <p className="my-4 text-black">
            {t(
              "All products comply with the laws and regulations of Singapore and have passed the relevant certification. Token Funds are developed in accordance with the ERC1400 standard and can only be transferred to account holders pre-approved through the KYC/AML whitelist mechanism."
            )}
          </p>

          <h2 className="text-black text-base  font-bold font-whalebold my-2 mt-4">{t("Economic model")}</h2>
          <p className="my-4 text-black">
            {t(
              "Project introduction: CycleX is an innovative Real Asset Token (RWA) platform, which aims to convert real world assets into digital token assets, increase asset liquidity and accessibility, and provide unprecedented opportunities for investors."
            )}
          </p>

          <p className="my-4 text-black">
            {t(
              "Product features: The platform is committed to achieving extensive tokenization of assets, covering a variety of products, including accounts receivable, REITS, bills, etc., to diversify risks and optimize the investment portfolio. Through secure blockchain technology and smart contracts, we can ensure the transparency and security of transactions, improve efficiency and reduce costs."
            )}
          </p>

          <p className="my-4 text-black">
            {t(
              "Market impact and potential: CycleX builds a bridge between traditional asset holders and global investors, making high-value assets easier to invest and transfer, enhancing asset value and opening up a broader capital market. "
            )}
          </p>

          <p className="my-4 text-black">
            {t(
              "Compliance: All products comply with the laws and regulations of Singapore and have passed the relevant certification. Token Funds are developed in accordance with the ERC 1400 standard and can only be transferred to account holders pre-approved through the KYC/AML whitelist mechanism."
            )}
          </p>

          <p className="my-4 text-black">
            {t("Platform product operation process: including casting, redemption, secondary market liquidity and other processes, which are realized through APP operation and smart contracts.")}
          </p>

          <p className="my-4 text-black">{t("Token Fund Smart Contract: ERC1400 security token standard and permission management are adopted to ensure the rights and security of token holders.")}</p>
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("WFC")}</div>
          <p className="my-4 text-black">
            {t(
              "Token information: The name of the token is WhaleFlow Coin (WFC), which adopts the ERC20 standard, with a total amount of 100 billion, and has the functions of payment, voting and pledge."
            )}
          </p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("Elements")}</th>
                  <th>{t("Description")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("Issuer")}</td>
                  <td>WHALEFLOW FUND PTE. LTD.</td>
                </tr>
                <tr>
                  <td>{t("Token name")}</td>
                  <td>WhaleFlow Coin(WFC)</td>
                </tr>
                <tr>
                  <td>{t("TotalSupply")}</td>
                  <td>100,000,000,000</td>
                </tr>
                <tr>
                  <td>{t("Token type")}</td>
                  <td>
                    <p>{t("The WFC token is a token issued based on the RWA (Real World Assets) track.")}</p>
                    <p>
                      {t(
                        "The WFC token features coin-stock linkage, meaning holders not only benefit from gains in the crypto market but also from gains associated with listings on traditional financial markets such as Nasdaq. This combines the dual profit characteristics of traditional financial markets and the crypto market."
                      )}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>{t("Blockchain support")}</td>
                  <td>Ethereum Erc20</td>
                </tr>
                <tr>
                  <td>{t("Token pricing")}</td>
                  <td>0.001$</td>
                </tr>
                <tr>
                  <td>{t("Total price of private placement")}</td>
                  <td>USD30,000,000</td>
                </tr>

                <tr>
                  <td>{t("Purpose of financing")}</td>
                  <td>
                    <div>
                      <p>{t("Technology development and research: used for project technology development, smart contract writing, security audit, etc.")}</p>
                      <p>{t("Talent recruitment and team building: It is used to recruit high-quality talents and expand the size of the project team.")}</p>
                      <p>{t("Marketing and brand building: used for marketing activities, social media promotion and project awareness.")}</p>
                      <p>{t("Compliance and regulatory expenditures: for legal counsel fees, compliance audit fees, to ensure project compliance.")}</p>
                      <p>{t("Ecosystem building and partnerships: for ecosystem development, collaboration with other projects, developer incentive programs.")}</p>
                      <p>{t("Reserve funds and risk management: used to establish risk reserves and deal with possible challenges and risks in the future.")}</p>
                      <p>{t("Listing plan of the platform: apply for listing on NASDAQ in the first quarter of 2025")}</p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>{t("Expected return")}</td>
                  <td>{t("Expected annual yield of 3-10 times")}</td>
                </tr>

                <tr>
                  <td>{t("Token lock and release mechanism")}</td>
                  <td>
                    <div>
                      <p>{t("Token release")}:</p>
                      <p>{t("Team ecosystem building: release 50% of the total tokens.")}</p>
                      <p>{t("Private Placement Allocation: Release 30% of total tokens.")}</p>
                      <p>{t("Airdrop and public sale: release 20% of the total amount of tokens.")}</p>
                      <p className="mt-4">{t("Airdrop User Release Plan")}:</p>
                      <p>{t("Airdrop users will release 20% of the total amount of tokens within 6 months.")}</p>
                      <p>{t("The release plan is divided into three stages: 5%, 10% and 5% of the tokens are released respectively.")}</p>
                      <p className="mt-4">{t("Private placement user release")}:</p>
                      <p>{t("Private placement users will release 30% of the total amount of tokens within 6 months.")}</p>
                      <p className="mt-4">{t("Locking mechanism")}:</p>
                      <p>{t("Team lock-in period: 6-24 months.")}</p>
                      <p>{t("Lock-up period for private placement and airdrop users: 6 months.")}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{t("Allocate time")}</td>
                  <td>{t("The token allocation time node for participating IDO users is set as: send to the designated wallet address within 7 working days after participating in the activity.")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("Road map")}</div>
          <p className="my-4 text-black">
            {t("Including platform version upgrade, function optimization, market expansion plan, etc., plans to submit Nasdaq listing application in the first quarter of 2025.")}
          </p>
          <p className="my-4 text-black">
            {t(
              "Platform ecosystem: including asset issuance, asset trading, asset rating, stable currency system, investment banking and derivatives market. CycleX is committed to effectively operating real assets through blockchain technology, maximizing the value of assets, and providing convenient investment opportunities for global investors."
            )}
          </p>
          <Divider />
          <h2 className="text-black text-base  font-bold font-whalebold my-2">2024-Q2</h2>
          <p className="my-4 text-black">
            {t(
              "Through systematic collection and in-depth analysis of user feedback, comprehensive optimization of platform interface and transaction processes is conducted. Based on user pain points and needs, emphasis is placed on improving interface design, operational processes, and transaction experiences to enhance user satisfaction and platform usability. Continuous user testing and feedback loops are implemented to ensure the effectiveness of improvement measures and alignment with user expectations."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Conduct comprehensive market analysis to gain deep insights into the characteristics of various regional markets, potential user demographics, and competitive landscapes, thereby formulating strategic plans for market expansion. Explore new asset classes and regional markets to identify growth opportunities and enrich the variety of assets on the platform while expanding the user base. In addition to the Asia-Pacific region, prioritize expanding into global markets, establishing localized operational teams and marketing strategies to enhance brand awareness and user engagement."
            )}
          </p>
          <Divider />

          <h2 className="text-black text-base  font-bold font-whalebold my-2">2024-Q3</h2>

          <p className="my-4 text-black">
            {t(
              "Issue platform-exclusive tokens to facilitate the operation of the platform's internal ecosystem and encourage user participation. These tokens can be used for paying transaction fees, participating in airdrop activities, receiving platform rewards, among other purposes, thereby enhancing the platform's economic incentive mechanism. Design the issuance mechanism and economic model of the tokens to ensure stability and sustainability while attracting more users and investors to participate in the platform ecosystem."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Comprehensive Feature Upgrade Introduce advanced features based on the latest market trends and user demands, such as advanced order types, intelligent trading algorithms, risk management tools, etc., to enhance trading efficiency and security. Continuously optimize the platform's technical architecture and system performance to ensure that the platform can handle high-volume trading and security threats, providing a stable and reliable trading environment."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Enhance Partner Network Strengthen relationships with financial institutions, asset management companies, and other partners to explore new collaboration models and business opportunities, collectively driving platform development. Expand collaboration channels, including establishing partnerships with industry associations, technology providers, community organizations, etc., to jointly build a healthier and more prosperous ecosystem."
            )}
          </p>

          <Divider />
          <h2 className="text-black text-base  font-bold font-whalebold my-2">2024-Q4</h2>

          <p className="my-4 text-black">
            {t(
              "Global Compliance Strengthening Continuously monitor changes in global financial market regulations to ensure platform operations comply with international compliance standards and obtain relevant business qualifications according to the requirements of the countries where the business operates. Strictly adhere to Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations to ensure the compliance of the trading platform, mitigate risks, and enhance user trust."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Diversified Marketing Campaigns Implement comprehensive marketing campaigns, including online promotions, social media activities, and collaborations with industry-related partners, to enhance brand influence and platform visibility. By integrating user profiles and market demands, precisely target the desired audience and develop personalized marketing strategies to attract more users and investors to participate in platform activities."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Active Global Market Expansion Based on market research and analysis, actively enter new regions and asset class markets to broaden investment channels and opportunities, strengthening the platform's international development. Particularly focus on European and North American markets, which have high levels of digital asset trading activity and investment potential. By expanding operations into these markets, further expand the platform's user base and market share."
            )}
          </p>

          <Divider />
          <h2 className="text-black text-base  font-bold font-whalebold my-2">2025-Q1</h2>

          <p className="my-4 text-black">{t("Submit Listing Application/NASDAQ Main Board")}</p>
          <p className="my-4 text-black">{t("Risk management")}</p>
          <p className="my-4 text-black">{t("The underlying assets corresponding to all issued token assets can only be linked up after due diligence to ensure the authenticity of the assets.")}</p>
          <p className="my-4 text-black">
            {t("All assets are legal assets, and the original equity holder guarantees the credit enhancement to ensure that the assets are fully mortgaged for credit enhancement.")}
          </p>
          <p className="my-4 text-black">{t("All assets on the chain are operated through intelligent contracts, which avoids artificial changes and falsification.")}</p>
          <p className="my-4 text-black mt-4 font-bold font-whalebold">{t("Ways of IDO Participation")}</p>
          <p className="my-4 text-black">
            {t(
              "Using your Web browser, enter the URL of the CycleX. CC and visit the official website. Register/Login Account: If you already have an account, please login. If not, create a new account according to the registration process on the website."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Learn more about IDO activities: Find information about IDO activities on the official website, which can usually be found on the home page or a special IDO page. Learn more about the rules of the event, task requirements, and how to participate."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Follow Twitter: Open Twitter and search for the official CycleX account. Follow the account to get the latest activity information and updates. There may be specific tasks on Twitter, such as retweeting a particular post or replying to a particular question."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Join the Telegram Community: Open Telegram and search the official community or channel of CycleX. Join and follow to get the latest information on events, participate in discussions, and interact with other community members."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Submit relevant information: Upon request, you may need to submit your participation information, such as wallet address, on the official website or other platforms. It is important to ensure that the information you provide is accurate."
            )}
          </p>

          <p className="my-4 text-black mt-4 font-bold font-whalebold">{t("Ways of IDO Participation")}</p>
          <p className="my-4 text-black">
            {t(
              "Licenses: CycleX has obtained relevant licenses in the United States, MSA and other countries, and is applying for relevant licenses in the United Kingdom, Canada and other countries. In the future, all products and businesses will meet the regulatory requirements of the target countries."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Renewal of other regulated licenses: In addition to the licenses already held, CycleX is also renewing other regulated licenses to meet the regulatory requirements of different regions."
            )}
          </p>
          <p className="my-4 text-black">
            {t(
              "Compliance Market Opening: Currently, CycleX is open only for the compliance market and provides compliance services according to regulatory requirements. Ensure compliance with regulatory requirements in target markets."
            )}
          </p>
          <p className="my-4 text-black">{t("Issuer: The Singapore Foundation shall act as the issuer and issue the legal statement of the relevant law firm.")}</p>
        </div>

        <div className="mt-28">
          <div className="text-center text-2xl  font-bold font-whalebold">{t("Contact us")}</div>

          <div className="flex items-center justify-center mt-14 gap-6">
            <div className="flex gap-2 items-center">
              <span className="text-black font-bold font-whalebold">
                <a href="https://t.me/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363]">
                  {t("Telegram community")}
                </a>
              </span>
              <div>
                <img src="/assets/telegram-drak.png" width={35} alt="" />
              </div>
            </div>
            <Divider type="vertical" />
            <div className="flex gap-2 items-center">
              <span className="text-black font-bold font-whalebold">
                X -{" "}
                <a href="https://twitter.com/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363]">
                  @CycleXTeam
                </a>
              </span>
              <div>
                <img src="/assets/twitter-dark.png" width={35} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IDO;
