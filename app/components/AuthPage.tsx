import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";
import BotIcon from "../icons/bot.svg";
import { getClientConfig } from "../config/client";
import { RegisterLoginPage } from "./RegisterLogin";

type AuthPageProps = {
  onLoginSuccess: () => void;
};

export function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const navigate = useNavigate();
  const access = useAccessStore();

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate("./RegisterLogin");
    } else if (!access.accessCode) {
      navigate("./RegisterLogin");
    }
  }, []);

  const handleLoginSuccess = () => {
    onLoginSuccess();
    navigate(Path.Home);
  };

  return (
    <div>
      {!access.accessCode ? (
        <RegisterLoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <div>
            <BotIcon />
          </div>
          <div>{Locale.Auth.Title}</div>
          <button onClick={handleLoginSuccess}>登录</button>
        </div>
      )}
    </div>
  );
}
