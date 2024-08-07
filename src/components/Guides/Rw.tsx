import { Divider, Table } from "antd";
import { useTranslation } from "react-i18next";

const Rw = () => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      width: 100,
    },
    {
      title: t("Describe"),
      dataIndex: "desc",
      key: "desc",
      width: 100,
    },
    {
      title: t("Rate"),
      dataIndex: "rate",
      key: "rate",
      width: 100,
    },
    {
      title: t("Tip"),
      dataIndex: "tip",
      key: "tip",
      width: 100,
    },
  ];

  const data = [
    {
      key: "1",
      type: t("Equity in assets"),
      desc: t("Accrued interest on underlying assets"),
      rate: t("5% annualized rate of return"),
      tip: t("Net asset value increase calculation"),
    },
    {
      key: "2",
      type: t("- Escrow fee"),
      desc: t("Fees charged by third-party custodians of underlying assets"),
      rate: "0.1-2%",
      tip: t("Deducted from asset interest"),
    },
    {
      key: "3",
      type: t("- Service charge"),
      desc: t("Fees charged by CycleX operations"),
      rate: "0.1-2%",
      tip: t("Net asset value increase calculation"),
    },
    {
      key: "4",
      type: t("- Redemption fee"),
      desc: t("Fees are charged based on the exchange amount"),
      rate: t("Not collected yet"),
      tip: t("Deducted from asset interest"),
    },
  ];
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold font-whalebold text-3xl mb-6">{t("Charges")}</h1>
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} className="w-full" scroll={{ x: 500 }} rowKey="type" />
    </div>
  );
};
export default Rw;
