import { Table, TableProps } from "antd";
import { useState } from "react";
import WrapperButton from "../Common/Button";
import WrapperImg from "../Common/Img";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TodoListAssets = () => {
  const [activeItem, setItem] = useState(1);

  const columns: TableProps<DataType>["columns"] = [
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
      key: "tags",
      dataIndex: "tags",
      width: 100,
    },
    {
      title: "预期收益率/APY",
      key: "tags",
      dataIndex: "tags",
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
    <div className="flex flex-col w-full items-center gap-10">
      <div className="flex-col items-start gap-4 md:flex-row w-full flex justify-between md:items-center">
        <div className="flex gap-6">
          <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
            全部
          </WrapperButton>
          <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
            Fixed income
          </WrapperButton>
          <WrapperButton click={() => setItem(3)} isActive={activeItem === 3}>
            RWA Funds
          </WrapperButton>
        </div>

        <div className="self-end md:self-auto flex items-center text-greyblack">
          <span className="mr-2">截止2024年/01月/20日</span>
          <WrapperImg src="/assets/reflush.png" width={18} />
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default TodoListAssets;
