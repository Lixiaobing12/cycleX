import { Divider, Table } from "antd";

const Rw = () => {
  const columns = [
    {
      title: "类型",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "描述",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "收费/费用",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "备注",
      dataIndex: "address",
      key: "address",
      width: 100,
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
      <h1 className="font-bold font-whalebold text-3xl mb-6">收费标准</h1>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default Rw;
