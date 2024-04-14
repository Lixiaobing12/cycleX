import { Statistic } from "antd";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { messageContext } from "../App";
import { products_atom } from "../atom/fundProducts";
import { userInfo_atom } from "../atom/userInfo";
import News from "../components/Home/News";
import Process from "../components/Home/Process";
import ProofAssets from "../components/Home/Proof_Assets";
import Reassets from "../components/Home/Re_Assets";
import TodoListAssets from "../components/Home/Todo_Assets";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import { fundProductApiType } from "../types/fundProduct";
import { scientific } from "../utils/BigNumberToString";

const getAssetsBgImg = (ind = 1) => {
  return ind % 3 === 0 ? "bg-assets_t" : ind % 2 === 0 ? "bg-assets_s" : "bg-assets_f";
};

const { Countdown } = Statistic;

export default function Home() {
  const [users] = useAtom(userInfo_atom);
  const [toast] = useAtom(messageContext);
  const { t, i18n } = useTranslation();
  const [openNotice, setNotice] = useState(true);
  const [assets, setAssetsItems] = useAtom(products_atom);
  const { handleTranslate } = useTranslateLocalStorage();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(
      async ({
        data,
      }: {
        data: {
          data: fundProductApiType[];
        };
      }) => {
        let items = [];
        if (data.data.length > 3) {
          items = data.data.slice(0, 3);
        } else {
          items = data.data;
        }
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
        }
        setAssetsItems(items);
      }
    );
  }, []);
  return (
    <div>
      <div className="relative text-white">
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
            <p className="tracking-widest	text-2xl md:text-4xl mb-10">{t("The tokenized fund is online")}</p>
            <p className="text-sm md:text-lg text-grey text-center tracking-widest leading-relaxed">
              {t("CycleX is committed to creating a transparent and secure tokenized asset trading platform, no matter in the world")}
              <br />
              {t("Anywhere, make it easier for users to hold high-quality assets around the world")}
            </p>
          </div>
        </div>
        <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto">
          <div className="flex flex-wrap gap-4 item-center justify-center my-20" id="fund">
            {assets.map((item, ind) => (
              <div key={item.id} className={`bg-black rounded-box p-4 flex flex-col justify-evenly ${getAssetsBgImg(ind++)} w-full lg:w-[30%] min-h-80 bg-100`}>
                <div className="flex items-center my-4">
                  <img src="/assets/dollor_r.png" width={30} alt="" />
                  <span className="text-2xl font-bold font-whalebold ml-2">{item.name}</span>
                </div>
                <div className="flex w-full flex-wrap gap-4 mb-10">
                  {item.labelsDcts?.map(({ zh, en }) => (
                    <div className="rounded-full px-4 py-1 bg-[#222] text-grey text-sm" key={en + v4()}>
                      {i18n.language === "en" ? en : zh}
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-2xl font-bold font-whalebold">{item.income2}</span>
                  {t("Annual yield")}(APY)
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-4">
                    <div>
                      <div className="font-bold bg-white rounded-full px-4 py-1 text-[#000]">$ {scientific(item.market_value)} AUM</div>
                    </div>
                    <img src="/assets/eth.png" width={30} alt="" />
                  </div>
                  <img
                    src="/assets/right.png"
                    width={30}
                    className="cursor-pointer hover:scale-105"
                    onClick={() => {
                      if (users) {
                        navigate(`/assets/${item.id}`);
                      } else {
                        toast?.info(t("please sign in"));
                        navigate("/login?t=in");
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="md:p-10 mt-10 md:mt-0">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6 font-bold text-whalebold">{t("Mass asset realization")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("Tokenization of fairly audited excess collateral for seamless access to real assets")}</p>
            </div>
            <Reassets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6 font-bold text-whalebold">{t("Information Asset List")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("The most reliable real assets, standard institutional financial products through tokenization")}</p>
            </div>
            <TodoListAssets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6 font-bold text-whalebold">{t("Certificate of Asset Reserve (POR)")}</h1>
              <p className="text-greyblack  font-bold font-whalebold">{t("New/locked real assets are updated/updated monthly and disclosed through authoritative auditing institutions")}</p>
            </div>
            <ProofAssets />
          </div>

          <div className="md:p-10 mt-28 md:mt-20">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6 font-bold text-whalebold">{t("Transaction flow")}</h1>
              <p className="text-greyblack  font-bold font-whalebold text-sm">{t("The easiest way to buy tokenized assets without having to deal with cumbersome transaction processes")}</p>
            </div>
            <Process />
            <div className="flex flex-col gap-4 items-left text-black mt-12 text-sm">
              <h2 className="font-bold font-whalebold text-base">{t("Friendly reminder")}</h2>
              <p>
                <span className="font-bold font-whalebold">{t("Asset SPV")}</span>{" "}
                <span className="text-threePranentTransblack ml-4">
                  {t("The underlying assets of the corresponding tokenized funds are anchored and audited to ensure the safety and transparency of the assets")}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("Distributionsphase")}</span>{" "}
                <span className="text-threePranentTransblack ml-4">
                  {t(
                    "CycleX App issues this tokenized asset/fund and deploits it to the public chain, which currently only supports Ethereum and will be added in the future, please check the update tips at that time"
                  )}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("Transaction platform")}</span>{" "}
                <span className="text-threePranentTransblack ml-4">
                  {t(
                    "Users submit KYC review on the platform and invest in such assets, provide closed/open according to the asset class, and enjoy the corresponding returns after the purchase is completed"
                  )}
                </span>
              </p>
              <p>
                <span className="font-bold font-whalebold">{t("yield profit")}</span>{" "}
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
                  value={1718294400000}
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
              <h1 className="text-black text-3xl font-bold text-whalebold">{t("Q&A")}</h1>
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
        </div>
        <div className="w-[92%] m-auto md:p-10 mt-14 md:mt-0">
          <div className="w-full text-center mb-14 md:mb-20">
            <h1 className="text-black text-3xl mb-6">{t("News and insights")}</h1>
          </div>
          <div className="w-full lg:w-5/6 m-auto">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
}
