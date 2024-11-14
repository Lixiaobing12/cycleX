import { CloseCircleOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { modalContext } from "../../App";
import useLocalStorage from "../../hooks/localStorage";
import useAccounts from "../../hooks/user";
import { request } from "../../utils/request";
import moment from "moment";

let CloseCircleOutlineds = CloseCircleOutlined as any;
let opening = false;
const DrawerGetBlindBox = () => {
  const location = useLocation();
  const [isSign, account] = useAccounts();
  const [modal] = useAtom(modalContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const accessToken = useLocalStorage();

  const open = () => {
    opening = true;
    const context: any = modal?.info({
      closable: {
        closeIcon: (
          <Icon size={25}>
            <CloseCircleOutlineds />
          </Icon>
        ),
      },
      icon: <></>,
      onCancel: () => {
        context.destroy();
        opening = false;
      },
      zIndex: 100,
      title: (
        <div className="text-center">
          <h1 className="w-full py-2 text-center text-xl">{t("Congratulations！")}</h1>
          <div className="font-normal">{t("You have drawn a lucky box")}</div>
        </div>
      ),
      content: (
        <div className="bg-white rounded-box flex flex-col justify-center items-center">
          <img src="/assets/box.png" width={160} alt="" className="animate__animated animate__pulse animate__infinite" />
          <button
            className="btn btn-wide m-auto mt-4 bg-black text-white hover:bg-black hover:scale-105"
            onClick={() => {
              if (!accessToken) {
                opening = false;
                context.destroy();
                return navigate("/login");
              }
              context.destroy();
              navigate("/blindBox");
            }}>
            Open
          </button>
        </div>
      ),
      centered: true,
      footer: null,
      width: "375px",
    });
  };
  useEffect(() => {
    const localStorage = window.localStorage;
    const opened = localStorage.getItem("opened") as any;

    let opening = false;
    if (opened) {
      if (opening) return;
      else opening = true;
      const types = JSON.parse(opened);
      for (const t of types) {
        if (t.type === "login" && moment().diff(moment(t.date), "d") !== 0) {
          open();
          localStorage.setItem("opened", JSON.stringify([{ type: "login", date: moment().format() }]));
        }
      }
    } else {
      open();
      localStorage.setItem("opened", JSON.stringify([{ type: "login", date: moment().format() }]));
    }
  }, [account]);

  return <></>;
};
export default DrawerGetBlindBox;
