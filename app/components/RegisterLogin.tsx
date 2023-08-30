import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import styles from "./registerlogin.module.scss";
import axios from "axios";

type RegisterLoginPageProps = {
  onLoginSuccess: () => void;
};

export function RegisterLoginPage({ onLoginSuccess }: RegisterLoginPageProps) {
  const navigate = useNavigate();
  const access = useAccessStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const phoneRegex = /^1[3-9]\d{9}$/;

  const handleGetCode = () => {
    if (!phoneRegex.test(phoneNumber)) {
      alert("请输入有效的手机号码");
      return;
    }

    /*axios.post('/api/sendCode', { phoneNumber }).then((response) => {
      console.log(response.data);
    });*/

    const randomCode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    console.log(randomCode);
    alert(randomCode);
  };

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

    onLoginSuccess();
    navigate(Path.Home);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder={"手机号"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.codeField}>
          <input
            className={styles.codeInput}
            type="text"
            placeholder={"验证码"}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className={styles.getCodeButton} onClick={handleGetCode}>
            获取验证码
          </button>
        </div>
        <button className={styles.submitButton} onClick={handleRegisterLogin}>
          注册/登录
        </button>
      </div>
    </div>
  );
}
