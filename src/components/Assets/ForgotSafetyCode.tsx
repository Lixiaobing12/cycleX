import { Form, Input } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { messageContext } from "../../App";
import { useTranslateLocalStorage } from "../../hooks/localStorage";
import useAccounts from "../../hooks/user";
import { request } from "../../utils/request";
import Loader from "../Loader";

/** 设置支付密码弹窗 */
const ForgetSafetyCode: React.FC<{
  onComplate: () => void;
}> = ({ onComplate }) => {
  const [, userInfo] = useAccounts();
  /** 1:email
   * 2:phone
   */
  const [emailOrPhone, setAccountType] = useState(1);
  const [nickname, setNickName] = useState("");
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [toast] = useAtom(messageContext);

  const [newPassword, setNewPassword] = useState("");
  const [inputsAreCorrect, setCorrent] = useState(false);
  const [vilid, setVilid] = useState(false);
  const { handleTranslate } = useTranslateLocalStorage();
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState("");
  const [sendAndCountDown, setCountDownShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeItemStatus, setCodeItemStatus] = useState("validating");

  const onVilid = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === newPassword) {
      setVilid(true);
    } else {
      setVilid(false);
    }
  };
  const sendCode = async () => {
    /** 验证码 */
    const registerCode = async () => {
      try {
        setSending(true);
        const { data } = await request.post("/api/api/msgSms/securityCode", {
          type: emailOrPhone === 1 ? "email" : "mobile",
          username: nickname,
        });
        setSending(false);

        if (data.res_code !== 0) {
          if (i18n.language === "en") {
            toast?.warning({
              message: await handleTranslate(data.res_msg),
              icon: <img src="/assets/error.png" width={30} />,
            });
          } else {
            toast?.warning({
              message: data.res_msg,
              icon: <img src="/assets/error.png" width={30} />,
            });
          }
        } else {
          setCountDownShow(true);
          toast?.success({
            icon: <img src="/assets/success.png" width={30} />,
            message: t("Code sended"),
          });
        }
      } catch (err: any) {
        setSending(false);
        if (i18n.language === "en") {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: err.response.data.message,
          });
        } else {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: err.response.data.message,
          });
        }
      }
    };
    await registerCode();
    // if (emailOrPhone === 1) {
    //   let status = false;
    //   let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //   status = reg.test(emailNumber);
    //   if (!status) {
    //     toast?.error(t("Please enter the correct email number"));
    //     setStatus("warning");
    //   } else {
    //     await registerCode();
    //   }
    // } else {
    //   if (!phoneNumber) {
    //     setStatus("warning");
    //   } else {
    //     await registerCode();
    //   }
    // }
  };

  const checkSecurity = async () => {
    if (!code) {
      setCodeItemStatus("warning");
      return;
    } else {
      setCodeItemStatus("validating");
      if (loading) return;
      setLoading(true);
      try {
        const { data } = await request.post("/api/api/my/changeSecurityPassword", {
          type: emailOrPhone === 1 ? "email" : "mobile",
          username: nickname,
          security_password: newPassword,
          security_password_confirmation: newPassword,
          verify_code: code,
        });

        setTimeout(() => {
          setLoading(false);
        }, 500);

        if (data.res_code !== 0) {
          if (i18n.language === "en") {
            toast?.warning({
              message: await handleTranslate(data.res_msg),
              icon: <img src="/assets/error.png" width={30} />,
            });
          } else {
            toast?.warning({
              message: data.res_msg,
              icon: <img src="/assets/error.png" width={30} />,
            });
          }
        } else {
          toast?.success({
            icon: <img src="/assets/success.png" width={30} />,
            message: t("registration success"),
          });
          onComplate();
        }
      } catch (err: any) {
        setLoading(false);
        if (i18n.language === "en") {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: err?.response.data?.message,
          });
        } else {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: err?.response.data?.message,
          });
        }
      }
    }
  };
  useEffect(() => {
    if (userInfo?.email) {
      setAccountType(1);
      setNickName(userInfo.email);
    } else if (userInfo?.mobile) {
      setAccountType(2);
      setNickName(userInfo.mobile);
    }
  }, [userInfo]);
  return (
    <div>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item label={t("Account")}>
          <Input className="placeholder:text-sm placeholder:text-greyblack" type="text" readOnly size="large" value={nickname} />
        </Form.Item>
        <Form.Item label={t("Verification code")} validateStatus={codeItemStatus as any}>
          <Input
            onChange={(e) => setCode(e.target.value)}
            size="large"
            placeholder={t("Enter code")}
            suffix={
              sendAndCountDown ? (
                <Countdown
                  value={Date.now() + 60 * 1000}
                  format="ss"
                  suffix="s"
                  valueStyle={{
                    fontSize: "14px",
                    color: "#193CF6",
                  }}
                  onFinish={() => setCountDownShow(false)}
                />
              ) : (
                <a className="text-sm text-[#193CF6]" onClick={sendCode}>
                  {sending ? <Loader spinning={sending} /> : t("Send")}
                </a>
              )
            }
          />
        </Form.Item>

        <Form.Item
          label={t("New payment password")}
          help={
            <div className={`ml-4 ${!inputsAreCorrect ? "text-threePranentTransblack" : "text-green"}`}>
              <ul>
                <li>{t("6 numbers")}</li>
              </ul>
            </div>
          }>
          <Input
            className="placeholder:text-sm placeholder:text-greyblack"
            type="password"
            autoComplete="new-password"
            onChange={(e) => {
              if (e.target.value.length === 6 && Number(e.target.value)) {
                setCorrent(true);
              } else {
                setCorrent(false);
              }
              setNewPassword(e.target.value);
            }}
            size="large"
            placeholder={t("Enter new password")}
          />
        </Form.Item>
        <Form.Item label={t("Confirm new password")} validateStatus={!!newPassword && !vilid ? "warning" : "validating"}>
          <Input className="placeholder:text-sm placeholder:text-greyblack" type="password" onChange={onVilid} size="large" placeholder={t("Enter new password again")} />
        </Form.Item>
        <Form.Item>
          <button className="btn btn-block m-auto mt-4 bg-black text-white disabled:text-black-800 disabled:bg-[#2b344033]" disabled={!vilid || !inputsAreCorrect} onClick={checkSecurity}>
            <Loader spinning={loading} />
            {t("Confirm")}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetSafetyCode;
