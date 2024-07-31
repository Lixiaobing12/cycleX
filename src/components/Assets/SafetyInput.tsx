import { Input } from "antd";
import "./SafetyInputStyle.css";
import { useEffect, useRef, useState } from "react";
import { OTPRef } from "antd/es/input/OTP";

const SafetyInput: React.FC<{
  onSave: Function;
}> = ({ onSave }) => {
  const [code, setCode] = useState("");
  const [number] = useState([0, 1, 2, 3, 4, 5]);
  const otpRef = useRef<OTPRef>(null);
  const onChange = (text: string) => {
    setCode(text);
    onSave(text);
  };

  useEffect(() => {
    otpRef.current?.focus();
  }, [])
  return (
    <div className="w-full codeInput">
      <Input.OTP
        style={{ width: "100%", fontSize: "2rem" }}
        onChange={onChange}
        value={code}
        mask="·"
        ref={otpRef}
      />
    </div>
  );
};

export default SafetyInput;
