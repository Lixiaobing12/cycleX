import { Table, TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Constitute = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "资产",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "储备资产构成",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "到期日",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "资产类别",
      key: "tags",
      dataIndex: "tags",
      width: 200,
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
    <div className="flex flex-col w-full items-center gap-10">
      <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default Constitute;
