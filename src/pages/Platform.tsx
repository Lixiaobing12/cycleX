import { Col, List, Row } from "antd";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Platform = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = [
    {
      key: "1",
      name: "CUSDA",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="w-full p-4 py-10 min-h-11/12">
      <Row justify="center">
        <Col xs={24} md={22} lg={18}>
          <div className="rounded-box bg-black flex flex-col p-8 gap-4 relative items-center justify-center">
            <div className="absolute right-4 top-4 btn btn-sm border-grey text-white hover:text-black hover:bg-white" onClick={() => navigate("/wallet")}>
              {t("my assets")}
            </div>
            <div className="text-white text-3xl">WFC</div>
            <div className="text-white text-2xl">
              <CountUp end={19829289} separator="," decimal="." decimals={2} />
            </div>
          </div>
          <div className="my-14">
            <div className="text-center text-black text-2xl mb-10">平台币记录</div>
            <div className="bg-transblack rounded-box">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <div className="p-4 w-full grid grid-cols-3 text-center">
                      <div>{item.name}</div>
                      <div>{item.age}</div>
                      <div>{item.address}</div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Platform;
