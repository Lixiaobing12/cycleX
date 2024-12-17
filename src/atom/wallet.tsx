import { atom } from "jotai";

export const walletTypeAtom = atom<"Ethereum" | "BEVM" | "Merlin" | "Zetrix" | "Arb" | 'Bsc'| undefined>();
