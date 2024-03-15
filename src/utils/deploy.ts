import { ethers } from "ethers";
import { abi, bytecode } from "./EIP1400.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const deploy = async () => {
  const signer = provider.getSigner();
  const account = await signer.getAddress();
  const constract = new ethers.ContractFactory(abi, bytecode, signer);
  const tx = await constract.deploy(
    "T-Cycle",
    "T-Cycle",
    1,
    [account],
    account,
    true
  );
};
