import { Col, Drawer, Menu, MenuProps, Row } from "antd";
import { useState } from "react";
import Aguide from "../components/AssestIssus/guide";
import WrapperImg from "../components/Common/Img";
import Kyc from "../components/Guides/Kyc";
import Law from "../components/Guides/Law";

const Issus = () => {
  const [show, setModalShow] = useState(false);
  const [active, setActiveItem] = useState("guide");
  const items: MenuProps["items"] = [
    { icon: <img width={24} src="/assets/guide.png" />, label: "产品列表", key: "guide" },
    { icon: <img width={24} src="/assets/kyc.png" />, label: "KYC(实名认证)", key: "kyc" },
    { icon: <img width={24} src="/assets/law.png" />, label: "法律", key: "law" },
  ];

  return (
    <div className="py-4 relative">
      <Row justify="center">
        <div className="md:hidden flex w-full justify-end mb-4 mr-2">
          <WrapperImg src="/assets/menu.png" width={30} onClick={() => setModalShow(true)} />
        </div>
        <Col xs={0} md={6} lg={4}>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={({ key }) => setActiveItem(key)} style={{height:'100%'}}/>
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
  );
};
export default Issus;
