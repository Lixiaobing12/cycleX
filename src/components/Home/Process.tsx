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
    <div className="w-full overflow-auto text-black">
      <div className="min-w-[800px] flex items-center justify-center gap-6">
        {cards.map((item, index) => (
          <div key={index} className="flex items-center relative min-w-[180px] h-[250px]">
            <div className="flex flex-col border rounded-box items-center gap-4 border-transblack w-full h-full justify-around py-4">
              <img src={item.avant} width={100} />
              <div className="flex flex-col gap-4 items-center">
                <div className="rounded border py-1 px-2 border-transblack text-md w-fit">{item.name}</div>
                <h2 className="text-base  font-bold font-whalebold">{item.desc}</h2>
              </div>
            </div>
            {index < 3 && <img src="/assets/process_right.png" className="w-10 right-[-18%] absolute md:right-[-17%] z-10" />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Process;
