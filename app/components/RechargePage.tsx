import React, { useState } from "react";
import styles from "./recharge.module.scss";
import axios from "axios";

const RechargePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleAmountSelection = (amount: null | number) => {
    setSelectedAmount(amount);
  };

  const handlePaymentConfirmation = async () => {
    if (!selectedAmount) return;

    try {
      const response = await axios.post("/api/wechat_pay", {
        amount: selectedAmount,
      });
      setQrCodeUrl(response.data.qrCodeUrl);
      setShowQRCode(true);
    } catch (error) {
      console.error("Failed to process payment", error);
    }
  };

  return (
    <div className={styles["recharge-container"]}>
      <h1 className={styles["recharge-title"]}>充值到个人账号</h1>
      <div className={styles["recharge-amount"]}>
        <button
          className={`${styles["recharge-amount-button"]} ${
            selectedAmount === 10 ? styles["selected"] : ""
          }`}
          onClick={() => handleAmountSelection(10)}
        >
          10元
        </button>
        <button
          className={`${styles["recharge-amount-button"]} ${
            selectedAmount === 50 ? styles["selected"] : ""
          }`}
          onClick={() => handleAmountSelection(50)}
        >
          50元
        </button>
        <button
          className={`${styles["recharge-amount-button"]} ${
            selectedAmount === 100 ? styles["selected"] : ""
          }`}
          onClick={() => handleAmountSelection(100)}
        >
          100元
        </button>
      </div>
      {showQRCode && (
        <img
          className={styles["recharge-qrcode"]}
          src="wechat-qrcode.png"
          alt="微信支付二维码"
        />
      )}
      <button
        className={styles["recharge-confirm-button"]}
        onClick={handlePaymentConfirmation}
      >
        确认支付
      </button>
    </div>
  );
};

export default RechargePage;
