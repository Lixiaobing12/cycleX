import { Divider } from "antd";
import WrapperImg from "../Common/Img";

const Audit = () => {
  const audits = [
    { name: "CUSDA", title: "代币化基金", value: "$2,000,000", time: "2024/01" },
    { name: "CUSDA", title: "代币化基金", value: "$2,000,000", time: "2024/01" },
    { name: "CUSDA", title: "代币化基金", value: "$2,000,000", time: "2024/01" },
  ];
  return (
    <div className="w-full text-black md:p-8">
      <h1 className="font-bold text-3xl mb-6">审计及储备证明</h1>
      <p className="py-4">
        作为我们持续致力于透明度的一部分，CycleX每季度都会定期发表鉴证意见。为了更方便地访问，我们在这里提供所有历史和最新的观点。CycleX的意见和基础报告明确无误地表明，所有代币基金均得到储备金的充分支持，并提供了这些储备资产的全面细分。
      </p>
      <Divider />
      <div className="w-full gap-4 flex flex-col mt-10">
        {audits.map((item, index) => (
          <div key={index}>
            <div className="flex gap-10 items-center" key={index}>
              <span className="font-bold">{item.name}</span>
              <span>{item.title}</span>
              <span>{item.value}</span>
              <div className="flex gap-2">
                <span>{item.time}</span>
                <WrapperImg src="/assets/pdf.png" width={20}/>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Audit;
