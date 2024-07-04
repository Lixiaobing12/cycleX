import { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { product_info } from "../atom/product";
import Constitute from "../components/Assets/Constitute";
import Deposit from "../components/Assets/Deposit";
import Performance from "../components/Assets/Performance";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import { fundProductApiType } from "../types/fundProduct";
import { scientific } from "../utils/BigNumberToString";
import { request } from "../utils/request";

export default function Assets() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [product, setProductInfo] = useAtom(product_info);
  const { handleTranslate } = useTranslateLocalStorage();

  useEffect(() => {
    request.post("/api/api/fundProduct/getDetail", { id: params.id }).then(async ({ data }: { data: AxiosResponse<fundProductApiType> }) => {
      const p = document.createElement("p");
      p.innerHTML = data.data.desc;
      data.data.descDcts = {
        key: "",
        zh: data.data.desc,
        en: await handleTranslate(p.textContent!),
      };
      for (let j = 0; j < data.data.labels.length; j++) {
        const text = await handleTranslate(data.data.labels[j]);
        data.data.labelsDcts?.push({
          key: data.data.labels[j],
          zh: data.data.labels[j],
          en: text,
        });
      }
      const lock_en = await handleTranslate(data.data.lock);
      data.data.lockDct = {
        key: data.data.lock,
        zh: data.data.lock,
        en: lock_en,
      };
      setProductInfo(data.data);
    });
  }, [params]);
  return (
    <>
      <div className="relative text-white" id="main">
        <div className="relative flex items-center justify-center">
          <img src="/assets/assets_bg.png" className="w-full h-[80vh]" alt="" />
          <div className="absolute flex flex-col left-4 top-[10%] md:top-[20%] md:left-[20%]">
            <p className="tracking-widest	text-2xl font-bold font-whalebold mb-8 flex items-center gap-4">
              <img src="/assets/assets_dollor.png" className="w-12" alt="" />
              <span>{product?.name}</span>
            </p>
            <p
              className="text-grey text-left tracking-widest leading-relaxed text-xl w-11/12 md:w-8/12 text-sm lg:text-xs"
              dangerouslySetInnerHTML={{ __html: product ? (i18n.language === "en" ? product?.descDcts?.en! : product?.descDcts?.zh!) : "" }}></p>
            <div className="flex gap-10 items-end mt-14 mb-10">
              <div className="text-3xl">
                $<CountUp end={Number(product?.net_worth ?? 0)} start={0} duration={4} />
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
              <div className="leading-normal text-base bg-white rounded-full px-4 py-1 text-[#000]">$ {scientific(Number(product?.market_value) + 300000)} TVL</div>
              <img src="/assets/eth_white.png" width={30} alt="" />
            </div>
            {/* {product?.img_url && <img src={product.img_url} className="w-full h-" alt="" />} */}
          </div>
        </div>
        <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-10">
          <div className="mt-14">
            <Deposit />
          </div>

          <div className="mt-14">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6">{product?.name}</h1>
            </div>
            <Constitute />
          </div>
          {product?.id === 8 && (
            <>
              <div className="mt-14">
                <div className="w-full text-center mb-14 md:mb-20">
                  <h1 className="text-black text-3xl mb-6">Fund Overview</h1>
                </div>
                <img src="/assets/CFOF/overview.png" />
              </div>
              <div className="mt-14">
                <div className="w-full text-center mb-14 md:mb-20">
                  <h1 className="text-black text-3xl mb-6">Fund Process</h1>
                </div>
                <img src="/assets/CFOF/process.png" />
              </div>

              <div className="mt-14">
                <div className="w-full text-center mb-14 md:mb-20">
                  <h1 className="text-black text-3xl mb-6">Product Analysis</h1>
                </div>
                <img src="/assets/CFOF/analysis.png" />
              </div>
            </>
          )}

          <div className="mt-14">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6">{t("Performance")}</h1>
            </div>
            <Performance />
          </div>

          <div className="mt-14">
            <div className="w-full text-center mb-14 md:mb-20">
              <h1 className="text-black text-3xl mb-6">{t("Q&A")}</h1>
            </div>
            <div className="w-full rounded-box border border-light p-6">
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-base font-normal">{t("Issuance and redemption process for assets")}</summary>
                <div className="collapse-content text-sm text-threePranentTransblack leading-6">
                  <p>
                    {t(
                      "The issuance and redemption process of assets is an important link in tokenized asset management, involving multiple steps and coordination between parties. The issuance process includes steps such as asset creation, token issuance and distribution. The redemption process of assets includes steps such as investor request for redemption, redemption review and redemption of tokens."
                    )}
                  </p>
                </div>
              </details>

              <div className="divider my-0"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-base font-normal">{t("The user goes through the KYC authentication process")}</summary>
                <div className="collapse-content text-sm text-threePranentTransblack leading-6">
                  <p>
                    {t(
                      "KYC authentication refers to the Know Your Customer identity verification and compliance review process. The KYC process for users usually includes steps such as submitting personal or organizational information, data review and confirmation. These steps are designed to ensure that transaction participants are in compliance with relevant regulations and compliance requirements."
                    )}
                  </p>
                </div>
              </details>
              <div className="divider my-0"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-base font-normal">{t("Composition and management of asset subject matter")}</summary>
                <div className="collapse-content text-sm text-threePranentTransblack leading-6">
                  <p>
                    {t(
                      "The composition and management of asset subject matter involves multiple roles and components, including asset management companies, fund managers, technology service companies, tokenized assets, CycleX App and fund management consulting, among others. These components work together to provide functions such as asset management, technical support, trading platform and reporting services."
                    )}
                  </p>
                </div>
              </details>

              <div className="divider my-0"></div>
              <details className="collapse collapse-arrow bg-white text-black">
                <summary className="collapse-title text-base font-normal">{t("Fees charged")}</summary>
                <div className="collapse-content text-sm text-threePranentTransblack leading-6">
                  <p>
                    {t(
                      "The fees charged include management fees, transaction fees and custodial fees. Management fees are charged depending on the asset class and are typically between 0.1% and 2% of the fund's size. Transaction fees may vary depending on the circumstances. Custodial fees are typically charged by third-party custodians and are typically between 0.1% and 0.2% of the fund size."
                    )}
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
