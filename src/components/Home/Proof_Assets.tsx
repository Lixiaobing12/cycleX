import { Table as ATable, Statistic, TableProps } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FundProofType, fundProofs_atom } from "../../atom/fundProof";
import { useTranslateLocalStorage } from "../../hooks/localStorage";
import { scientific } from "../../utils/BigNumberToString";
import { request } from "../../utils/request";
import WrapperImg from "../Common/Img";
import CountUp from "react-countup";
import moment from "moment";

const Table = () => {
  const { t, i18n } = useTranslation();
  const [proofs] = useAtom(fundProofs_atom);
  const columns: TableProps<FundProofType>["columns"] = [
    {
      title: <span className="leading-5">{t("Current assets/Size")}</span>,
      dataIndex: "market_value",
      key: "market_value",
      render: (value) => {
        const marketValue = scientific(value);
        const uint = marketValue?.slice(-1);
        const num = marketValue?.slice(0, marketValue.length - 1);
        return <CountUp end={Number(num)} decimals={0} prefix="$" suffix={uint} />
      }
    },
    {
      title: <span className="leading-5">{t("Category/Type")}</span>,
      dataIndex: "type_sort",
      key: "type_sort",
      render: (value, row) => <span className="capitalize">{i18n.language === "en" ? row.TypeSortDct?.en : row.TypeSortDct?.zh}</span>,
    },
    {
      title: <span className="leading-5">{t("Report/Reserve details")}</span>,
      dataIndex: "name",
      key: "name",
      render: (value, row) => (
        <div className="flex items-center">
          <span className="flex-1 capitalize">{i18n.language === "en" ? row.NameDct?.en : row.NameDct?.zh}</span>
          {/* <div className="w-6 h-6">
            <img src="/assets/pdf.png" className="w-[20px] h-[20px] absolute" />
          </div> */}
        </div>
      ),
    },
  ];
  return <ATable columns={columns} dataSource={proofs} pagination={false} className="w-full" rowKey={(record) => record.ID} />;
};
const colors = ["#5F79FF", "#B9CAFF", "#141537", "#E2E5EB"];

const ProofAssets = () => {
  const [proofs, setProofs] = useAtom(fundProofs_atom);
  const { handleTranslate } = useTranslateLocalStorage();
  const { t, i18n } = useTranslation();
  const day = moment().format("MM/YYYY")
  useEffect(() => {
    request.post("/api/api/fundProof/list",{
      Page:1,
      Size:10
    }).then(
      async ({
        data,
      }: {
        data: {
          data: any[];
        };
      }) => {
        data.data.forEach((item: any, index: number) => {
          item.color = index < colors.length ? colors[index] : colors[0];
        });
        for (let index = 0; index < data.data.length; index++) {
          data.data[index].color = index < colors.length ? colors[index] : colors[0];
          data.data[index].NameDct = {
            key: data.data[index].name,
            zh: data.data[index].name,
            en: await handleTranslate(data.data[index].name),
          };
          data.data[index].TypeSortDct = {
            key: data.data[index].type_sort,
            zh: data.data[index].type_sort,
            en: await handleTranslate(data.data[index].type_sort),
          };
        }
        setProofs(data.data);
      }
    );
  }, []);
  return (
    <div className="flex flex-col md:flex-row w-full items-center gap-10 text-black">
      <div className="flex-1 flex flex-col">
        <div className="flex items-end ">
          <span className="text-2xl mr-4 leading-5">{t("Reserve detail")}</span>
          <div className="flex items-center">
            <span className="mr-2 text-sm leading-5">{t('Until') + ' 01/' + day}</span>
            <WrapperImg src="/assets/reflush.png" width={14} />
          </div>
        </div>
        <div className=" w-full flex flex-col my-10">
          <div className="flex w-full rounded-full h-6 overflow-hidden">
            {proofs.map((item, index) => (
              <span style={{ width: item.rate + "%", background: item.color }} className="h-full" key={item.id}></span>
            ))}
          </div>
          <div className="text-greyblack text-sm mt-4">{t("(For real world assets) including public companies, Treasury bonds, money market funds, repo and alternative investments")}</div>
        </div>
        <div className="w-full grid grid-cols-2 gap-8">
          {proofs.map((item, index) => (
            <div className="w-full flex items-center" key={item.name}>
              <div style={{ background: item.color }} className="w-6 h-6 rounded-md"></div>
              <span className="mx-4">
                <CountUp end={Number(item.rate)} decimals={0} suffix="%" /></span>
              <span className="text-sm capitalize">{i18n.language === "en" ? item.NameDct?.en : item.NameDct?.zh}</span>
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
