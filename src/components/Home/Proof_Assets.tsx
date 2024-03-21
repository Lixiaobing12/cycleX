import { Table as ATable, TableProps } from "antd";
import WrapperImg from "../Common/Img";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const Table = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "当前资产/规模",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类别/类型",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "报告/储备明细",
      dataIndex: "address",
      key: "address",
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
  return <ATable columns={columns} dataSource={data} pagination={false} className="w-full" />;
};
const ProofAssets = () => {
  const proofs = [
    { value: 60, name: "回购协议", color: "#5F79FF" },
    { value: 20, name: "公司债券", color: "#B9CAFF" },
    { value: 15, name: "另类投资", color: "#141537" },
    { value: 5, name: "货币市场基金", color: "#E2E5EB" },
  ];
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex items-end">
          <span className="text-2xl mr-4">储备明细</span>
          <span className="mr-2">截止2024年/01月/20日</span>
          <WrapperImg src="/assets/reflush.png" width={18} />
        </div>
        <div className=" w-full flex flex-col my-10">
          <div className="flex w-full rounded-full h-6 overflow-hidden">
            {proofs.map((item) => (
              <span style={{ width: item.value + "%", background: item.color }} className="h-full" key={item.name}></span>
            ))}
          </div>
          <div className="text-greyblack mt-4">（适用于现实世界资产）含上市公司、国债、货币市场基金、回购及另类投资</div>
        </div>
        <div className="w-full grid grid-cols-2 gap-8">
          {proofs.map((item) => (
            <div className="w-full flex items-center" key={item.name}>
              <div style={{ background: item.color }} className="w-6 h-6 rounded-md"></div>
              <span className="mx-4">{item.value}%</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 rounded-box shadow-2xl p-4 pt-10">
        <Table />
      </div>
    </div>
  );
};

export default ProofAssets;
