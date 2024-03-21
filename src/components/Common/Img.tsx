import React from "react";

type Img_Type = {
  src: string;
  click?: () => void;
  width?: number;
  className?: string;
};
const WrapperImg: React.FC<Img_Type> = ({ width = 20, src, click = () => {}, className }) => {
  return <img src={src} onClick={click} className={`cursor-pointer hover:scale-105 ${className}`} width={width} />;
};
export default WrapperImg;
