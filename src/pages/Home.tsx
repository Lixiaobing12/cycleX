import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { deploy } from "../utils/deploy";

export default function Home() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openBook = () => {
    window.open("https://powpepe.gitbook.io/powpepe/", "_blank");
  };
  const wait = () => {
    api.open({
      message: "Warning",
      description: "Coming soon!",
      duration: 2,
    });
  };

  return (
    <div className="pt-4">
      {contextHolder}
      <div className="relative">
        <img
          src="/assets/leftTop.png"
          className="absolute w-[20vw] min-w-[180px] top-0 z-1"
          alt=""
        />
        <img
          src="/assets/rightTop.png"
          className="absolute w-[20vw] min-w-[180px] right-0 top-0"
          alt=""
        />
      </div>
      <div className="flex flex-col pt-36 items-center">
        <img src="/assets/logo.png" className="w-full max-w-[600px]" alt="" />
        <img src="/assets/title.png" className="w-3/5 min-w-[350px]" alt="" />

        <div className="join join-vertical gap-2 my-4">
          <div className="btn btn-mine btn-wide" onClick={deploy}>
            部署合约
          </div>
          <div
            className="btn btn-dom btn-wide"
            onClick={() => navigate("/inscription")}
          >
            Inscription
          </div>
          {/* <div className="btn btn-dom btn-wide" onClick={wait}>
            Deploy
          </div> */}
          <div className="btn btn-dom btn-wide" onClick={openBook}>
            Documentation
          </div>
        </div>
        <div className="relative h-96 flex items-center justify-center">
          <img
            src="/assets/realfair.png"
            className="w-[98vw] max-w-[1000px] h-36"
            alt=""
          />
          <img
            src="/assets/mine.png"
            className="absolute max-w-[260px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
