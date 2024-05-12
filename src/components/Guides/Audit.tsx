import { Divider } from "antd";
import { useAtom } from "jotai";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { fundProofs_atom } from "../../atom/fundProof";
import { scientific } from "../../utils/BigNumberToString";

const Audit = () => {
  const { t, i18n } = useTranslation();
  const [proofs] = useAtom(fundProofs_atom);
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Audit and proof of reserves")}</h1>
      <p className="py-4">
        {t(
          "As part of our ongoing commitment to transparency, CycleX regularly publishes its forensic opinion on a quarterly basis. To make it easier to access, we offer all the historical and up-to-date views here. CycleX's opinion and underlying report make it clear that all token funds are fully backed by reserves and provide a comprehensive breakdown of these reserve assets."
        )}
      </p>
      <Divider />
      <div className="w-full gap-4 flex flex-col mt-10">
        {proofs.map((item, index) => (
          <div key={index}>
            <div className="flex gap-10 items-center" key={index}>
              <span className="font-bold font-whalebold">{i18n.language === "en" ? item.NameDct?.en : item.NameDct?.zh}</span>
              <span>{i18n.language === "en" ? item.TypeSortDct?.en : item.TypeSortDct?.zh}</span>
              <span>${scientific(item.MarketValue)}</span>
              <div className="flex gap-2">
                <span>{moment(item?.UpdatedAt ?? "", "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")}</span>
                {/* <a href={item.Url} target="_blank">
                  <WrapperImg src="/assets/pdf.png" width={25} />
                </a> */}
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
