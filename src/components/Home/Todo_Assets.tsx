import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fundProductApiType } from "../../types/fundProduct";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeItem, setItem] = useState(1);
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);

  const columns: TableProps<fundProductApiType>["columns"] = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "u_name_TodoListAssets",
      width: 100,
      render: (value, row) => (
        <a className="text-black flex items-center gap-2" onClick={() => navigate(`/assets/${row.id}`)}>
          <div>
            <img src="/assets/assets_dollor.png" width={25} alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">{value}</span>
            <span className="text-threePranentTransblack ">{t("Tokenized funds")}</span>
          </div>
        </a>
      ),
    },
    {
      title: t("Type"),
      key: "unit_TodoListAssets",
      width: 100,
      render: () => <span>{t("Fund")}</span>,
    },
    {
      title: t("AUM /Asset Under Management"),
      dataIndex: "market_value",
      key: "market_value_TodoListAssets",
      width: 100,
      render: (value) => '$' + scientific(value),
    },
    {
      title: t("Net value per unit /NAV"),
      key: "net_worth_TodoListAssets",
      dataIndex: "net_worth",
      width: 100,
      render: (value) => '$' + value,
    },
    {
      title: t("Expected yield /APY"),
      key: "income_TodoListAssets",
      dataIndex: "income",
      width: 100,
      render: (value) => <div>{Number(value) > 0 ? <span className="text-[#58BD7D]">+{value}%</span> : <span className="text-[#FF6838]">-{value}%</span>}</div>,
    },
  ];

  useEffect(() => {
    request.post("/api/api/fundProduct/getList").then(({ data }) => {
      setAssetsItems(data.data);
    });
  }, []);
  return (
    <div className="flex flex-col w-full items-center gap-10">
      <div className="flex-col items-start gap-4 md:flex-row w-full flex justify-between md:items-center">
        <div className="flex gap-6">
          <WrapperButton click={() => setItem(1)} isActive={activeItem === 1}>
            {t("All")}
          </WrapperButton>
          <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
            Fixed income
          </WrapperButton>
          <WrapperButton click={() => setItem(3)} isActive={activeItem === 3}>
            RWA Funds
          </WrapperButton>
        </div>

        <div className="self-end md:self-auto flex items-center text-greyblack">
          <span className="mr-2">{t("Until January /20, 2024")}</span>
          <WrapperImg src="/assets/reflush.png" width={18} />
        </div>
      </div>
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default TodoListAssets;
