import { Divider, Table } from "antd";

const Product = () => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "类型",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "管理规模/AUM",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "单位净值/NAV",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "预期收益率/APY",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "发行概要",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
  ];

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
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">产品列表</h1>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 700 }}/>
    </div>
  );
};
export default Product;
