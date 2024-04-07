import { Divider } from "antd";
import { useTranslation } from "react-i18next";

const Book = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("White paper")}</h1>
      <Divider />

      <p>
        {t("CvcleX is committed to building a transparent and secure tokenized asset trading platform that makes it easier for users to hold high-quality assets around the world, no matter where they are located. Through the collaborative efforts of the Asset management department and the tokenization Technology department, we have built a global decentralized reality asset solution with system integrity and seamless interaction. In the process, we have improved the accessibility of financial products, connecting traditional assets through smart contracts to provide users with the best options. In addition to our technical efforts, we have embraced regulation, investor protection, transparent reporting, and continuous iterations of smart contracts. We work with leading industry partners to provide first-class service to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you will find detailed disclosures about the products, how they operate and eligibility requirements. If you are interested in a product, you can invest through the digital wallet link. The currency units we accept include US dollars and US dollar stablecoins. If you would like more information or to get in touch with us, you can email us at services@whaleflow.co. Our updates are posted on our X social platform and Telegram, where you can follow our latest news.")}
      </p>
    </div>
  );
};
export default Book;
