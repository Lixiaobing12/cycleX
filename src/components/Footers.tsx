import { Statistic } from "antd";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { messageContext } from "../App";
import useLocalStorage from "../hooks/localStorage";
import { fundProductApiType } from "../types/fundProduct";
import WrapperImg from "./Common/Img";

const { Countdown } = Statistic;
/** 用户协议弹窗 */

const Footers = () => {
  const { t, i18n } = useTranslation();
  const [toast] = useAtom(messageContext);
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  const navigate = useNavigate();
  const accessToken = useLocalStorage();

  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
  return (
    <div className="w-full p-4 md:p-20 flex flex-col bg-black" id="footer">
      <div className="flex justify-between items-end text-white md:w-[81%] m-auto flex-col md:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center">
            <img src="/assets/icon.png" className="w-8" alt="" />
            <span className="ml-4 text-2xl">CycleX</span>
          </div>
          <div className="flex gap-10 w-full my-4 text-md">
            <div className="flex flex-col gap-4">
              <div>{t("Products")}</div>
              {assets.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (accessToken) {
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
                  className="cursor-pointer hover:scale-105 text-md">
                  {item.simple_name}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div>{t("Corporation")}</div>
              <div onClick={() => navigate("/guide#us")} className="cursor-pointer">
                {t("About Us")}
              </div>
              <div onClick={() => navigate("/guide#law")} className="cursor-pointer">
                {t("Law and privacy")}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>{t("Support")}</div>
              {/* <div onClick={() => navigate("/guide#us")} className="cursor-pointer">
                {t("Contact us")}
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end mt-10 md:mt-0">
          <div>{t("Mobile application")}</div>
          <a className="w-2/6 md:w-44 cursor-pointer relative">
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-black rounded-box bg-[rgba(0,0,0,0.55)] flex items-center justify-center">
              <Countdown
                title=""
                value={1735488000000}
                format="DD:HH:mm:ss"
                valueStyle={{
                  color: "#fff",
                  fontFamily: "Whale-bold",
                  fontWeight: "bold",
                  fontSize: "0.9em",
                  textAlign: "center",
                }}
              />
            </div>
            <img src="/assets/download-en.png" alt="" />
          </a>
          <a className="w-2/6 md:w-44 cursor-pointer relative">
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-black rounded-box bg-[rgba(0,0,0,0.55)] flex items-center justify-center">
              <Countdown
                title=""
                value={1735488000000}
                format="DD:HH:mm:ss"
                valueStyle={{
                  color: "#fff",
                  fontFamily: "Whale-bold",
                  fontWeight: "bold",
                  fontSize: "0.9em",
                  textAlign: "center",
                }}
              />
            </div>
            <img src="/assets/download-appstore.png" alt="" />
          </a>
        </div>
      </div>

      <div className="text-white my-10 md:w-[81%] md:ml-[9%]">
        <div>
          <span className="rounded-md border border-light py-1 px-4 text-base">{t("More products coming soon")}</span>
        </div>
        <div className="text-white mt-10 text-xs">
          {i18n.language === "en" ? (
            <div>
              <p className="mb-2">CycleX is a digital asset platform supported by Whaleflow Group. The following licensed/registered entities are wholly-owned subsidiaries of Whaleflow Group: </p>
              <p className="mb-2">
                Whaleflow Group Usltd: Registered as a Money Services Business (MSB) (Registration No: 31000243370255) and holds an investment advisor license (RIA) under the regulation of the U.S.
                Securities and Exchange Commission (SEC). The tokenized funds it issues meet the SEC’s regulatory standards for securities-class crypto assets and are aimed at accredited investors who
                have passed KYC and anti-money laundering reviews.
              </p>
              <p className="mb-2">
                CycleX establishes an online asset pool (RWA pool) through Special Purpose Entities (SPE) or Special Purpose Vehicles (SPV), including cash, credit assets (such as bonds and
                securities), cryptocurrencies, and alternative investments (such as real estate and art). Assets are managed by qualified custodians to ensure the safety of investors' assets.
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2"> CycleX是由Whaleflow Group提供支持的数字资产平台，以下许可/注册实体是WhaleFlow Group的全资子公司： </p>{" "}
              <p className="mb-2">
                Whaleflow Group Usltd:
                注册为货币服务企业(MSB)(注册号:31000243370255)，具备美国证券交易委员会(SEC)监管下的投资顾问牌照(RIA)，其发行的代币化基金符合SEC监管的证券类加密资产标准，面向已通过KYC和反洗钱审核的合格投资者。
              </p>
              <p className="mb-2">
                CycleX以特殊目的实体(SPE)或特殊目的载体(SPV)为主体，构建线上资产池(RWA
                pool)，包含现金、信用资产(包括债券、证券)、加密货币以及另类投资(包括房地产、艺术品等)。资产由合格托管机构管理，确保投资者的资产安全。
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-between items-center text-white md:w-[81%] m-auto">
        <div className="flex gap-4 md:gap-10 text-sm">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/guide#law");
            }}>
            {t("Service agreement")}
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/guide#law");
            }}>
            {t("Privacy policy")}
          </span>
        </div>

        <div className="text-xs hidden md:flex">© 2024 WhaleFlow Group. All rights reserved.</div>

        <div className="flex gap-4 md:gap-10">
          <a href="https://t.me/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363]">
            <WrapperImg src="/assets/telegram.png" width={40} />
          </a>
          <a href="https://twitter.com/CycleXTeam" target="_blank" className="ml-2 hover:text-[#636363]">
            <WrapperImg src="/assets/twitter.png" width={40} />
          </a>
        </div>
      </div>

      <div className="text-xs md:hidden text-white m-auto my-8">© 2023 WhaleFlow Group. All rights reserved.</div>
    </div>
  );
};

export default Footers;
