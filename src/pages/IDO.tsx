import { Divider } from "antd";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import Deposit from "../components/IDO/Deposit";

const IDO = () => {
  const [toast] = useAtom(messageContext);
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/ido-bg.png" className="w-full h-[80vh]" alt="" />
        <p className="text-white text-4xl text-center absolute  font-bold font-whalebold max-w-[800px]">
          {t("Opening up opportunities for hundred-fold growth in the RWA world and reshaping the value of the industry")}
        </p>
      </div>
      <div className="w-[92%] md:w-11/12 lg:w-9/12 m-auto py-20">
        <p className="text-2xl  font-bold font-whalebold my-20">{t("A platform composed of multiple listed companies and an AUM of US$1.5 billion")}</p>

        <Divider />

        <div className="my-14">
          <Deposit />
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("About us")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CvcleX is committed to building a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently, no matter where they are. Through the collaborative efforts of the asset management department and the tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and achieved seamless interactions. In the process, we improve the accessibility of financial products and connect traditional assets through smart contracts to provide users with the best choices. In addition to our technical efforts, we also actively embrace regulation, protect investors, establish a transparent reporting system, and continuously iterate on smart contracts. We work with leading industry partners to provide best-in-class services to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you can find detailed disclosures about the product, how it operates, and eligibility requirements. If you are interested in a product, you can invest through a digital wallet link. The currency units we accept include US dollars and US dollar stablecoins."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>
        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("White paper")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CvcleX is committed to building a transparent and secure tokenized asset trading platform that makes it easier for users to hold high-quality assets around the world, no matter where they are located. Through the collaborative efforts of the Asset management department and the tokenization Technology department, we have built a global decentralized reality asset solution with system integrity and seamless interaction. In the process, we have improved the accessibility of financial products, connecting traditional assets through smart contracts to provide users with the best options. In addition to our technical efforts, we have embraced regulation, investor protection, transparent reporting, and continuous iterations of smart contracts. We work with leading industry partners to provide first-class service to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you will find detailed disclosures about the products, how they operate and eligibility requirements. If you are interested in a product, you can invest through the digital wallet link. The currency units we accept include US dollars and US dollar stablecoins. If you would like more information or to get in touch with us, you can email us at services@whaleflow.co. Our updates are posted on our X social platform and Telegram, where you can follow our latest news."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>

        <div className="rounded-box border border-light p-8 my-14">
          <div className="text-center  font-bold font-whalebold text-2xl text-black">{t("IDO plan")}</div>
          <p className="my-4 text-greyblack">
            {t(
              "CvcleX is committed to building a transparent and secure tokenized asset trading platform, allowing users to hold global high-quality assets more conveniently, no matter where they are. Through the collaborative efforts of the asset management department and the tokenization technology department, we have built a global decentralized real-world asset solution with system integrity and achieved seamless interactions. In the process, we improve the accessibility of financial products and connect traditional assets through smart contracts to provide users with the best choices. In addition to our technical efforts, we also actively embrace regulation, protect investors, establish a transparent reporting system, and continuously iterate on smart contracts. We work with leading industry partners to provide best-in-class services to our customers. You can browse our team and use our products by visiting whalefow.co/cyclex.cc. Here you can find detailed disclosures about the product, how it operates, and eligibility requirements. If you are interested in a product, you can invest through a digital wallet link. The currency units we accept include US dollars and US dollar stablecoins."
            )}
          </p>
          <p className="text-black">
            {t(
              "If you would like more information or to get in touch with us, you can send an email to services@whaleflow.co. Our dynamic updates will be posted on our X social platform and Telegram, and you can learn about our latest news through these channels."
            )}
          </p>
        </div>

        <div className="text-center">
          <button
            className="btn btn-wide bg-black text-white"
            onClick={() => {
              toast?.warning(t("Coming soon"));
            }}>
            {t("Receive airdrop")}
          </button>
        </div>

        <div className="mt-28">
          <div className="text-center text-2xl  font-bold font-whalebold">{t("Contact us")}</div>

          <div className="flex items-center justify-center mt-14 gap-6">
            <div className="flex gap-2">
              <span className="text-black font-bold font-whalebold">{t("Telegram community")}</span>
              <img src="/assets/telegram-drak.png" width={25} alt="" />
            </div>
            <Divider type="vertical" />
            <div className="flex gap-2">
              <span className="text-black font-bold font-whalebold">
                X - twitter <span className="ml-6">Team</span>
              </span>
              <img src="/assets/twitter-dark.png" width={25} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IDO;
