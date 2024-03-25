import { Spin } from "antd";

const Loader = ({ spinning = true }) => {
  return <Spin spinning={spinning} indicator={<img src="/assets/loader.png" className="rotating-image" />} />;
};
export default Loader;
