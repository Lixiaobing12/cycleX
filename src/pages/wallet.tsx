import { Col, Row, Table, TableProps } from "antd";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import WrapperImg from "../components/Common/Img";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const Wallet = () => {
  const navigate = useNavigate();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "资产/单位",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "规模/净值US￥",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "收益/变动",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
  ];

  const data: DataType[] = [
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
          <div className="rounded-box bg-black flex flex-col p-8 gap-4 relative">
            <div className="absolute right-4 top-4 btn btn-sm border-grey text-white hover:text-black hover:bg-white" onClick={() => navigate("/platform")}>
              平台币
            </div>
            <div className="text-grey">资产总额 US$</div>
            <div className="text-white text-2xl">1,096,096.24</div>
            <div className="flex justify-between gap-4 md:gap-14 flex-wrap">
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">可用总额 US$</div>
                <div className="text-white text-md">1,006,626.36</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-grey text-md">今日盈亏</div>
                <div className="text-white text-md">-200.0 (20%)</div>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-end">
                <div className="text-white text-md">钱包地址</div>
                <div className="text-grey text-md flex gap-2 items-center">
                  <div>{ethers.constants.AddressZero}</div>
                  <WrapperImg src="/assets/copy.png" width={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-14">
            <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 500 }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wallet;
