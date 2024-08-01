import { Trans, useTranslation } from "react-i18next";

const Kyc = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">KYC</h1>
      <p>{t("To start doing real name authentication (KYC) and creating an account on the CycleX platform, you need to follow these steps")}:</p>
      <ul className="ml-6">
        <li>
          <Trans i18nKey={'visitwebsite'} components={{ a: <a /> }}></Trans>
        </li>
        <li>{t("On the homepage of the website or App, you will find the option to register or create an account. Click on the option to begin the sign-up process.")}</li>
        <li>{t("On the registration page, you will need to fill out the necessary personal information. This may include your full name, email address, contact number, etc..")}</li>
        <li>{t("Once you have successfully registered, log into the account using your registration information.")}</li>
        <li>{t("Once logged in, you may be prompted for real name authentication (KYC). Please click on the appropriate link or option to start the KYC authentication process.")}</li>
        <li>{t("Upon entering the KYC authentication page, you will need to provide a photo or scan of your identification document, along with your personal information.")}</li>
        <li>{t("Follow the instructions on the page to complete the KYC certification process step by step. This may include uploading required documents and filling out relevant information.")}</li>
        <li>{t("After completing KYC certification, your account will gain more features and permissions, and you can start trading and investing on the CycleX platform.")}</li>
        <li>{t("Note that KYC certification is to ensure the authenticity of the user's identity to prevent fraud, money laundering, and other illegal activities. Therefore, you need to provide accurate, complete information and cooperate with the platform's review process.")}</li>
      </ul>
    </div>
  );
};
export default Kyc;
