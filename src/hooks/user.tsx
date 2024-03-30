import { useEffect, useMemo, useState } from "react";
import { UserInfoType, WalletInfoType } from "../types/user";
import { request } from "../utils/request";
import useLocalStorage from "./localStorage";

const useAccounts = () => {
  const accessToken = useLocalStorage();
  const [users, setUsersInfo] = useState<UserInfoType>();
  const [isSign, setSign] = useState(false);
  const [walletsInfo, setWalletsInfo] = useState<WalletInfoType>();
  useEffect(() => {
    if (accessToken) {
      request.post("/api/api/my/getMyInfo").then(({ data }) => {
        setUsersInfo(data.data);
      });
      request.post("/api/api/my/getWallet").then(({ data }) => {
        setWalletsInfo(data.data);
      });
      setSign(true);
    }
  }, [accessToken]);

  return useMemo<[boolean, UserInfoType | undefined, WalletInfoType | undefined]>(() => [isSign, users, walletsInfo], [isSign, users, walletsInfo]);
};

export default useAccounts;
