import { Checkbox, Col, Dropdown, Form, Input, MenuProps, Modal, Row, Space, Tabs } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { atom, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { messageContext, modalContext } from "../App";
import WrapperImg from "../components/Common/Img";
import Loader from "../components/Loader";
import PrivitePolicy from "../components/Login/PrivitePolicy";
import UserAgreement from "../components/Login/UserAgreement";
import useLocalStorage, { useTranslateLocalStorage } from "../hooks/localStorage";
import useAccounts from "../hooks/user";
import { request } from "../utils/request";
import { validPhoneNumber } from "../utils/validMobildPhone";
import { InviteCodeAtom } from "../atom/invite";

const tabTypes = atom<"Sign" | "Forgot" | "Revise">("Sign");

/** 设置支付密码弹窗 */
const SafetyInput: React.FC<{
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
          <Input className="placeholder:text-xs placeholder:text-greyblack" type="text" readOnly size="large" value={nickname} />
        </Form.Item>
        <Form.Item label={t("Verification code")} validateStatus={codeItemStatus as any}>
          <Input
            className="placeholder:text-xs placeholder:text-greyblack text-sm"
            onChange={(e) => setCode(e.target.value)}
            size="large"
            placeholder={t("Verification Code")}
            suffix={
              sendAndCountDown ? (
                <Countdown
                  value={Date.now() + 60 * 1000}
                  format="ss"
                  suffix="s"
                  valueStyle={{
                    fontSize: "14px",
                    color: "#999",
                  }}
                  onFinish={() => setCountDownShow(false)}
                />
              ) : (
                <a className="text-sm text-white md:text-black" onClick={sendCode}>
                  {sending ? <Loader spinning={sending} /> : t("Send")}
                </a>
              )
            }
          />
        </Form.Item>

        <Form.Item
          label={t("Payment password")}
          help={
            <div className={`ml-4 ${!inputsAreCorrect ? "text-threePranentTransblack" : "text-green"}`}>
              <ul>
                <li>{t("6 numbers")}</li>
              </ul>
            </div>
          }>
          <Input
            className="placeholder:text-xs placeholder:text-greyblack"
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
            placeholder={t("New password")}
          />
        </Form.Item>
        <Form.Item label={t("Verify payment password")} validateStatus={!!newPassword && !vilid ? "warning" : "validating"}>
          <Input className="placeholder:text-xs placeholder:text-greyblack" type="password" onChange={onVilid} size="large" placeholder={t("Verify new password")} />
        </Form.Item>
        <Form.Item>
          <button className="btn btn-block m-auto mt-4 disabled:text-black-800" disabled={!vilid || !inputsAreCorrect} onClick={checkSecurity}>
            <Loader spinning={loading} />
            {t("Confirm")}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
/** 用户协议弹窗 */
const protocolModalStatus = atom(false);
const protocolType = atom<"agreement" | "privite">("agreement");

const AgreementProtocol = () => {
  const [show, setShow] = useAtom(protocolModalStatus);
  const [type] = useAtom(protocolType);

  return (
    <Modal open={show} onCancel={() => setShow(false)} centered footer={null}>
      <div className="w-full rounded-md bg-white text-black relative pointer-events-auto overflow-auto">{type === "agreement" ? <UserAgreement /> : <PrivitePolicy />}</div>
    </Modal>
  );
};
/** 登录 */
const In = () => {
  const { t } = useTranslation();
  /** 是否显示密码 */
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [type, setType] = useAtom(tabTypes);
  const [loading, setLoading] = useState(false);
  const accessToken = useLocalStorage();
  const [toast] = useAtom(messageContext);
  const confirm = () => {
    setLoading(true);
    request
      .post("/api/oauth/token", {
        grant_type: "password",
        client_id: 2,
        client_secret: "9FBI5MxzMfMafJKF0TDdBclOgnMcVPXhiLoGBFVG",
        username: nickname,
        password: password,
      })
      .then(({ data }) => {
        setLoading(false);
        navigate("/");
        window.localStorage.setItem(
          "token",
          JSON.stringify({
            token: data.access_token,
            nickname: nickname,
          })
        );
        const setItemEvent = new Event("localstorage_save");
        window.dispatchEvent(setItemEvent);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Incorrect username or password"),
        });
      });
  };

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Form.Item label={t("Username")}>
            <Input className="placeholder:text-xs placeholder:text-greyblack" onChange={(e) => setNickName(e.target.value)} size="large" placeholder={t("Email Address")} />
          </Form.Item>
          <Form.Item noStyle>
            <div className="flex w-full flex-col mb-10">
              <div className="flex justify-between items-center w-full mb-1">
                <span className="text-white md:text-current">{t("Password")}</span>
                <a className="text-white md:text-black" onClick={() => setType("Forgot")}>
                  {t("Forget")}
                </a>
              </div>
              <div className="relative items-center flex">
                <Input
                  className="placeholder:text-xs placeholder:text-greyblack"
                  type={visible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  size="large"
                  placeholder={t("Please enter password")}
                />
                <div className="absolute right-2">
                  {visible ? <WrapperImg src="/assets/watch.png" width={20} onClick={() => setVisible(false)} /> : <WrapperImg src="/assets/miss.png" width={20} onClick={() => setVisible(true)} />}
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <button
              className="btn btn-block border-0 bg-black text-white hover:bg-[#303030] disabled:bg-[#DFE0E4] disabled:text-black-800"
              disabled={!nickname || !password || loading}
              onClick={confirm}>
              <Loader spinning={loading} />
              {t("Sign in")}
            </button>
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <span className="text-white md:text-current	">{t("No account yet")}?</span>
              <a className="ml-2 text-white md:text-black" onClick={() => navigate("/login?t=up")}>
                {t("Sign up")}
              </a>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

type SecrityKeyType = {
  password: string;
  code: string;
  nickName: string;
};
/** 注册 */
const Up = () => {
  const [referral_code] = useAtom(InviteCodeAtom);
  const [modal] = useAtom(modalContext);
  const navigator = useNavigate();
  const { handleTranslate } = useTranslateLocalStorage();
  const [toast] = useAtom(messageContext);
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  /** 1:email
   * 2:phone
   */
  const [emailOrPhone, setChange] = useState(1);
  const [emailNumber, setEmailNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("1");
  const [isAgree, setAgree] = useState(false);
  const [validateStatus, setStatus] = useState("validating");
  const [sendAndCountDown, setCountDownShow] = useState(false);
  const [sending, setSending] = useState(false);
  /** 安全密钥  */
  const secrityKey = useRef<SecrityKeyType>();

  const [selectOptions, setOptions] = useState<
    {
      label: string;
      title: string;
      key: string;
      onClick: Function;
    }[]
  >([]);
  const [, setModalShow] = useAtom(protocolModalStatus);
  const [, setType] = useAtom(protocolType);

  /** 注册 */
  const register = async () => {
    setLoading(true);
    const { data } = await request.post("/api/api/auth/register", {
      type: emailOrPhone === 1 ? "email" : "mobile",
      username: emailOrPhone === 1 ? emailNumber : phoneNumber,
      password: password,
      password_confirmation: password,
      verify_code: code,
      referral_code: inviteCode,
      mobile_prefix: Number(phonePrefix),
    });
    if (data.res_code !== 0) {
      setLoading(false);
      if (i18n.language == "en") {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: await handleTranslate(data.res_msg),
        });
      } else {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: data.res_msg,
        });
      }
    } else {
      setLoading(false);
      const { data } = await request.post("/api/oauth/token", {
        grant_type: "password",
        client_id: 2,
        client_secret: "9FBI5MxzMfMafJKF0TDdBclOgnMcVPXhiLoGBFVG",
        username: emailOrPhone === 1 ? emailNumber : phoneNumber,
        password: password,
      });
      window.localStorage.setItem(
        "token",
        JSON.stringify({
          token: data.access_token,
          nickname: emailOrPhone === 1 ? emailNumber : phoneNumber,
        })
      );
      const setItemEvent = new Event("localstorage_save");
      window.dispatchEvent(setItemEvent);
      open();
      // setTimeout(() => {
      //   navigator("/login?t=in");
      // }, 500);
    }
  };

  const open = () => {
    const context: any = modal?.info({
      closable: false,
      icon: <></>,
      onCancel: () => context.destroy(),
      title: <h1 className="w-full py-2 text-center text-lg">{t("Payment password settings")}</h1>,
      zIndex: 1000,
      content: (
        <SafetyInput
          onComplate={() => {
            context.destroy();
            setTimeout(() => {
              navigator("/");
            }, 500);
          }}
        />
      ),
      centered: true,
      footer: null,
      styles: {
        body: {
          width: "100%",
        },
      },
    });
  };
  const sendCode = async () => {
    /** 验证码 */
    const registerCode = async () => {
      try {
        setSending(true);
        const { data } = await request.post("/api/api/msgSms/registerCode", {
          mobile_prefix: Number(phonePrefix),
          type: emailOrPhone === 1 ? "email" : "mobile",
          username: emailOrPhone === 1 ? emailNumber : phoneNumber,
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
            message: err.response.data.res_msg,
          });
        }
      }
    };
    if (emailOrPhone === 1) {
      let status = false;
      const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      status = reg.test(emailNumber);
      if (!status) {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: t("Please enter the correct email number"),
        });
        setStatus("warning");
      } else {
        await registerCode();
      }
    } else {
      if (!phoneNumber) {
        setStatus("warning");
      } else {
        await registerCode();
      }
    }
  };

  useEffect(() => {
    request.get("/api/msgProvideCountry/getList").then(({ data }: any) => {
      setOptions(
        data.data.map((item: any) =>
          i18n.language === "en"
            ? {
                label: item.name_en === "Chain" ? "China" : item.name_en,
                title: item.name_en === "Chain" ? "China" : item.name_en,
                key: item.prefix,
                onClick: (e: any) => {
                  setPhonePrefix(e.key);
                },
              }
            : {
                label: item.name,
                title: item.name,
                key: item.prefix,
                onClick: (e: any) => {
                  setPhonePrefix(e.key);
                },
              }
        )
      );
    });
  }, [i18n.language]);

  useEffect(() => {
    console.log(referral_code);
    referral_code && setInviteCode(referral_code);
  }, [referral_code]);
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 20 }} md={{ span: 18 }} lg={{ span: 14 }}>
          <Col className={`${loading && "opacity-30	pointer-events-none"}`}>
            <Form.Item>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    setStatus("validating");
                    setChange(1);
                  }}
                  className={`btn rounded-full border-0 btn-sm btn-cycle active:text-white ${emailOrPhone === 1 ? "bg-[#F1F3F5] text-black" : "bg-white text-greyblack"}`}>
                  {t("Email")}
                </button>
                {/* <button
                  onClick={() => {
                    setStatus("validating");
                    setChange(2);
                  }}
                  className={`btn rounded-full border-0 btn-sm btn-cycle active:text-white ${emailOrPhone === 2 ? "bg-[#F1F3F5] text-black" : "bg-white text-greyblack"}`}>
                  {t("Phone number")}
                </button> */}
              </div>
            </Form.Item>
            {emailOrPhone === 1 ? (
              <Form.Item label={t("Email")} validateStatus={validateStatus as any}>
                <Input
                  className="placeholder:text-xs placeholder:text-greyblack"
                  key="email"
                  onChange={(e) => {
                    setStatus("validating");
                    setEmailNumber(e.target.value);
                  }}
                  size="large"
                  placeholder={t("Please input your email")}
                />
              </Form.Item>
            ) : (
              <Form.Item label={t("Phone number")} validateStatus={validateStatus as any}>
                <Input
                  className="placeholder:text-xs placeholder:text-greyblack text-sm"
                  key="phone"
                  addonBefore={
                    <div className="min-w-10">
                      <Dropdown menu={{ items: selectOptions as MenuProps["items"] }}>
                        <a onClick={(e) => e.preventDefault()} className="text-black">
                          <Space>+{phonePrefix}</Space>
                        </a>
                      </Dropdown>
                    </div>
                  }
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    const correct = validPhoneNumber(+phonePrefix, e.target.value);
                    if (!correct) setStatus("warning");
                    else setStatus("validating");
                  }}
                  size="large"
                  placeholder={t("Phone Number")}
                />
              </Form.Item>
            )}
            <Form.Item label={t("Verification code")}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack text-sm antd-input-password"
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
                        color: "#999",
                      }}
                      onFinish={() => setCountDownShow(false)}
                    />
                  ) : (
                    <a className="text-sm text-black" onClick={sendCode}>
                      {sending ? <Loader spinning={sending} /> : t("Send")}
                    </a>
                  )
                }
              />
            </Form.Item>
            <Form.Item label={t("Password")}>
              <Input.Password
                className="placeholder:text-xs placeholder:text-greyblack antd-input-password"
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                placeholder={t("Please set a password")}
              />
            </Form.Item>
            <Form.Item label={t("Referral code (optional)")}>
              <Input className="placeholder:text-xs placeholder:text-greyblack" onChange={(e) => setInviteCode(e.target.value)} value={inviteCode} size="large" placeholder={t("Referral code")} />
            </Form.Item>
          </Col>
          <Form.Item>
            <button
              className="btn btn-block border-0 bg-black text-white hover:bg-[#303030] disabled:bg-[#DFE0E4] disabled:text-black-800"
              disabled={!password || !code || !isAgree}
              onClick={register}>
              <Loader spinning={loading} />
              {t("Sign up now")}
            </button>
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Checkbox
                onChange={(e) => {
                  setAgree(e.target.checked);
                }}>
                <span className="text-white md:text-current">{t("I have read, agreed and understood")}</span>
                <a
                  className="text-white md:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setType("agreement");
                    setModalShow(true);
                  }}>
                  {t("User Agreement")}
                </a>
                &
                <a
                  className="text-white md:text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setType("privite");
                    setModalShow(true);
                  }}>
                  {t("Privacy policy")}
                </a>
              </Checkbox>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
/** 忘记密码 - 邮箱 */
const ForgotEmail = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [email, setNEmail] = useState("");
  const [code, setCode] = useState("");
  const [toast] = useAtom(messageContext);
  const { handleTranslate } = useTranslateLocalStorage();
  const [sendAndCountDown, setCountDownShow] = useState(false);
  const [validateStatus, setStatus] = useState("validating");
  const [newPassword, setNewPassword] = useState("");
  const [vilid, setVilid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setType] = useAtom(tabTypes);
  const [sending, setSending] = useState(false);

  const onVilid = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === newPassword) {
      setVilid(true);
    } else {
      setVilid(false);
    }
  };
  const confirm = async () => {
    try {
      setLoading(true);
      const { data } = await request.post("/api/api/auth/recover_password", {
        type: "email",
        username: email,
        password: newPassword,
        password_confirmation: newPassword,
        verify_code: code,
      });

      if (data.res_code !== 0) {
        setLoading(false);
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
        setLoading(false);
        toast?.success({
          icon: <img src="/assets/success.png" width={30} />,
          message: t("Password reset"),
        });
        setTimeout(() => {
          setType("Sign");
        }, 500);
      }
    } catch (err: any) {
      if (i18n.language === "en") {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: err.response.data.message,
        });
      } else {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: err.response.data.res_msg,
        });
      }
    }
  };
  const sendCode = async () => {
    /** 验证码 */
    const registerCode = async () => {
      try {
        setSending(true);
        const { data } = await request.post("/api/api/msgSms/recoverCode", {
          mobile_prefix: 86,
          type: "email",
          username: email,
        });
        setSending(false);

        if (data.res_code !== 0) {
          if (i18n.language === "en") {
            toast?.error({
              icon: <img src="/assets/error.png" width={30} />,
              message: await handleTranslate(data.res_msg),
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
            message: err.response.data.res_msg,
          });
        }
      }
    };
    let status = false;
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    status = reg.test(email);
    if (!status) {
      toast?.error({
        icon: <img src="/assets/error.png" width={30} />,
        message: t("Please enter the correct email number"),
      });
      setStatus("warning");
    } else {
      await registerCode();
    }
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Col className={`${loading && "opacity-30	pointer-events-none"}`}>
            <Form.Item label={t("Email")} validateStatus={validateStatus as any}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack"
                onChange={(e) => {
                  setStatus("validating");
                  setNEmail(e.target.value);
                }}
                size="large"
                placeholder={t("Please input your email")}
              />
            </Form.Item>

            <Form.Item label={t("Verification code")}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack text-sm antd-input-password"
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
                        color: "#999",
                      }}
                      onFinish={() => setCountDownShow(false)}
                    />
                  ) : (
                    <a className="text-sm text-black" onClick={sendCode}>
                      {sending ? <Loader spinning={sending} /> : t("Send")}
                    </a>
                  )
                }
              />
            </Form.Item>
            <Form.Item label={t("New Password")}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                size="large"
                placeholder={t("Enter new password")}
              />
            </Form.Item>
            <Form.Item label={t("Confirm new password")} validateStatus={!!newPassword && !vilid ? "warning" : "validating"}>
              <Input className="placeholder:text-xs placeholder:text-greyblack" type="password" onChange={onVilid} size="large" placeholder={t("Enter new password again")} />
            </Form.Item>
          </Col>
          <Form.Item>
            <button
              className="btn btn-block border-0 hover:bg-[#303030] bg-black text-white disabled:bg-[#DFE0E4] disabled:text-black-800"
              disabled={!email || !code || loading || !vilid}
              onClick={confirm}>
              <Loader spinning={loading} />
              {t("Confirm modification")}
            </button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
/** 忘记密码-手机号 */
const ForgotPhone = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useAtom(tabTypes);
  const [newPassword, setNewPassword] = useState("");
  const [validateStatus, setStatus] = useState("validating");
  const [vilid, setVilid] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("1");
  const [sendAndCountDown, setCountDownShow] = useState(false);
  const [toast] = useAtom(messageContext);
  const { handleTranslate } = useTranslateLocalStorage();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectOptions, setOptions] = useState<
    {
      label: string;
      title: string;
      key: string;
      onClick: Function;
    }[]
  >([]);
  const confirm = async () => {
    try {
      setLoading(true);
      const { data } = await request.post("/api/api/auth/recover_password", {
        type: "mobile",
        username: phoneNumber,
        password: newPassword,
        password_confirmation: newPassword,
        verify_code: code,
      });
      if (data.res_code !== 0) {
        setLoading(false);
        if (i18n.language === "en") {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: await handleTranslate(data.res_msg),
          });
        } else {
          toast?.error({
            icon: <img src="/assets/error.png" width={30} />,
            message: data.res_msg,
          });
        }
      } else {
        setLoading(false);
        toast?.success({
          icon: <img src="/assets/success.png" width={30} />,
          message: t("Password reset"),
        });
        setTimeout(() => {
          setType("Sign");
        }, 500);
      }
    } catch (err: any) {
      if (i18n.language === "en") {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: err.response.data.message,
        });
      } else {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: err.response.data.res_msg,
        });
      }
    }
  };
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
        const { data } = await request.post("/api/api/msgSms/recoverCode", {
          mobile_prefix: Number(phonePrefix),
          type: "mobile",
          username: phoneNumber,
        });
        setSending(false);
        if (data.res_code !== 0) {
          if (i18n.language === "en")
            toast?.error({
              icon: <img src="/assets/error.png" width={30} />,
              message: await handleTranslate(data.res_msg),
            });
          else
            toast?.error({
              icon: <img src="/assets/error.png" width={30} />,
              message: data.res_msg,
            });
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
            message: err.response.data.message,
            icon: <img src="/assets/error.png" width={30} />,
          });
        } else {
          toast?.error({
            message: err.response.data.res_msg,
            icon: <img src="/assets/error.png" width={30} />,
          });
        }
      }
    };
    if (phoneNumber) {
      await registerCode();
    }
  };
  useEffect(() => {
    request.get("/api/msgProvideCountry/getList").then(({ data }: any) => {
      setOptions(
        data.data.map((item: any) =>
          i18n.language === "en"
            ? {
                label: item.name_en === "Chain" ? "China" : item.name_en,
                title: item.name_en === "Chain" ? "China" : item.name_en,
                key: item.prefix,
                onClick: (e: any) => {
                  setPhonePrefix(e.key);
                },
              }
            : {
                label: item.name,
                title: item.name,
                key: item.prefix,
                onClick: (e: any) => {
                  setPhonePrefix(e.key);
                },
              }
        )
      );
    });
  }, [i18n.language]);
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Col className={`${loading && "opacity-30	pointer-events-none"}`}>
            <Form.Item label={t("Phone number")} validateStatus={validateStatus as any}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack text-sm"
                key="phone"
                addonBefore={
                  <div className="min-w-10">
                    <Dropdown menu={{ items: selectOptions as MenuProps["items"] }}>
                      <a onClick={(e) => e.preventDefault()} className="text-white md:text-current text-white md:text-black">
                        <Space>+{phonePrefix}</Space>
                      </a>
                    </Dropdown>
                  </div>
                }
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  const correct = validPhoneNumber(+phonePrefix, e.target.value);
                  if (!correct) setStatus("warning");
                  else setStatus("validating");
                }}
                size="large"
                placeholder={t("Phone Number")}
              />
            </Form.Item>
            <Form.Item label={t("Verification code")}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack text-sm"
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
                        color: "#999",
                      }}
                      onFinish={() => setCountDownShow(false)}
                    />
                  ) : (
                    <a className="text-sm text-white md:text-black" onClick={sendCode}>
                      {sending ? <Loader spinning={sending} /> : t("Send")}
                    </a>
                  )
                }
              />
            </Form.Item>
            <Form.Item label={t("New Password")}>
              <Input
                className="placeholder:text-xs placeholder:text-greyblack"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                size="large"
                placeholder={t("Enter new password")}
              />
            </Form.Item>
            <Form.Item label={t("Confirm new password")} validateStatus={!!newPassword && !vilid ? "warning" : "validating"}>
              <Input className="placeholder:text-xs placeholder:text-greyblack" type="password" onChange={onVilid} size="large" placeholder={t("Enter new password again")} />
            </Form.Item>
          </Col>

          <Form.Item>
            <button
              className="btn btn-block border-0 hover:bg-[#303030] bg-black text-white disabled:bg-[#DFE0E4] disabled:text-black-800"
              disabled={!phoneNumber || !code || !vilid}
              onClick={confirm}>
              {t("Confirm modification")}
            </button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
/** 登录注册页面 */
const Sign = () => {
  const { t } = useTranslation();
  const [activeKey, setKey] = useState("1");
  const [, setModalShow] = useAtom(protocolModalStatus);
  const [, setType] = useAtom(protocolType);

  const location = useLocation();
  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 items-center">
          <span className="text-base">{t("Sign in")}</span>
        </div>
      ),
      children: <In />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-1">
          <span className="text-base">{t("Sign up")}</span>
        </div>
      ),
      children: <Up />,
    },
  ];

  useEffect(() => {
    if (location.search) {
      const isSignIn = /\=in/.test(location.search);
      setKey(isSignIn ? "1" : "2");
    }
  }, [location]);

  return (
    <>
      <div className="mt-8 flex-1">
        <Tabs items={items} activeKey={activeKey} onChange={(e) => setKey(e)}></Tabs>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 text-white md:text-threePranentTransblack text-xs">
        <div>ALL RIGHTS RESERVED ©2024 CycleX</div>
        <div className="flex gap-4">
          <a
            className="cursor-pointer text-white md:text-black"
            onClick={() => {
              setType("agreement");
              setModalShow(true);
            }}>
            {t("User Agreement")}
          </a>
          <a
            className="cursor-pointer text-white md:text-black"
            onClick={() => {
              setType("privite");
              setModalShow(true);
            }}>
            {t("Privacy policy")}
          </a>
        </div>
      </div>
    </>
  );
};

/** 忘记密码 */
const Forget = () => {
  const { t } = useTranslation();
  const [activeKey, setKey] = useState("1");
  const items = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 items-center">
          <span className="text-base">{t("Email")}</span>
        </div>
      ),
      children: <ForgotEmail />,
    },
    // {
    //   key: "2",
    //   label: (
    //     <div className="flex gap-1">
    //       <span className="text-base">{t("Phone number")}</span>
    //     </div>
    //   ),
    //   children: <ForgotPhone />,
    // },
  ];

  return (
    <div className="mt-8 flex-1">
      <div className="text-2xl font-bold font-whalebold my-4">{t("Forget")}</div>
      <Tabs items={items} activeKey={activeKey} onChange={(e) => setKey(e)}></Tabs>
    </div>
  );
};

/** 修改密码 */
const Revise = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [vilid, setVilid] = useState(false);

  const onVilid = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === newPassword) {
      setVilid(true);
    } else {
      setVilid(false);
    }
  };
  const confirm = () => {};
  return (
    <div className="mt-8 flex-1">
      <div className="text-2xl font-bold font-whalebold my-4">{t("Change Password")}</div>
      <Form form={form} layout="vertical" autoComplete="off">
        <Row align="middle" justify="center">
          <Col xs={{ span: 22 }} md={{ span: 12 }}>
            <Form.Item label={t("Old Password")}>
              <Input className="placeholder:text-xs placeholder:text-greyblack" onChange={(e) => setOldPassword(e.target.value)} size="large" placeholder={t("Please enter old password")} />
            </Form.Item>
            <Form.Item label={t("New Password")}>
              <Input.Password
                className="placeholder:text-xs placeholder:text-greyblack antd-input-password"
                onChange={(e) => setNewPassword(e.target.value)}
                size="large"
                placeholder={t("New password")}
              />
            </Form.Item>
            <Form.Item label={t("New password verification")} validateStatus={!!newPassword && !vilid ? "error" : "success"}>
              <Input.Password className="placeholder:text-xs placeholder:text-greyblack antd-input-password" onChange={onVilid} size="large" placeholder={t("Verify new password")} />
            </Form.Item>
            <Form.Item>
              <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-black-800" disabled={!vilid} onClick={confirm}>
                {t("Confirm modification")}
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const [type, setType] = useAtom(tabTypes);
  const navigate = useNavigate();
  const back = () => {
    if (type === "Sign") {
      navigate("/");
    } else if (type === "Forgot") {
      setType("Sign");
    } else {
      setType("Forgot");
    }
  };
  return (
    <div className="flex text-black h-screen">
      <div className="hidden md:flex flex-1 md:h-screen bg-login_mene bg-100 flex justify-center items-center">
        <img src="/assets/login_logo.png" width={300} alt="" />
      </div>
      {/* mobile */}
      <div className="block md:hidden flex-1 overflow-auto relative bg-login_mene bg-100 p-4">
        <div className="p-4 flex flex-col">
          <div className="flex justify-center items-center relative">
            <div className="flex items-center gap-2 cursor-pointer w-fit text-white absolute left-0" onClick={back}>
              <img src="/assets/back-white.png" width={16} />
              <span>{t("Back")}</span>
            </div>
            <img src="/assets/login_logo.png" width={120} alt="" />
          </div>
          <div className="pb-20">{type === "Sign" ? <Sign /> : type === "Forgot" ? <Forget /> : <Revise />}</div>
        </div>
      </div>
      {/* pc */}
      <div className="hidden md:block flex-1 overflow-auto relative">
        <div className="p-6 md:p-20 flex flex-col h-screen">
          <div className="flex items-center gap-2 cursor-pointer w-fit btn btn-sm bg-white border-transblack text-black active:text-white" onClick={back}>
            <img src="/assets/arrowLeft.png" width={16} />
            <span>{t("Back")}</span>
          </div>
          <div className="pb-20">{type === "Sign" ? <Sign /> : type === "Forgot" ? <Forget /> : <Revise />}</div>
        </div>
      </div>
      <AgreementProtocol />
    </div>
  );
};
export default Login;
