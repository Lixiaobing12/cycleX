import { ConfigProvider, Statistic } from "antd";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { messageContext } from "../App";
import { products_atom } from "../atom/fundProducts";
import News from "../components/Home/News";
import Process from "../components/Home/Process";
import ProofAssets from "../components/Home/Proof_Assets";
import Reassets from "../components/Home/Re_Assets";
import TodoListAssets from "../components/Home/Todo_Assets";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { fundProductApiType } from "../types/fundProduct";
import { scientific } from "../utils/BigNumberToString";
import { userInfo_atom } from "../atom/userInfo";
import moment from "moment";
import CountUp from "react-countup";
import Divdend from "../components/Home/Dividend";

const getAssetsBgImg = (ind = 1) => {
  return ind % 3 === 0 ? "bg-assets_t" : ind % 2 === 0 ? "bg-assets_s" : "bg-assets_f";
};

const { Countdown } = Statistic;

export default function Home() {
  const [users] = useAtom(userInfo_atom);
  const [toast] = useAtom(messageContext);
  const { t, i18n } = useTranslation();
  const [assets, setAssetsItems] = useAtom(products_atom);
  const { handleTranslate } = useTranslateLocalStorage();
  const navigate = useNavigate();
  const [tvl, setTvl] = useState(0);
  const [aum, setAum] = useState(0);

  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(
      async ({
        data,
      }: {
        data: {
          data: fundProductApiType[];
        };
      }) => {
        let items = data.data;
        let _tvl = 0;
        let _aum = 0;
        for (let i = 0; i < items.length; i++) {
          items[i].labelsDcts = [];
          for (let j = 0; j < items[i].labels.length; j++) {
            const data = await handleTranslate(items[i].labels[j]);
            items[i].labelsDcts?.push({
              key: items[i].labels[j],
              zh: items[i].labels[j],
              en: data,
            });
          }
          _tvl += Number(items[i].market_value);
          _aum += Number(items[i].aum_value);
        }
        console.log(_tvl, _aum);
        setAssetsItems(items);
        setTvl(_tvl);
        setAum(_aum);
      }
    );
  }, []);
  return (
    <div>
      <div className="relative text-white pb-10">
        {/* {openNotice && (
          <div className="bg-[#1a1a1a] w-full absolute top-0 h-[50px] leading-[50px] text-center">
            {t("Latest online RWA")}
            <a className="ml-10 cursor-pointer">{t("learn more")}</a>
            <img src="/assets/x.png" className="absolute cursor-pointer top-[10px] right-10" width={25} onClick={() => setNotice(false)} />
          </div>
        )} */}
        <div className="relative flex items-center justify-center">
          <img src="/assets/home_content.png" className="w-full h-screen md:h-[80vh]" alt="" />
          <div className="absolute flex flex-col items-center mt-[-120px] w-[94%] m-auto text-center">
            <p className="tracking-widest	text-2xl md:text-4xl mb-10">{t("The Tokenized Fund is Online")}</p>
            <p className="text-sm md:text-lg text-grey text-center tracking-widest leading-relaxed">
              {t("CycleX is committed to creating a transparent and secure tokenized asset trading platform")}
              <br />
              {t("No matter anywhere, make it easier for users to hold high-quality assets around the world")}

              <span className="border-y-glass flex justify-between items-center mt-20 w-full py-6 text-white">
                {tvl / 100_000_000 > 0.1 ? (
                  <CountUp end={Number((tvl / 1_000_000).toFixed(2))} decimals={2} suffix="M TVL" prefix="$" />
                ) : (
                  <CountUp end={Number((tvl / 1000).toFixed(2))} decimals={2} suffix="K TVL" prefix="$" />
                )}

                {aum / 100_000_000 > 0.1 ? (
                  <CountUp end={Number((aum / 1_000_000).toFixed(2))} decimals={2} suffix="M AUM" prefix="$" />
                ) : (
                  <CountUp end={Number((aum / 1000).toFixed(2))} decimals={2} suffix="K AUM" prefix="$" />
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="w-[92%] md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-5/12 m-auto">
          <div className="md:p-10 mt-10 md:mt-0">
            <div className="w-full text-center">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("Start Investing")}</h1>
              <div className="w-full bg-[rgb(191,249,254)] justify-center items-center text-black rounded-box py-4  hidden lg:flex">
                <img src="/assets/fire.png" width={16} alt="" />
                <img src="/assets/fire.png" width={16} alt="" />
                <img src="/assets/fire.png" width={16} alt="" />
                <span className="mx-2 font-bold font-whalebold">{t("Start investing and claim your $WFC airdrop now")}</span>
                <img src="/assets/gift.png" width={16} alt="" />
                <div className="bg-black rounded-full text-[rgb(102,198,206)] text-xs px-4 py-1 ml-2 cursor-pointer" onClick={() => navigate("/blindbox")}>
                  {t("View airdrop rules")}
                  {">"}
                </div>
              </div>
              <div className="block lg:hidden">
                <div className="flex bg-[rgb(191,249,254)] justify-around items-center text-black rounded-box py-4">
                  <div className="flex items-center justify-center">
                    <img src="/assets/fire.png" width={16} alt="" />
                    <span className="mx-2 font-bold font-whalebold">{t("Claim Your $WFC Now")}</span>
                    <img src="/assets/gift.png" width={16} alt="" />
                  </div>

                  <img src="/assets/invest_arrow.png" width={16} alt="" onClick={() => navigate("/blindbox")} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 item-center justify-center my-20 mt-4" id="fund">
            <div className={`grid grid-cols-1 lg:grid-cols-${assets.length} w-full gap-4 md:p-10`}>
              {assets.map((item, ind) => (
                <div key={item.id} className={`bg-black rounded-box p-4 flex flex-col justify-evenly ${getAssetsBgImg(ind++)} w-full min-h-80 bg-100`}>
                  <div className="flex items-center my-4">
                    <img src="/assets/dollor_r.png" width={30} alt="" />
                    <span className="text-2xl font-bold font-whalebold ml-2">{item.simple_name}</span>
                  </div>
                  <div className="flex w-full flex-wrap gap-4 mb-10">
                    {item.labelsDcts?.map(({ zh, en }) => (
                      <div className="rounded-full px-4 py-1 bg-[#222] text-grey text-sm" key={en + v4()}>
                        {i18n.language === "en" ? en : zh}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-whalebold mr-1">{Number(item.income).toFixed(0) + "%"}</span>
                    {t("Annual yield")}(APY)
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-4">
                      <div>
                        <div className="font-bold bg-white rounded-full px-4 py-1 text-[#000]">$ {scientific(Number(item.market_value))} TVL</div>
                      </div>
                      <div className="flex items-center">
                        <img src="/assets/eth.png" className="w-8 h-8" alt="" />
                        <img src="/assets/usdt.png" className="w-8 h-8 mx-1" alt="" />
                        <img src="/assets/bevm.png" className="w-8 h-8" alt="" />
                        <img src="/assets/merlin.png" className="w-8 h-8 mx-1" alt="" />
                      </div>
                    </div>
                    <img
                      src="/assets/right.png"
                      width={30}
                      className="cursor-pointer hover:scale-105"
                      onClick={() => {
                        console.log("user", users);
                        if (users) {
                          navigate(`/assets/${item.id}#main`);
                        } else {
                          toast?.warning({
                            message: t("please sign in"),
                            icon: <img src="/assets/error.png" width={30} />,
                            onClose() {
                              navigate("/login?t=in");
                            },
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="md:p-10 mt-10 md:mt-0">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: '#080a0b',
                  colorText: '#fff'
                },
                components: {
                  Table: {
                    borderColor: "rgba(255,255,255,0.12)",
                    cellFontSizeSM: 12,
                    headerBg: "#080a0b",
                    headerColor: "#fff",
                    headerSplitColor: "#080a0b",
                    headerBorderRadius: 0,
                    footerBg: "#080a0b",
                    stickyScrollBarBg: "#080a0b",
                    rowHoverBg: "#080a0b",
                  },
                },
              }}>
              <Divdend />
            </ConfigProvider>
          </div> */}

          <div className="md:p-10 mt-10 md:mt-0">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("Mass Asset Realization")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("Tokenization of fairly audited excess collateral for seamless access to real assets")}</p>
            </div>
            <Reassets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("Information Asset List")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("The most reliable real assets, standard institutional financial products through tokenization")}</p>
            </div>
            <TodoListAssets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("Certificate of Asset Reserve (POR)")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("New/locked real assets are updated/updated monthly and disclosed through authoritative auditing institutions")}</p>
            </div>
            <ProofAssets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("Transaction Flow")}</h1>
              <p className="text-greyblack  font-bold font-whalebold text-sm">{t("The easiest way to buy tokenized assets without having to deal with cumbersome transaction processes")}</p>
            </div>
            <Process />
            <div className="flex flex-col gap-4 items-left text-black mt-12 text-sm">
              <h2 className="font-bold font-whalebold text-base">{t("Friendly Reminder")}</h2>
              <p>
                <span className="font-bold font-whalebold">{t("Asset SPV")}</span>
                <span className="text-threePranentTransblack ml-4">
                  {t("The underlying assets of the corresponding tokenized funds are anchored and audited to ensure the safety and transparency of the assets")}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("Distributions Phase")}</span>
                <span className="text-threePranentTransblack ml-4">
                  {t(
                    "CycleX App issues this tokenized asset/fund and deploits it to the public chain, which currently only supports Ethereum and will be added in the future, please check the update tips at that time"
                  )}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("Transaction Platform")}</span>
                <span className="text-threePranentTransblack ml-4">
                  {t(
                    "Users submit KYC review on the platform and invest in such assets, provide closed/open according to the asset class, and enjoy the corresponding returns after the purchase is completed"
                  )}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("Yield Prof")}</span>
                <span className="text-threePranentTransblack ml-4">
                  {t(
                    "Users to CycleX App select products according to the list of invested products to submit to the C2C trading floor transfer/different types of products can be redeemed automatically"
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="md:p-10 mt-14" id="download">
            <div className="w-full rounded-box bg-[#19191A] flex justify-around px-4 md:px-10 flex-col md:flex-row pt-10 relative">
              <div className="absolute left-0 right-0 top-0 bottom-0 bg-black rounded-box bg-[rgba(0,0,0,0.55)] flex items-center justify-center">
                <Countdown
                  title={<div className="text-white font-bold font-whalebold text-lg text-center">The date to open the app</div>}
                  value={1726386230000}
                  format="DD:HH:mm:ss"
                  valueStyle={{
                    color: "#fff",
                    fontFamily: "Whale-bold",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    textAlign: "center",
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col gap-6 md:mt-[8%] md:ml-[5%]">
                <h2 className="text-2xl">{t("Download our products to invest")}</h2>
                <h2 className="text-2xl">CycleX App</h2>
                <p>{t("Global RWA trading platform with all the assets you need")}</p>
                <div className="flex gap-8 items-center mt-10">
                  <a href="https://mp-cd080341-1a5f-41e1-a2ff-373ad4347341.cdn.bspapp.com/cyclex/cyclex_latest.apk" className="w-2/6 cursor-pointer">
                    <img src="/assets/download-en.png" alt="" />
                  </a>
                  <img src="/assets/download-appstore.png" className="w-2/6 cursor-pointer" onClick={() => window.open("https://apps.apple.com/us/app/cyclex/id6464595733")} alt="" />
                </div>
              </div>
              <div className="flex-1">
                <img src="/assets/download-phone-en.png" alt="" />
              </div>
            </div>
          </div>

          <div className="md:p-10 mt-14 md:mt-0">
            <div className="w-full text-center mb-8">
              <h1 className="text-black text-2xl font-bold text-whalebold">{t("Q&A")}</h1>
            </div>
            <div className="w-full rounded-box border border-transblack py-6">
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-md font-normal">{t("What are the issuance and redemption processes for assets?")}</summary>
                <div className="collapse-content text-sm text-black-800 leading-6">
                  <h2 className="text-black text-base  font-bold font-whalebold">{t("The issuance and redemption process for an asset usually involves the following steps")}:</h2>

                  <h3 className="text-black text-base my-2">{t("Issuance process")}</h3>
                  <ul className="ml-4">
                    <li>
                      {t(
                        "Create an asset: Before issuing a tokenized asset, it needs to be created. This may involve the asset manager or issuer working with a partner, such as a technology service provider, to determine the characteristics, parameters, and compliance requirements of the asset."
                      )}
                    </li>
                    <li>
                      {t(
                        "Issue tokens: Once the asset is created, the tokens are issued onto the blockchain network via smart contracts. This includes determining the number of tokens, the mechanism for allocating the tokens, and the rules for issuing the tokens."
                      )}
                    </li>
                    <li>
                      {t(
                        "Distribute the tokens: Once the tokens have been issued, the tokens can be distributed to investors. This may include a private distribution to designated investors or an offering on the open market."
                      )}
                    </li>
                  </ul>

                  <h3 className="text-black text-base my-2">{t("Redemption process")}:</h3>
                  <ul className="ml-4">
                    <li>
                      {t(
                        "Investor Request for redemption: The investor decides to redeem the tokens held by him/her and makes a redemption request to the asset management company or relevant institution."
                      )}
                    </li>
                    <li>
                      {t(
                        "Redemption review: The asset management company or relevant institution reviews the redemption request to ensure that the request complies with relevant regulations and contract provisions."
                      )}
                    </li>
                    <li>
                      {t(
                        "Redemption of tokens: Once the redemption request is reviewed and approved, the asset management company or relevant institution will redeem the corresponding number of tokens and send the corresponding funds to the investors."
                      )}
                    </li>
                  </ul>
                </div>
              </details>
              <div className="w-[98%] bg-transblack h-[1px] m-auto"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-md font-normal">{t("How do users go through the KYC authentication process?")}</summary>
                <div className="collapse-content text-sm text-black-800">
                  <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("The KYC authentication process for users usually includes the following steps")}:</h2>
                  <ul className="ml-4">
                    <li>{t("Submit information: Users submit personal or organizational information required for KYC certification on the CycleX website or App.")}</li>
                    <li>
                      {t("Audit: The asset management company or relevant organization reviews the submitted KYC information to ensure that it complies with regulations and compliance requirements.")}
                    </li>
                    <li>{t("Audit: After the audit is approved, the user will receive a confirmation notification that their KYC certification is complete.")}</li>
                  </ul>
                </div>
              </details>
              <div className="w-[98%] bg-transblack h-[1px] m-auto"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-md font-normal">{t("What is the structure and management of the asset lease?")}</summary>
                <div className="collapse-content text-sm text-black-800 leading-6">
                  <h2 className="text-black text-base  font-bold font-whalebold my-2">
                    {t("The composition and management of the asset subject matter involves the following main roles and components")}:
                  </h2>

                  <ul className="ml-4">
                    <li>{t("Asset management company: The general partner (GP) who directs the service provider and manages the fund.")}</li>
                    <li>{t("Fund Manager: assists in fund issuance and provides fund management services.")}</li>
                    <li>{t("Technical service company: provide technical service support for fund tokenization.")}</li>
                    <li>{t("Tokenized assets: controlled by the SPV asset subject managed by the asset management company.")}</li>
                    <li>{t("CycleX App: provides functions such as project release, user transaction management, redemption and transfer process.")}</li>
                    <li>{t("Fund management consulting: Independent fund managers are responsible for accounting and reporting, such as calculating daily NAV prices.")}</li>
                  </ul>
                </div>
              </details>
              <div className="w-[98%] bg-transblack h-[1px] m-auto"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-md font-normal">{t("What are the fees?")}</summary>
                <div className="collapse-content text-sm text-black-800 leading-6">
                  <h2 className="text-black text-base  font-bold font-whalebold my-2">{t("The fees charged usually include")}:</h2>

                  <ul className="ml-4">
                    <li>{t("Management fees: Management fees are charged depending on the asset class, usually between 0.1% and 2% of the fund size.")}</li>
                    <li>{t("Transaction fees: not currently charged.")}</li>
                    <li>{t("Custodial fees: Typically 0.1% to 0.2% of the fund size, charged by third-party custodians.")}</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          <div className="md:p-10 mt-14 md:mt-0">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-2xl mb-6 font-bold text-whalebold">{t("News & Insights")}</h1> </div>
            <News />
          </div>
        </div>
        {/* <div className="w-[92%] m-auto md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-2xl mb-6 font-bold">{t("News & Insights")}</h1>
          </div>
          <div className="w-full lg:w-5/6 m-auto">
            <News />
          </div>
        </div> */}
      </div>
    </div>
  );
}
