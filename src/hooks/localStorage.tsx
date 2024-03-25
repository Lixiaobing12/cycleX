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
