import { Table as ATable, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { request } from "../../utils/request";
import WrapperImg from "../Common/Img";

const Table = () => {
  const { t } = useTranslation();
  const [proofs, setProofs] = useState<any[]>([]);

  useEffect(() => {
    request.post("/sapi/fundProof/list").then((res: any) => {
      setProofs(res.data.data);
    });
  }, []);
  const columns: TableProps<any>["columns"] = [
    {
      title: t("Current assets/size"),
      dataIndex: "MarketValue",
      key: "MarketValue",
    },
    {
      title: t("Category/type"),
      dataIndex: "TypeSort",
      key: "TypeSort",
    },
    {
      title: t("Report/Reserve details"),
      dataIndex: "Name",
      key: "Name",
      render: (value, row) => <div className="flex items-center gap-2">
        <span>{value}</span>
        <a href={row.Url} target="_blank">
          <WrapperImg src="/assets/pdf.png" width={25} />
        </a>
      </div>
    },
  ];
  return <ATable columns={columns} dataSource={proofs} pagination={false} className="w-full" />;
};
const colors = ["#5F79FF", "#B9CAFF", "#141537", "#E2E5EB"];
const ProofAssets = () => {
  const [proofs, setProofs] = useState<any[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    request.post("/sapi/fundProof/list").then((res: any) => {
      res.data.data.forEach((item: any, index: number) => {
        item.color = index < colors.length ? colors[index] : colors[0];
      });
      setProofs(res.data.data);
    });
  }, []);
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex items-end">
          <span className="text-2xl mr-4">{t("Reserve detail")}</span>
          <span className="mr-2">{t("Until January /20, 2024")}</span>
          <WrapperImg src="/assets/reflush.png" width={18} />
        </div>
        <div className=" w-full flex flex-col my-10">
          <div className="flex w-full rounded-full h-6 overflow-hidden">
            {proofs.map((item) => (
              <span style={{ width: item.Rate + "%", background: item.color }} className="h-full" key={item.Name}></span>
            ))}
          </div>
          <div className="text-greyblack mt-4">{t("(For real world assets) including public companies, Treasury bonds, money market funds, repo and alternative investments")}</div>
        </div>
        <div className="w-full grid grid-cols-2 gap-8">
          {proofs.map((item) => (
            <div className="w-full flex items-center" key={item.Name}>
              <div style={{ background: item.color }} className="w-6 h-6 rounded-md"></div>
              <span className="mx-4">{item.Rate}%</span>
              <span>{item.Name}</span>
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
