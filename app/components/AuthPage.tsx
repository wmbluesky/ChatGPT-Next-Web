import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";
import BotIcon from "../icons/bot.svg";
import { getClientConfig } from "../config/client";
import { RegisterLoginPage } from "./RegisterLogin";

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    } else if (!access.accessCode) {
      navigate("./RegisterLogin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!access.accessCode ? (
        <RegisterLoginPage />
      ) : (
        <div>
          <div>
            <BotIcon />
          </div>
          <div>{Locale.Auth.Title}</div>
          navigate(Path.Home);
        </div>
      )}
    </div>
  );
}
