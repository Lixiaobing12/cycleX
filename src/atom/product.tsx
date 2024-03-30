import { atom } from "jotai";
import { fundProductApiType } from "../types/fundProduct";

export const product_info = atom<fundProductApiType | null>(null);
