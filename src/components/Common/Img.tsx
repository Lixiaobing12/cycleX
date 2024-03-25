import React from "react";

type Img_Type = {
  src: string;
  onClick?: (e: any) => any;
  width?: number;
  className?: string;
};
const WrapperImg: React.FC<Img_Type> = ({ width = 20, src, onClick = () => {}, className }) => {
  return <img src={src} onClick={onClick} className={`cursor-pointer hover:scale-105 ${className}`} width={width} />;
};
export default WrapperImg;
