import { Table, TableProps } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { messageContext } from "../../App";
import useAccounts from "../../hooks/user";
import { fundProductApiType } from "../../types/fundProduct";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";
import WrapperButton from "../Common/Button";
import WrapperImg from "../Common/Img";
import CountUp from "react-countup";
import moment from "moment";
import { useWindowSize } from "usehooks-ts";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TodoListAssets = () => {
  const [toast] = useAtom(messageContext);
  const [, users] = useAccounts();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeItem, setItem] = useState(1);
  const [assets, setAssetsItems] = useState<fundProductApiType[]>([]);
  const day = moment().format("MM/YYYY");
  const { width } = useWindowSize();

  const columns: TableProps<fundProductApiType>["columns"] = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      width: 250,
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
          <img src="/assets/assets_dollor.png" className="w-[25px]" alt="" />
          <div className="flex flex-col">
            <span className="text-md font-bold font-whalebold leading-5">{value}</span>
            <span className="text-threePranentTransblack text-sm">{t("Tokenized funds")}</span>
          </div>
        </a>
      ),
    },
    {
      title: t("Type"),
      width: 100,
      key: "Type",
      render: () => <span>{t("Fund")}</span>,
    },
    {
      title: t("AUM"),
      dataIndex: "market_value",
      key: "market_value",
      width: 180,
      render: (value, record) => '$' + scientific(Number(record.aum_value))
    },
    {
      title: t("NAV"),
      key: "unit",
      dataIndex: "unit",
      width: 180,
      render: (value) => (Number(value) ? "$" + value : value),
    },
    {
      title: t("APY"),
      key: "income",
      dataIndex: "income",
      width: 100,
      render: (value) => (
        <div>
          {Number(value) > 0 ? (
            <span className="text-[#58BD7D]">
              <CountUp end={Number(value)} decimals={0} prefix="+" suffix="%" />
            </span>
          ) : (
            <span className="text-[#FF6838]">
              <CountUp end={Number(value)} decimals={0} prefix="-" suffix="%" />
            </span>
          )}
        </div>
      ),
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
          {/* <WrapperButton click={() => setItem(2)} isActive={activeItem === 2}>
            Fixed income
          </WrapperButton>
          <WrapperButton click={() => setItem(3)} isActive={activeItem === 3}>
            RWA Funds
          </WrapperButton> */}
        </div>

        <div className="self-end md:self-auto flex items-center text-greyblack text-sm">
          <span className="mr-2">{t("Until") + " 01/" + day}</span>
          <WrapperImg src="/assets/reflush.png" width={14} />
        </div>
      </div>
      <Table columns={columns} dataSource={assets} pagination={false} className="w-full" scroll={{ x: 800 }} rowKey={(record) => record.id} />
    </div>
  );
};
export default TodoListAssets;
