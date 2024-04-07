import { Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fundProductApiType } from "../../types/fundProduct";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";
import WrapperImg from "../Common/Img";

const Audit = () => {
  const { t } = useTranslation();
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  useEffect(() => {
    request.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Audit and proof of reserves")}</h1>
      <p className="py-4">
        {t("As part of our ongoing commitment to transparency, CycleX regularly publishes its forensic opinion on a quarterly basis. To make it easier to access, we offer all the historical and up-to-date views here. CycleX's opinion and underlying report make it clear that all token funds are fully backed by reserves and provide a comprehensive breakdown of these reserve assets.")}
      </p>
      <Divider />
      <div className="w-full gap-4 flex flex-col mt-10">
        {assets.map((item, index) => (
          <div key={index}>
            <div className="flex gap-10 items-center" key={index}>
              <span className="font-bold font-whalebold">{item.name}</span>
              <span>{t("Tokenized funds")}</span>
              <span>${scientific(item.market_value)}</span>
              <div className="flex gap-2">
                <span>{moment(item?.updated_at ?? "", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}</span>
                <WrapperImg src="/assets/pdf.png" width={20} />
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Audit;
