import { atom } from "jotai";
import { UserInfoType } from "../types/user";

export const userInfo_atom = atom<UserInfoType | null>(null);