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
  const { t } = useTranslation();
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
            <span className="ml-4 text-2xl">CycleX App</span>
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
                  {item.name}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div>{t("Corporation")}</div>
              <div onClick={() => navigate("/guide#us")} className="cursor-pointer">
                {t("About us")}
              </div>
              <div onClick={() => navigate("/guide#law")} className="cursor-pointer">
                {t("Law and privacy")}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>{t("Support")}</div>
              <div onClick={() => navigate("/guide#us")} className="cursor-pointer">
                {t("Contact us")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end mt-10 md:mt-0">
          <div>{t("Mobile application")}</div>
          <a className="w-2/6 md:w-44 cursor-pointer relative">
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-black rounded-box bg-[rgba(0,0,0,0.55)] flex items-center justify-center">
              <Countdown
                title=""
                value={1718294400000}
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
                value={1718294400000}
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
      <div className="text-white my-10">
        <a className="rounded-md border border-light py-1 px-4 text-base md:ml-36">{t("More products coming soon")}</a>
      </div>

      <div className="w-full divider md:w-[82%] m-auto"></div>

      <div className="w-full flex justify-between items-center text-white mt-6 md:w-[82%] m-auto">
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
            {t("Privacy Policy")}
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
