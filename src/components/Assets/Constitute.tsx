import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useTranslateLocalStorage } from "../../hooks/localStorage";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";

const Constitute = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const [assets, setAssets] = useState<any[]>([]);
  const { handleTranslate } = useTranslateLocalStorage();

  const columns: TableProps<any>["columns"] = [
    {
      title: t("Assets"),
      dataIndex: "Name",
      key: "Name",
      width: 100,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <img src="/assets/assets1.png" width={20} alt="" />
          <span>{row.NameDct ? (i18n.language === "en" ? row.NameDct.en : row.NameDct.zh) : ""}</span>
        </div>
      ),
    },
    {
      title: t("Reserve asset composition"),
      dataIndex: "MarketValue",
      key: "MarketValue",
      width: 100,
      render: (value) => <strong>${scientific(value)} AUM</strong>,
    },
    {
      title: t("Expiration(days)"),
      dataIndex: "ExprieDay",
      key: "ExprieDay",
      width: 100,
    },
    {
      title: t("Category/type"),
      key: "Labels",
      dataIndex: "Labels",
      width: 200,
      render: (value, row) => <>{row.labelsDcts ? (i18n.language === "en" ? row.labelsDcts.en : row.labelsDcts.zh) : ""}</>,
    },
  ];
  useEffect(() => {
    request
      .post("/sapi/fundReserve/list", {
        ProductId: Number(params.id),
        Page: 1,
        Size: 10,
      })
      .then(async (res: any) => {
        const items = res.data.data as any[];
        for (let i = 0; i < items.length; i++) {
          items[i].labelsDcts = {
            key: items[i].Labels,
            zh: items[i].Labels,
            en: await handleTranslate(items[i].Labels),
          };
          items[i].NameDct = {
            key: items[i].Name,
            zh: items[i].Name,
            en: await handleTranslate(items[i].Name),
          };
        }
        setAssets(items);
      });
  }, []);
  return (
    <div className="flex flex-col w-full items-center gap-10">
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 500 }} rowKey="Name" />
    </div>
  );
};
export default Constitute;
