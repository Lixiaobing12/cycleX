import { Table, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { fundProductApiType } from "../../types/fundProduct";
import { scientific } from "../../utils/BigNumberToString";
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
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);

  const columns: TableProps<fundProductApiType>["columns"] = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "类型",
      key: "unit",
      width: 100,
      render: () => <span>基金</span>,
    },
    {
      title: "管理规模/AUM",
      dataIndex: "market_value",
      key: "market_value",
      width: 100,
      render: (value) => scientific(value),
    },
    {
      title: "单位净值/NAV",
      key: "net_worth",
      dataIndex: "net_worth",
      width: 100,
    },
    {
      title: "预期收益率/APY",
      key: "income",
      dataIndex: "income",
      width: 100,
      render: (value) => `${value}%`,
    },
  ];

  useEffect(() => {
    axios.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
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
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default TodoListAssets;
