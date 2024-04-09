import { Col, Drawer, Menu, MenuProps, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Aguide from "../components/AssestIssus/guide";
import WrapperImg from "../components/Common/Img";
import Kyc from "../components/Guides/Kyc";
import Law from "../components/Guides/Law";

const Issus = () => {
  const { t } = useTranslation();
  const [show, setModalShow] = useState(false);
  const [active, setActiveItem] = useState("guide");
  const items: MenuProps["items"] = [
    { icon: <img width={24} src="/assets/guide.png" />, label: t("Release Guidelines"), key: "guide" },
    { icon: <img width={24} src="/assets/kyc.png" />, label: t("KYC(Authentication)"), key: "kyc" },
    { icon: <img width={24} src="/assets/law.png" />, label: t("law"), key: "law" },
  ];

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <img src="/assets/guide-banner.png" className="w-full min-h-[120px]" alt="" />
        <div className="absolute flex w-[94%] m-auto">
          <p className="tracking-widest	text-4xl font-bold font-whalebold text-white text-center m-auto">{t("Newbie Guide")}</p>
        </div>
      </div>
      <div className="py-6 relative">
        <Row justify="center">
          <div className="md:hidden fixed bottom-6 right-4 z-10">
            <button className="btn btn-circle bg-white border-black" onClick={() => setModalShow(true)}>
              <WrapperImg src="/assets/open.png" width={30} />
            </button>
          </div>
          <Col xs={0} md={6} lg={4}>
            <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={({ key }) => setActiveItem(key)} style={{ height: "100%" }} />
          </Col>
          <Col xs={24} md={14} lg={16}>
            <div className="min-h-screen px-4">{active === "guide" ? <Aguide /> : active === "kyc" ? <Kyc /> : active === "law" ? <Law /> : <></>}</div>
          </Col>
        </Row>
        <Drawer
          onClose={() => setModalShow(false)}
          open={show}
          width={230}
          styles={{
            body: {
              padding: 0,
            },
          }}>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={({ key }) => setActiveItem(key)} />
        </Drawer>
      </div>
    </div>
  );
};
export default Issus;
