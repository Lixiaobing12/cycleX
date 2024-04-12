import { useTranslation } from "react-i18next";

const Process = () => {
  const { t } = useTranslation();
  const cards = [
    { avant: "/assets/process1.png", name: t("Assets"), desc: t("Asset SPV"), id: 0 },
    { avant: "/assets/process2.png", name: t("Release"), desc: t("Fund token"), id: 1 },
    { avant: "/assets/process3.png", name: t("Platform"), desc: t("Redemption /C2C"), id: 2 },
    { avant: "/assets/process4.png", name: t("Users"), desc: t("Gain income"), id: 3 },
  ];
  return (
    <div className="pl-[102%] sm:pl-[20%] md:pl-0 w-full flex items-center overflow-auto text-black justify-center gap-6 hidden-scroll">
      {cards.map((item, index) => (
        <div key={index} className="flex items-center relative min-w-[180px]">
          <div className="flex flex-col p-10 border rounded-box items-center gap-4 border-transblack">
            <img src={item.avant} width={150} />
            <div className="rounded border px-6 py-1  border-transblack">{item.name}</div>
            <h2 className="text-lg  font-bold font-whalebold">{item.desc}</h2>
          </div>
          {index < 3 && <img src="/assets/process_right.png" className="w-10 right-[-20%] absolute md:right-[-15%] z-10" />}
        </div>
      ))}
    </div>
  );
};
export default Process;
