import { Col, Drawer, Menu, MenuProps, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import WrapperImg from "../components/Common/Img";
import Audit from "../components/Guides/Audit";
import Book from "../components/Guides/Book";
import Kyc from "../components/Guides/Kyc";
import Law from "../components/Guides/Law";
import Problems from "../components/Guides/Problems";
import Product from "../components/Guides/Product";
import Rw from "../components/Guides/Rw";
import Us from "../components/Guides/Us";

const Guide = () => {
  const { t } = useTranslation();
  const [show, setModalShow] = useState(false);
  const [active, setActiveItem] = useState("us");
  const items: MenuProps["items"] = [
    { icon: <img width={24} src="/assets/us.png" />, label: t("About us"), key: "us" },
    { icon: <img width={24} src="/assets/products.png" />, label: t("Product list"), key: "products" },
    { icon: <img width={24} src="/assets/kyc.png" />, label: t("KYC(Authentication)"), key: "kyc" },
    { icon: <img width={24} src="/assets/reward.png" />, label: t("Income standard"), key: "reward" },
    { icon: <img width={24} src="/assets/audit.png" />, label: t("Audit (Certificate of reserves)"), key: "audit" },
    { icon: <img width={24} src="/assets/law.png" />, label: t("law"), key: "law" },
    { icon: <img width={24} src="/assets/problem.png" />, label: t("FAQ"), key: "problem" },
    { icon: <img width={24} src="/assets/book.png" />, label: t("White paper"), key: "book" },
  ];

  return (
    <div className="py-4 relative">
      <Row justify="center">
        <div className="md:hidden flex w-full justify-end mb-4 mr-2">
          <WrapperImg src="/assets/menu.png" width={30} onClick={() => setModalShow(true)} />
        </div>
        <Col xs={0} md={6} lg={4}>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={({ key }) => setActiveItem(key)} style={{ height: "100%" }} />
        </Col>
        <Col xs={24} md={14} lg={16}>
          <div className="min-h-screen px-4">
            {active === "us" ? (
              <Us />
            ) : active === "products" ? (
              <Product />
            ) : active === "kyc" ? (
              <Kyc />
            ) : active === "reward" ? (
              <Rw />
            ) : active === "audit" ? (
              <Audit />
            ) : active === "law" ? (
              <Law />
            ) : active === "problem" ? (
              <Problems />
            ) : active === "book" ? (
              <Book />
            ) : (
              <></>
            )}
          </div>
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
export default Guide;
