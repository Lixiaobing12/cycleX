import { atom } from "jotai";
import { fundProductApiType } from "../types/fundProduct";

export const products_atom = atom<fundProductApiType[]>([]);
