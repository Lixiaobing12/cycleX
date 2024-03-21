import React, { ReactNode } from "react";

type B_Type = {
  isActive: boolean;
  children: ReactNode;
  click?: () => void;
};
const WrapperButton: React.FC<B_Type> = ({ isActive, children, click = () => {} }) => {
  return (
    <button onClick={click} className={`btn btn-sm rounded-full hover:text-white ${isActive ? "bg-black text-white border-0" : "bg-white text-greyblack border border-slate-800"}`}>
      {children}
    </button>
  );
};
export default WrapperButton;
