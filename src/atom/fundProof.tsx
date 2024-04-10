import { atom } from "jotai";

export type FundProofType = {
    CreatedAt: string;
    DeletedAt: null | string;
    ID: number;
    MarketValue: number;
    Name: string;
    Rate: number;
    TypeSort: string;
    UpdatedAt: string;
    Url: string;
    color: string;
    NameDct?: {
        key: string;
        en: string;
        zh: string;
    };
    TypeSortDct?: {
        key: string;
        en: string;
        zh: string;
    }
};
export const fundProofs_atom = atom<FundProofType[]>([]);
