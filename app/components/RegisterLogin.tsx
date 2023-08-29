import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";

export function RegisterLoginPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleRegisterLogin = () => {
    // 在这里处理注册/登录逻辑
    // 根据你的需求，可以调用API发送短信验证码、验证验证码、注册/登录用户等操作
    // 注册/登录成功后，可以更新access状态，并导航到Home页面
    access.updateCode(verificationCode);
    navigate(Path.Home);
  };

  return (
    <div>
      <h1>{"注册/登录页面"}</h1>
      <input
        type="text"
        placeholder={"手机号"}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <input
        type="text"
        placeholder={"验证码"}
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      />
      <button onClick={handleRegisterLogin}>{"注册/登录"}</button>
    </div>
  );
}
