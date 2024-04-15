import { Col, Form, Input, Row, Select, Upload, UploadProps } from "antd";
import { useAtom } from "jotai";
import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { messageContext } from "../App";
import { useTranslateLocalStorage } from "../hooks/localStorage";
import { request } from "../utils/request";

const { Dragger } = Upload;

const Setting = () => {
  const { t, i18n } = useTranslation();
  const { handleTranslate } = useTranslateLocalStorage();
  const [loading, setLoading] = useState(false);
  const defaultInfo = {
    /** 真实姓名 */
    real_name: "",
    /** 国家 */
    nationality: 1,
    /** 证件类型 */
    certificate: "",
    /** 证件号码 */
    cardnumber: "",
    /** 审核状态 */
    status: 0,
  };
  const reducer_action_info = (state: any, payload: any) => {
    switch (payload.type) {
      case "real_name":
        return { ...state, real_name: payload.value };
      case "nationality":
        return { ...state, nationality: payload.value };
      case "certificate":
        return { ...state, certificate: payload.value };
      case "status":
        return { ...state, status: payload.value };
      case "cardnumber":
        return { ...state, cardnumber: payload.value };
      default:
        return { ...state };
    }
  };
  const [info, action] = useReducer(reducer_action_info, defaultInfo);
  const [toast] = useAtom(messageContext);
  const [form] = Form.useForm();
  const [idBackImg, setBackImg] = useState("");
  const [idFrontImg, setFrontImg] = useState("");
  const BackProps: UploadProps = {
    disabled: info.status === 1 || info.status === 2,
    name: "file",
    multiple: true,
    action: "/api/api/upload",
    itemRender: () => <div></div>,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setBackImg(info.file.response.data);
      } else if (status === "error") {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: `file upload failed`,
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const FrontProps: UploadProps = {
    disabled: info.status === 1 || info.status === 2,
    name: "file",
    multiple: true,
    action: "/api/api/upload",
    itemRender: () => <div></div>,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setFrontImg(info.file.response.data);
      } else if (status === "error") {
        toast?.error({
          icon: <img src="/assets/error.png" width={30} />,
          message: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const confirm = () => {
    setLoading(true);
    request
      .post("/api/api/usercertification/createPerson", {
        nationality: "中国",
        cardtype: 2,
        real_name: info.real_name,
        cardnumber: info.cardnumber,
        id_front: idFrontImg,
        id_back: idBackImg,
      })
      .then(async ({ data }) => {
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
          setLoading(false);
        } else {
          fetch();
          setLoading(false);
          toast?.success({
            icon: <img src="/assets/success.png" width={30} />,
            message: t("Sent successfully"),
          });
        }
      });
  };

  const fetch = () => {
    request.post("/api/api/usercertification/getDetail", { type: 1 }).then(({ data }) => {
      if (!Array.isArray(data.data) && data.data.id) {
        setBackImg(data.data.id_back);
        setFrontImg(data.data.id_front);
        action({ type: "real_name", value: data.data.real_name });
        action({ type: "cardnumber", value: data.data.cardnumber });
        action({ type: "nationality", value: data.data.nationality });
        action({ type: "status", value: data.data.status });
      }
    });
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="w-full py-10 px-4">
      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={{ md: 8, lg: 42 }} justify="center">
          <Col span={24}>
            <Form.Item>
              <div className="flex flex-col gap-6 items-center">
                <h1 className="font-bold font-whalebold text-3xl">{t("Payment password settings")}</h1>
                <div className="flex items-center gap-2">
                  <img src="/assets/verified.png" alt="" width={14} />
                  <span className="text-threePranentTransblack">{t("Crypto is committed to protecting your information security")}</span>
                </div>
              </div>
            </Form.Item>
            <Form.Item />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 10 }} lg={8}>
            <Form.Item label={t("country / region")}>
              <Select
                disabled={info.status === 1 || info.status === 2}
                defaultValue="chn"
                options={[
                  { value: "chn", label: t("China") },
                  { value: "hk", label: t("China Hong Kong") },
                  { value: "usa", label: t("USA") },
                  { value: "sgp", label: t("Singapore") },
                  { value: "ca", label: t("Canada") },
                  { value: "other", label: t("other") },
                ]}></Select>
            </Form.Item>
            <Form.Item label={t("full name")}>
              <Input
                placeholder={t("please enter your real name")}
                disabled={info.status === 1 || info.status === 2}
                value={info.real_name}
                onChange={(e) => action({ type: "real_name", value: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 10 }} lg={8}>
            <Form.Item label={t("type of certificate")}>
              <Select
                disabled={info.status === 1 || info.status === 2}
                defaultValue="ID"
                options={[
                  { value: "ID", label: t("ID card") },
                  { value: "PO", label: t("passport") },
                  { value: "other", label: t("other") },
                ]}></Select>
            </Form.Item>
            <Form.Item label={t("ID number")}>
              <Input
                placeholder={t("Please enter your ID number")}
                disabled={info.status === 1 || info.status === 2}
                value={info.cardnumber}
                onChange={(e) => action({ type: "cardnumber", value: e.target.value })}
              />
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item>
              <div className="flex justify-end">
                <div className="rounded-box border border-light p-8 w-full md:w-2/3 pb-12">
                  <div className="font-bold font-whalebold text-center mb-2">{t("Upload the national emblem")}</div>
                  <Dragger {...BackProps}>
                    {idBackImg ? (
                      <div>
                        <img src={idBackImg} alt="" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className="ant-upload-drag-icon">
                          <img src="/assets/upload.png" width={38} />
                        </p>
                        <p className="ant-upload-text">{t("Click to upload the national emblem")}</p>
                        <p className="ant-upload-hint">{t("Please make sure the information in the photo is clear and there are no missing borders")}</p>
                      </div>
                    )}
                  </Dragger>
                </div>
              </div>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item>
              <div className="flex justify-start">
                <div className="rounded-box border border-light p-8 w-full md:w-2/3 pb-12">
                  <div className="font-bold font-whalebold text-center mb-2">{t("Upload portrait")}</div>
                  <Dragger {...FrontProps}>
                    {idFrontImg ? (
                      <div>
                        <img src={idFrontImg} className="h-[200px]" alt="" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className="ant-upload-drag-icon">
                          <img src="/assets/upload.png" width={38} />
                        </p>
                        <p className="ant-upload-text">{t("Click to upload portrait")}</p>
                        <p className="ant-upload-hint">{t("Please make sure the information in the photo is clear and there are no missing borders")}</p>
                      </div>
                    )}
                  </Dragger>
                </div>
              </div>
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item>
              <div className="flex justify-center">
                <button className="btn btn-wide border-o text-white disabled:text-white" disabled={info.status === 1 || info.status === 2 || info.status === 2} onClick={confirm}>
                  {info.status === 1 ? t("Under review") : info.status === 2 ? t("Certification successful") : info.status === 3 ? t("Resubmit") : t("submit")}
                </button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Setting;
