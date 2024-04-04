import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";

const Constitute = () => {
  const params = useParams();
  const [assets, setAssets] = useState<any[]>([]);

  const columns: TableProps<any>["columns"] = [
    {
      title: "资产",
      dataIndex: "Name",
      key: "Name",
      width: 100,
      render: (value) => (
        <div className="flex items-center gap-2">
          <img src="/assets/assets1.png" width={20} alt="" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      title: "储备资产构成",
      dataIndex: "MarketValue",
      key: "MarketValue",
      width: 100,
      render: (value) => <strong>${scientific(value)} AUM</strong>,
    },
    {
      title: "到期日(天)",
      dataIndex: "ExprieDay",
      key: "ExprieDay",
      width: 100,
    },
    {
      title: "资产类别",
      key: "Labels",
      dataIndex: "Labels",
      width: 200,
    },
  ];
  useEffect(() => {
    request
      .post("/sapi/fundReserve/list", {
        ProductId: Number(params.id),
        Page: 1,
        Size: 10,
      })
      .then((res: any) => {
        setAssets(res.data.data);
      });
  }, []);
  return (
    <div className="flex flex-col w-full items-center gap-10">
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 500 }} />
    </div>
  );
};
export default Constitute;
