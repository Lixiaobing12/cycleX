import { Col, Drawer, Menu, MenuProps, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [selectedKeys, setSelectKey] = useState<string[]>(["us"]);
  const { t } = useTranslation();
  const [show, setModalShow] = useState(false);
  const items: MenuProps["items"] = [
    { icon: <img width={24} src="/assets/us.png" />, label: t("About us"), key: "us" },
    { icon: <img width={24} src="/assets/products.png" />, label: t("Product list"), key: "products" },
    { icon: <img width={24} src="/assets/kyc.png" />, label: t("KYC(Authentication)"), key: "kyc" },
    { icon: <img width={24} src="/assets/reward.png" />, label: t("Income standard"), key: "reward" },
    { icon: <img width={24} src="/assets/audit.png" />, label: t("Audit (Certificate of reserves)"), key: "audit" },
    { icon: <img width={24} src="/assets/law.png" />, label: t("law"), key: "law" },
    { icon: <img width={24} src="/assets/problem.png" />, label: t("Q&A"), key: "problem" },
    { icon: <img width={24} src="/assets/book.png" />, label: t("White paper"), key: "book" },
  ];
  useEffect(() => {
    console.log("location", location);
    if (location.hash) {
      setSelectKey((state) => [location.hash.replace("#", "")]);
    }
  }, [location]);
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
            <Menu selectedKeys={selectedKeys} mode="inline" items={items} onSelect={({ key }) => setSelectKey([key])} style={{ height: "100%" }} />
          </Col>
          <Col xs={24} md={14} lg={16}>
            <div className="min-h-screen px-4">
              {selectedKeys[0] === "us" ? (
                <Us />
              ) : selectedKeys[0] === "products" ? (
                <Product />
              ) : selectedKeys[0] === "kyc" ? (
                <Kyc />
              ) : selectedKeys[0] === "reward" ? (
                <Rw />
              ) : selectedKeys[0] === "audit" ? (
                <Audit />
              ) : selectedKeys[0] === "law" ? (
                <Law />
              ) : selectedKeys[0] === "problem" ? (
                <Problems />
              ) : selectedKeys[0] === "book" ? (
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
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onSelect={({ key }) => setSelectKey([key])} />
        </Drawer>
      </div>
    </div>
  );
};
export default Guide;
