import { Divider, Statistic } from "antd";
import { useAtom } from "jotai";
import { useReducer, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import WrapperButton from "../components/Common/Button";
import WrapperImg from "../components/Common/Img";

type GlobalAggregates = {
  /**活跃贷款价值 */
  active_originated_amount_sum: number;
  /**贷款总额 */
  total_originated_amount_sum: number;
  /** apy */
  total_yield_avg: number;
  /** 时间 */
  updated_at: string;
  /** 稳定币市值 */
  marketCapSum: number;
  /** 周转帐量 */
  weeklyTransferVolume: number;
  /** 活跃地址数 */
  totalActiveAddresses: number;
  /** 国债总量 */
  treasuriesTotalValue: number;
  /**国债到期收益 */
  AvgYieldMaturity: number;
  /** 加权平均期限 */
  weightedAverageMaturity: string;
};
const Airdrop = () => {
  const [toast] = useAtom(messageContext);
  const { t } = useTranslation();
  const [activeItem, setItem] = useState(0);
  const defaultValue = {
    active_originated_amount_sum: 617330042.8889341,
    total_originated_amount_sum: 4459662347.924616,
    total_yield_avg: 0.09794504915989004,
    updated_at: "",
    marketCapSum: 114031920434.13742,
    weeklyTransferVolume: 365598574544.781,
    totalActiveAddresses: 762735,
    treasuriesTotalValue: 630983906.889,
    AvgYieldMaturity: 0.00507,
    weightedAverageMaturity: "0.095 yrs",
  };
  const reducerAction = (state: GlobalAggregates, { type, value }: { type: string; value: any }) => {
    switch (type) {
      case "active_originated_amount_sum":
        return { ...state, active_originated_amount_sum: value };
      case "total_originated_amount_sum":
        return { ...state, total_originated_amount_sum: value };
      case "total_yield_avg":
        return { ...state, total_yield_avg: value };
      case "updated_at":
        return { ...state, updated_at: value };
      case "marketCapSum":
        return { ...state, marketCapSum: value };
      case "weeklyTransferVolume":
        return { ...state, weeklyTransferVolume: value };
      case "totalActiveAddresses":
        return { ...state, totalActiveAddresses: value };
      default:
        return { ...state };
    }
  };
  const [globalAggregates, setGlobalAggregates] = useReducer(reducerAction, defaultValue);

  // useEffect(() => {
  //   if (activeItem === 0) {
  //     request.get("/next/data/HQ50hhSBSC9hYQ7hQt7z5/index.json").then(({ data }) => {
  //       setGlobalAggregates({ type: "active_originated_amount_sum", value: data.pageProps.initialState.globalAggregates.active_originated_amount_sum });
  //       setGlobalAggregates({ type: "total_originated_amount_sum", value: data.pageProps.initialState.globalAggregates.total_originated_amount_sum });
  //       setGlobalAggregates({ type: "total_yield_avg", value: data.pageProps.initialState.globalAggregates.total_yield_avg });
  //       setGlobalAggregates({ type: "updated_at", value: data.pageProps.initialState.globalAggregates.updated_at });
  //     });
  //     request.get("/next/data/HQ50hhSBSC9hYQ7hQt7z5/stablecoins.json").then(({ data }) => {
  //       setGlobalAggregates({ type: "marketCapSum", value: data.pageProps.aggregates.marketCapSum });
  //       setGlobalAggregates({ type: "weeklyTransferVolume", value: data.pageProps.aggregates.totalTransferVolume });
  //       setGlobalAggregates({ type: "totalActiveAddresses", value: data.pageProps.aggregates.totalActiveAddresses });
  //     });
  //   }
  // }, [activeItem]);
  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/airdrop-bg.png" className="w-full h-[80vh]" alt="" />
        <p className="text-white text-4xl text-center absolute  font-bold font-whalebold">{t("Leading world-class RWA trading platform")}</p>
      </div>
      <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-20">
        <div className="flex flex-col md:flex-row justify-between flex-wrap md:item-center gap-2">
          <div className="flex gap-6">
            <WrapperButton click={() => setItem(0)} isActive={activeItem === 0}>
              {t("Private Credit")}
            </WrapperButton>
            <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
              {t("U.S. Treasury")}
            </WrapperButton>
            <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
              {t("Stablecoin")}
            </WrapperButton>
          </div>
          <div className="flex gap-2 items-center self-end text-greyblack">
            {t("Last Updated: Apr. 2024")}
            <a>
              <WrapperImg src="/assets/reflush.png" width={18} />
            </a>
          </div>
        </div>

        <div className="flex items-start md:items-center md:justify-between my-10 flex-col md:flex-row gap-4">
          {activeItem === 0 ? (
            <>
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Active Loans Value")}
                value={globalAggregates.active_originated_amount_sum}
                formatter={(value) => <CountUp end={value as number} separator="," decimal="." decimals={2} prefix="$" />}
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Total Loans Value")}
                value={globalAggregates.total_originated_amount_sum}
                formatter={(value) => <CountUp end={value as number} separator="," decimal="." decimals={2} prefix="$" />}
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Current Avg. APR")}
                value={globalAggregates.total_yield_avg * 100}
                precision={2}
                suffix="%"
              />
            </>
          ) : activeItem === 1 ? (
            <>
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Market Cap")}
                value={globalAggregates.marketCapSum}
                formatter={(value) => <CountUp end={value as number} separator="," decimal="." decimals={2} prefix="$" />}
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Weekly Transfer Volume")}
                value={globalAggregates.weeklyTransferVolume}
                formatter={(value) => <CountUp end={value as number} separator="," decimal="." decimals={2} prefix="$" />}
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Total Active Addresses")}
                value={globalAggregates.totalActiveAddresses}
                formatter={(value) => <CountUp end={value as number} separator="," />}
              />
            </>
          ) : (
            <>
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Total Value")}
                value={globalAggregates.treasuriesTotalValue}
                formatter={(value) => <CountUp end={value as number} separator="," decimal="." decimals={2} prefix="$" />}
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Weighted Average Maturity")}
                value={globalAggregates.AvgYieldMaturity}
                suffix="%"
              />
              <Statistic
                valueStyle={{
                  fontSize: "2.2em",
                  fontWeight: "bold",
                }}
                title={t("Weighted Average Maturity")}
                value={globalAggregates.weightedAverageMaturity}
              />
            </>
          )}
        </div>

        <Divider />

        {activeItem === 0 ? (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t(
              "Earn real income by investing in corporate private credit, a $1.6T market in traditional finance where credit agreements facilitate organization, deal financing and borrower repayment"
            )}
          </p>
        ) : activeItem === 1 ? (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t("View tokenized US treasuries, bonds, and cash-equivalents and understand the nuances between them. Read our deep dive research report on tokenized treasuries on the")}
            <a
              href="https://rwa.xyz/blog"
              className="text-blue hover:text-blue underline underline-offset-4"
              target="_blank"
              rel="noopener"
              referrerPolicy="origin-when-cross-origin"
              draggable="false">
              RWA.xyz Research Blog
            </a>
          </p>
        ) : (
          <p className="text-xl  font-bold font-whalebold my-20 text-center">
            {t("Explore the activity and risks behind crypto and asset-backed stablecoins. View encumbent and new issuer on-chain traction, regulatory information, and structural data.")}
          </p>
        )}

        <Divider />

        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("About us")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CycleX is committed to building a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently, no matter where they are. Through the collaborative efforts of the asset management department and the tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and achieved seamless interactions. In the process, we improve the accessibility of financial products and connect traditional assets through smart contracts to provide users with the best choices. In addition to our technical efforts, we also actively embrace regulation, protect investors, establish a transparent reporting system, and continuously iterate on smart contracts. We work with leading industry partners to provide best-in-class services to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you can find detailed disclosures about the product, how it operates, and eligibility requirements. If you are interested in a product, you can invest through a digital wallet link. The currency units we accept include US dollars and US dollar stablecoins."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("White paper")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CycleX is committed to building a transparent and secure tokenized asset trading platform that makes it easier for users to hold high-quality assets around the world, no matter where they are located. Through the collaborative efforts of the Asset management department and the tokenization Technology department, we have built a global decentralized reality asset solution with system integrity and seamless interaction. In the process, we have improved the accessibility of financial products, connecting traditional assets through smart contracts to provide users with the best options. In addition to our technical efforts, we have embraced regulation, investor protection, transparent reporting, and continuous iterations of smart contracts. We work with leading industry partners to provide first-class service to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you will find detailed disclosures about the products, how they operate and eligibility requirements. If you are interested in a product, you can invest through the digital wallet link. The currency units we accept include US dollars and US dollar stablecoins. If you would like more information or to get in touch with us, you can email us at services@whaleflow.co. Our updates are posted on our X social platform and Telegram, where you can follow our latest news."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>

        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("IDO plan")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CycleX is committed to building a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently, no matter where they are. Through the collaborative efforts of the asset management department and the tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and achieved seamless interactions. In the process, we improve the accessibility of financial products and connect traditional assets through smart contracts to provide users with the best choices. In addition to our technical efforts, we also actively embrace regulation, protect investors, establish a transparent reporting system, and continuously iterate on smart contracts. We work with leading industry partners to provide best-in-class services to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you can find detailed disclosures about the product, how it operates, and eligibility requirements. If you are interested in a product, you can invest through a digital wallet link. The currency units we accept include US dollars and US dollar stablecoins."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>

        <div className="text-center">
          <button
            className="btn btn-wide bg-black text-white"
            onClick={() => {
              toast?.warning(t("Coming soon"));
            }}>
            {t("Receive airdrop")}
          </button>
        </div>

        <div className="mt-28">
          <div className="text-center text-2xl  font-bold font-whalebold">{t("Contact us")}</div>

          <div className="flex items-center justify-center mt-14 gap-6">
            <div className="flex gap-2 items-center">
              <span className="text-black font-bold font-whalebold">{t("Telegram community")}</span>
              <div>
                <img src="/assets/telegram-drak.png" width={35} alt="" />
              </div>
            </div>
            <Divider type="vertical" />
            <div className="flex gap-2 items-center">
              <span className="text-black font-bold font-whalebold">
                X - twitter <span className="ml-6">Team</span>
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
export default Airdrop;
