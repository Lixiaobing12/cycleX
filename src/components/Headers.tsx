import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Drawer } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ticking = useRef<boolean>(false);
  const [headStyle, setStyle] = useState<React.CSSProperties>({
    position: "relative",
  });
  const [hash, setHash] = useState<string>("/");
  useEffect(() => {
    function scrollEvent() {
      const lastKnownScrollPosition = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition === 0) {
            setStyle({
              position: "relative",
            });
          } else if (headStyle?.position === "relative") {
            setStyle({
              position: "fixed",
            });
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    }
    document.addEventListener("scroll", scrollEvent);

    const path = window.location.pathname;
    setHash(path);

    return () => {
      document.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  useEffect(() => {
    setHash(location.pathname);
  }, [location]);
  return (
    <>
      <div className="w-full h-10">
        <div
          className={`flex p-4 left-0 right-0 z-10 border-b-2 ${
            headStyle.position !== "relative" && "glass"
          }`}
          style={headStyle}
        >
          <div
            className="text-black font-bold text-2xl flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/assets/logos.png" className="w-10" alt="" />
            <span className="ml-2">PoWPepe</span>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <span
              className={`head-item-mb text-2xl flex mx-4 ${
                hash === "/" && "head-item-active"
              }`}
              onClick={() => navigate("/")}
            >
              <img src="/assets/homt.svg" width={25} alt="" />
              Home
            </span>
            <span
              className={`head-item-mb text-2xl flex mx-4 ${
                hash === "/inscription" && "head-item-active"
              }`}
              onClick={() => navigate("/inscription")}
            >
              <img src="/assets/pen.svg" width={25} alt="" />
              Inscribe
            </span>
            <span
              className={`head-item-mb text-2xl flex mx-4 ${
                hash === "/bsc20" && "head-item-active"
              }`}
              onClick={() => navigate("/bsc20")}
            >
              <img src="/assets/code.svg" width={25} alt="" />
              BSC-20
            </span>
            <span
              className={`head-item-mb text-2xl flex mx-4 ${
                hash === "/marketplace" && "head-item-active"
              }`}
              onClick={() => navigate("/marketplace")}
            >
              <img src="/assets/shop.svg" width={25} alt="" />
              Marketplace
            </span>
            <ConnectButton accountStatus="avatar" />
            <span className="head-item-pc" onClick={() => setOpen(true)}>
              <img src="/assets/menu.svg" className="w-10" />
            </span>
          </div>
        </div>
      </div>
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
      >
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default HeaderComponent;
