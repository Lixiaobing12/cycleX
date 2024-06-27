import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const useLocalStorage = () => {
  const [storageValue, setStorageValue] = useState<
    | undefined
    | {
      token: string;
      nickName: string;
    }
  >();

  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = localStorage.getItem("token");
      if (JSON.parse(accessToken!) !== null) {
        setStorageValue(JSON.parse(accessToken!));
      } else {
        setStorageValue(undefined);
      }
    };

    window.addEventListener("localstorage_save", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("localstorage_save", handleStorageChange);
    };
  }, []);

  return useMemo(() => storageValue, [storageValue]);
};

export default useLocalStorage;

type dctT = {
  src: string;
  dct: string;
};
export const useTranslateLocalStorage = () => {
  return {
    handleTranslate: async (str: string) => {
      const tls = window.localStorage.getItem("translate") as string;
      const dcts = JSON.parse(tls) as dctT[] ?? [];
      for (let { src, dct } of dcts) {
        if (src === str) return dct;
        if (dct === str) return src;
      };
      const data = await useTranslateLocalStorage().set(str);
      return data;
    },
    set: async (str: string) => {
      const { data } = await axios.post("/translate/ts",{
        p:str
      });
      if (data.code === 200) {
        const tls = window.localStorage.getItem("translate") as string;
        const dcts = JSON.parse(tls) as dctT[] ?? [];
        dcts.push({
          src: str,
          dct: data.data
        });
        window.localStorage.setItem("translate", JSON.stringify(dcts));
        return data.data;
      }
    }
  }
}