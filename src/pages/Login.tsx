import { ArrowLeft } from "@ricons/tabler";
import { Icon } from "@ricons/utils";
import { Checkbox, Col, Form, Input, Modal, Row, Tabs } from "antd";
import { atom, useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { messageContext } from "../App";
import WrapperImg from "../components/Common/Img";
import Loader from "../components/Loader";
import useLocalStorage from "../hooks/localStorage";
import { request } from "../utils/request";

const tabTypes = atom<"Sign" | "Forgot" | "Revise">("Sign");

/** 用户协议弹窗 */
const agreemenetModel = atom(false);
const AgreementProtocol = () => {
  const [show, setShow] = useAtom(agreemenetModel);
  const protocol = useRef<{
    read_num: number;
    title: string;
    desc: string;
    content: string;
    created_at: string;
  }>();

  useEffect(() => {
    request.post("/api/api/announce/getDetail", { id: "15" }).then(({ data }) => {
      protocol.current = data.data;
    });
  }, []);
  return (
    <Modal
      open={show}
      onCancel={() => setShow(false)}
      modalRender={() => (
        <div className="w-full rounded-md bg-white p-4 text-black relative pointer-events-auto">
          <WrapperImg src="/assets/close.png" width={18} className="absolute top-2 right-2 " onClick={() => setShow(false)} />
          <div className="w-full text-3xl font-bold font-whalebold">{protocol.current?.title}</div>
          <p className="text-threePranentTransblack">{protocol.current?.created_at}</p>
          <p dangerouslySetInnerHTML={{ __html: protocol.current?.content || "" }}></p>
        </div>
      )}></Modal>
  );
};
/** 登录 */
const In = () => {
  const { t } = useTranslation();
  /** 是否显示密码 */
  const [visible, setVisible] = useState(false);
  const [toast] = useAtom(messageContext);
  const [form] = Form.useForm();
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [type, setType] = useAtom(tabTypes);
  const [loading, setLoading] = useState(false);

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
        toast?.error(t("Incorrect username or password"));
      });
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Form.Item label={t("Username")}>
            <Input onChange={(e) => setNickName(e.target.value)} size="large" placeholder={t("Please enter your email or mobile phone number")} />
          </Form.Item>
          <Form.Item noStyle>
            <div className="flex w-full flex-col mb-10">
              <div className="flex justify-between items-center w-full mb-1">
                <span>{t("Password")}</span>
                <a className="text-[#193CF6]" onClick={() => setType("Forgot")}>
                  {t("Forget")}
                </a>
              </div>
              <div className="relative items-center flex">
                <Input type={visible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} size="large" placeholder={t("Please enter password")} />
                <div className="absolute right-2">
                  {visible ? <WrapperImg src="/assets/watch.png" width={20} onClick={() => setVisible(false)} /> : <WrapperImg src="/assets/miss.png" width={20} onClick={() => setVisible(true)} />}
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-threePranentTransblack" disabled={!nickname || !password || loading} onClick={confirm}>
              <Loader spinning={loading} />
              {t("Sign in")}
            </button>
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <span>{t("No account yet")}?</span>
              <a className="ml-2 text-[#193CF6]" onClick={() => navigate("/login?t=up")}>
                {t("Sign up")}
              </a>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
/** 注册 */
const Up = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  /** 1:email
   * 2:phone
   */
  const [emailOrPhone, setChange] = useState(1);
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isAgree, setAgree] = useState(false);

  useEffect(() => {
    request.get("/api/msgProvideCountry/getList").then(({ data }) => {
      console.log(data);
    });
  }, []);
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 20 }} md={{ span: 18 }} lg={{ span: 14 }}>
          <Form.Item>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setChange(1)}
                className={`btn rounded-full border-0 btn-sm btn-cycle active:text-white ${emailOrPhone === 1 ? "bg-[#F1F3F5] text-black" : "bg-white text-threePranentTransblack"}`}>
                {t("Email")}
              </button>
              <button
                onClick={() => setChange(2)}
                className={`btn rounded-full border-0 btn-sm btn-cycle active:text-white ${emailOrPhone === 2 ? "bg-[#F1F3F5] text-black" : "bg-white text-threePranentTransblack"}`}>
                {t("Phone number")}
              </button>
            </div>
          </Form.Item>
          {}
          <Form.Item label={t("Username")}>
            <Input onChange={(e) => setNickName(e.target.value)} size="large" placeholder={t("Please enter your email or mobile phone number")} />
          </Form.Item>
          <Form.Item label={t("Password")}>
            <Input onChange={(e) => setPassword(e.target.value)} size="large" placeholder={t("Please set a password")} />
          </Form.Item>
          <Form.Item label={t("Verification code")}>
            <Input onChange={(e) => setCode(e.target.value)} size="large" placeholder={t("please enter verification code")} suffix={<a className="text-xs text-[#193CF6]">{t("Send")}</a>} />
          </Form.Item>
          <Form.Item label={t("Referral code (optional)")}>
            <Input onChange={(e) => setInviteCode(e.target.value)} size="large" placeholder={t("Referral code")} />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-transblack" disabled={!nickname || !password || !code || !isAgree}>
              {t("Sign up now")}
            </button>
          </Form.Item>
          <Form.Item>
            <div className="text-center">
              <Checkbox onChange={(e) => setAgree(e.target.checked)}>
                {t("I have read, agreed and understood")}
                <a className="text-[#193CF6]">{t("User Agreement")}</a>&<a className="text-[#193CF6]">{t("Privacy Policy")}</a>
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
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [email, setNEmail] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useAtom(tabTypes);
  const confirm = () => {
    setType("Revise");
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Form.Item label={t("Email")}>
            <Input onChange={(e) => setNEmail(e.target.value)} size="large" placeholder={t("please input your email")} />
          </Form.Item>
          <Form.Item label={t("Verification code")}>
            <Input onChange={(e) => setCode(e.target.value)} size="large" placeholder={t("please enter verification code")} suffix={<a className="text-xs text-[#193CF6]">{t("Send")}</a>} />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-transblack" disabled={!email || !code} onClick={confirm}>
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
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useAtom(tabTypes);

  const confirm = () => {
    setType("Revise");
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row align="middle" justify="center">
        <Col xs={{ span: 22 }} md={{ span: 12 }}>
          <Form.Item label={t("Phone number")}>
            <Input onChange={(e) => setPhone(e.target.value)} size="large" placeholder={t("Please enter phone number")} prefix={<a>+86</a>} />
          </Form.Item>
          <Form.Item label={t("Verification code")}>
            <Input onChange={(e) => setCode(e.target.value)} size="large" placeholder={t("please enter verification code")} suffix={<a className="text-xs text-[#193CF6]">{t("Send")}</a>} />
          </Form.Item>
          <Form.Item>
            <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-transblack" disabled={!phone || !code} onClick={confirm}>
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
  const navigate = useNavigate();
  const [activeKey, setKey] = useState("1");
  const [, setAgreeModalShow] = useAtom(agreemenetModel);
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
    const isSignIn = /\=in/.test(location.search);
    setKey(isSignIn ? "1" : "2");
  }, [location]);

  return (
    <>
      <div className="mt-8 flex-1">
        <Tabs items={items} activeKey={activeKey} onChange={(e) => setKey(e)}></Tabs>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 text-threePranentTransblack text-xs">
        <div>ALL RIGHTS RESERVED ©2024 CycleX</div>
        <div className="flex gap-4">
          <a className="cursor-pointer" onClick={() => setAgreeModalShow(true)}>
            {t("User Agreement")}
          </a>
          <a className="cursor-pointer">{t("Privacy Policy")}</a>
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
    {
      key: "2",
      label: (
        <div className="flex gap-1">
          <span className="text-base">{t("Phone number")}</span>
        </div>
      ),
      children: <ForgotPhone />,
    },
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
              <Input onChange={(e) => setOldPassword(e.target.value)} size="large" placeholder={t("Please enter old password")} />
            </Form.Item>
            <Form.Item label={t("New Password")}>
              <Input.Password onChange={(e) => setNewPassword(e.target.value)} size="large" placeholder={t("Please enter a new password")} />
            </Form.Item>
            <Form.Item label={t("New password verification")} validateStatus={!!newPassword && !vilid ? "error" : "success"}>
              <Input.Password onChange={onVilid} size="large" placeholder={t("Please enter new password again")} />
            </Form.Item>
            <Form.Item>
              <button className="btn btn-block border-0 bg-black text-white disabled:bg-[#DFE0E4] disabled:text-transblack" disabled={!vilid} onClick={confirm}>
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
  const accessToken = useLocalStorage();
  const [toast] = useAtom(messageContext);
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
  useEffect(() => {
    if (accessToken) {
      toast?.loading("Logging In");
      setTimeout(() => navigate("/"), 1000);
    }
  }, [accessToken]);
  return (
    <div className="flex text-black">
      <div className="hidden md:flex flex-1 md:h-screen bg-login_mene bg-100 flex justify-center items-center">
        <img src="/assets/login_logo.png" width={300} alt="" />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-20 flex flex-col h-screen">
          <div className="flex items-center gap-2 cursor-pointer w-fit btn btn-sm bg-white border-transblack text-black active:text-white" onClick={back}>
            <Icon size={18}>
              <ArrowLeft onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </Icon>
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
