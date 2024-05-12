import { Divider, Table, TableProps } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { messageContext } from "../../App";
import useAccounts from "../../hooks/user";
import { fundProductApiType } from "../../types/fundProduct";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";

const Product = () => {
  const { t } = useTranslation();
  const [toast] = useAtom(messageContext);
  const [, users] = useAccounts();
  const navigate = useNavigate();
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  const columns: TableProps<fundProductApiType>["columns"] = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (value, row) => (
        <a
          className="text-black flex items-center gap-2"
          onClick={() => {
            if (users) {
              navigate(`/assets/${row.id}#main`);
            } else {
              toast?.warning({
                message: t("please sign in"),
                icon: <img src="/assets/error.png" width={30} />,
                onClose() {
                  navigate("/login?t=in");
                },
              });
            }
          }}>
          <div>
            <img src="/assets/assets_dollor.png" width={25} alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg  font-bold font-whalebold">{value}</span>
            <span className="text-threePranentTransblack ">{t("Tokenized funds")}</span>
          </div>
        </a>
      ),
    },
    {
      title: t("Type"),
      key: "unit",
      width: 100,
      render: () => <span>{t("Fund")}</span>,
    },
    {
      title: t("AUM /Asset Under Management"),
      dataIndex: "market_value",
      key: "market_value",
      width: 200,
      render: (value) => "$" + scientific(value),
    },
    {
      title: t("Net value per unit /NAV"),
      key: "net_worth",
      dataIndex: "net_worth",
      width: 150,
      render: (value) => (Number(value) ? value + "U" : value),
    },
    {
      title: t("Expected yield /APY"),
      key: "income",
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
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Product list")}</h1>
      <Divider />
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 750 }} rowKey="name" />
    </div>
  );
};
export default Product;
