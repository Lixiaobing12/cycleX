import { Col, Form, Input, Row, Select, Upload, UploadProps } from "antd";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { messageContext } from "../App";
import { request } from "../utils/request";

const { Dragger } = Upload;

const Verify = () => {
  const items = useRef({
    real_name: "",
    nationality: 1,
  });
  const [toast] = useAtom(messageContext);
  const [form] = Form.useForm();
  const [idBackImg, setBackImg] = useState("");
  const [idFrontImg, setFrontImg] = useState("");
  const BackProps: UploadProps = {
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
        toast?.error(`上传失败,请重新尝试`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const FrontProps: UploadProps = {
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
        toast?.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const confirm = () => {
    request.post("/api/api/usercertification/createPerson", {});
  };
  return (
    <div className="w-full py-10 px-4">
      <Form form={form} layout="vertical" autoComplete="off">
        <Row gutter={{ md: 8, lg: 42 }} justify="center">
          <Col span={24}>
            <Form.Item>
              <div className="flex flex-col gap-6 items-center">
                <h1 className="font-bold text-3xl">实名认证</h1>
                <div className="flex items-center gap-2">
                  <img src="/assets/verified.png" alt="" width={14} />
                  <span className="text-threePranentTransblack">Crypto 全力保护你的信息安全</span>
                </div>
              </div>
            </Form.Item>
            <Form.Item />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 10 }} lg={8}>
            <Form.Item label="国家/地区">
              <Select
                defaultValue="chn"
                options={[
                  { value: "chn", label: "中国" },
                  { value: "hk", label: "中国香港" },
                  { value: "usa", label: "美国" },
                  { value: "sgp", label: "新加坡" },
                  { value: "ca", label: "加拿大" },
                  { value: "other", label: "其他" },
                ]}></Select>
            </Form.Item>
            <Form.Item label="姓名">
              <Input placeholder="请输入真实姓名" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 10 }} lg={8}>
            <Form.Item label="证件类型">
              <Select
                defaultValue="ID"
                options={[
                  { value: "ID", label: "身份证" },
                  { value: "PO", label: "护照" },
                  { value: "other", label: "其他" },
                ]}></Select>
            </Form.Item>
            <Form.Item label="证件号码">
              <Input placeholder="请输入证件号码" />
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item>
              <div className="flex justify-end">
                <div className="rounded-box border border-light p-8 w-full md:w-2/3 pb-12">
                  <div className="font-bold text-center mb-2">上传国徽面</div>
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
                        <p className="ant-upload-text">点击上传国徽面</p>
                        <p className="ant-upload-hint">请确保照片中信息清晰，边框无缺失</p>
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
                  <div className="font-bold text-center mb-2">上传人像面</div>
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
                        <p className="ant-upload-text">点击上传人像面</p>
                        <p className="ant-upload-hint">请确保照片中信息清晰，边框无缺失</p>
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
                <button className="btn btn-wide border-o text-white">提交</button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Verify;
