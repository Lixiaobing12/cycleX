import { CloseCircleOutlined } from "@ricons/antd";
import { Icon } from "@ricons/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { modalContext } from "../../App";
import useLocalStorage from "../../hooks/localStorage";
import useAccounts from "../../hooks/user";
import { request } from "../../utils/request";

let CloseCircleOutlineds = CloseCircleOutlined as any;
const DrawerGetBlindBox = () => {
  const [isSign, account] = useAccounts();
  const [modal] = useAtom(modalContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const accessToken = useLocalStorage();

  const open = () => {
    request.post("/sapi/lottery/addNum", {
      BearerToken: "Bearer " + accessToken?.token,
      Type: "Login",
    });
    const context: any = modal?.info({
      closable: {
        closeIcon: (
          <Icon size={25}>
            <CloseCircleOutlineds />
          </Icon>
        ),
      },
      icon: <></>,
      onCancel: () => context.destroy(),
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
    if (isSign && account) {
      request
        .post("/sapi/lottery/info", {
          UserId: account?.id,
        })
        .then((res) => {
          console.log(res.data.data);
          if (!res.data.data.Login) {
            open();
          }
        });
    }
  }, [isSign, modal, account]);

  return <></>;
};
export default DrawerGetBlindBox;
