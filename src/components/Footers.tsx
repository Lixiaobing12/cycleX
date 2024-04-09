import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fundProductApiType } from "../types/fundProduct";
import WrapperImg from "./Common/Img";

const Footers = () => {
  const { t } = useTranslation();
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
  return (
    <div className="w-full p-4 md:p-20 flex flex-col bg-black" id="footer">
      <div className="flex justify-between items-end text-white md:w-[80%] m-auto flex-col md:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center">
            <img src="/assets/icon.png" className="w-8" alt="" />
            <span className="ml-4 text-2xl">CycleX App</span>
          </div>
          <div className="flex gap-10 w-full my-4">
            <div className="flex flex-col gap-4">
              <div>{t("Products")}</div>
              {assets.map((item, index) => (
                <div key={index} onClick={() => navigate(`/assets/${item.id}`)} className="cursor-pointer hover:scale-105">
                  {item.name}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div>{t("Corporation")}</div>
              <div>{t('About us')}</div>
              <div>{t("Law and privacy")}</div>
            </div>
            <div className="flex flex-col gap-4">
              <div>{t('Support')}</div>
              <div>{t("Contact us")}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end mt-10 md:mt-0">
          <div>{t("Mobile application")}</div>
          <a href="https://mp-cd080341-1a5f-41e1-a2ff-373ad4347341.cdn.bspapp.com/cyclex/cyclex_latest.apk" className="w-2/6 md:w-44 cursor-pointer">
            <img src="/assets/download-en.png" alt="" />
          </a>
          <img src="/assets/download-appstore.png" className="w-2/6 md:w-44 cursor-pointer" onClick={() => window.open("https://apps.apple.com/us/app/cyclex/id6464595733")} alt="" />
        </div>
      </div>
      <div className="text-white my-10">
        <a className="rounded-md border border-light py-1 px-4 text-base md:ml-36">{t("More products coming soon")}</a>
      </div>

      <div className="w-full divider md:w-[82%] m-auto"></div>

      <div className="w-full flex justify-between items-center text-white mt-6 md:w-[82%] m-auto">
        <div className="flex gap-4 md:gap-10">
          <span>{t("Service agreement")}</span>
          <span>{t("Privacy Policy")}</span>
        </div>

        <div className="text-sm hidden md:flex">© 2023 WhaleFlow Group. All rights reserved.</div>

        <div className="flex gap-10">
          <WrapperImg src="/assets/twitter.png" width={40} />
          <WrapperImg src="/assets/telegram.png" width={40} />
        </div>
      </div>

      <div className="text-sm md:hidden text-white m-auto my-8">© 2023 WhaleFlow Group. All rights reserved.</div>
    </div>
  );
};

export default Footers;
