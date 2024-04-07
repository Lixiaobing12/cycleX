import { useTranslation } from "react-i18next";

const Kyc = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">KYC</h1>
      <h1 className="font-bold font-whalebold text-2xl mb-6">{t("How to start real-name authentication/KYC")}</h1>
      <h1 className="font-bold font-whalebold text-2xl mb-6">{t("Create Account")}</h1>
      <p className="py-4">{t("To get started, you need to open an account on the CycleX App or home page via the link below")}</p>
      <p className="py-4">
        <a href="https://CycleX.cc">https://CycleX.cc</a>
      </p>
      <h1 className="font-bold font-whalebold text-2xl mb-6">{t("KYC certification")}</h1>
      <p className="py-4">
        {t(
          "Browse our team and use our products at whaleflow.co / cyclex.cc KYC (short for “Know Your Customer”) is designed to prevent fraud, money laundering and other illegal activities. After logging into your account, please follow the link below to complete the KYC and AI verification step by step."
        )}
      </p>
      <p className="py-4">
        <a href="https://CycleX.cc">https://CycleX.cc</a>
      </p>
    </div>
  );
};
export default Kyc;
