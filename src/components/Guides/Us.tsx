import { useTranslation } from "react-i18next";

const Us = () => {
  const {t} = useTranslation()
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Welcome to CycleX")}</h1>
      <p className="py-4">{t("CycleX is committed to creating a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently no matter where they are in the world.")}</p>
      <p className="py-4">
        {t("Through the collaboration of our asset management department and tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and seamless interaction. In the process, we have improved the quality of financial products. Accessibility connects traditional assets through smart contracts, giving users the best choice.")}
        
      </p>
      <p className="py-4">
        {t("In addition to technology, we actively embrace regulation, investor protection, reporting transparency systems and smart contract iterations, and work with leading industry partners to provide customers with first-class services.")}
        </p>
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Use of the product")}</h1>
      <p className="py-4">
        {t("To browse our team and use our products visit whaleflow.co / cyclex.cc For detailed product disclosures, how they operate, eligibility requirements, and if you find a product you like, you can invest via a linked digital wallet, which we generally accept The currency units are US dollars and US dollar stablecoins.")}
        
      </p>
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Follow us")}</h1>
      <p className="py-4">{t("You can contact us at services@whaleflow.co and our updates will be posted on our X and find us on Telegram.")}</p>
    </div>
  );
};
export default Us;
