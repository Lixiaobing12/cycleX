import { Input } from "antd";
import "./SafetyInputStyle.css";
import { useState } from "react";

const SafetyInput: React.FC<{
  onSave: Function;
}> = ({ onSave }) => {
  const [code, setCode] = useState("");
  const [number] = useState([0, 1, 2, 3, 4, 5]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "");
    setCode(v);
    onSave(v);
  };

  return (
    <div className="inputBox">
      {number.map((item, index) => (
        <div className="codeItem" key={index}>
          {code[index]?.replace(/[0-9]/g, "·")}
        </div>
      ))}

      <Input.Password
        className="codeInput"
        value={code}
        maxLength={number.length}
        onChange={onChange}
        visibilityToggle={false}
        readOnly={true}
        autoComplete="new-password"
        onFocus={(e) => e.target.removeAttribute("readonly")}
        onBlur={(e) => e.target.setAttribute("readonly", "true")}
      />
    </div>
  );
};

export default SafetyInput;
