import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { amount } = req.body;

  // 这里是模拟的微信支付请求URL，您需要替换为实际的微信支付接口URL和参数
  const wechatPayUrl = `https://api.example.com/wechat_pay?amount=${amount}`;

  try {
    const response = await axios.post(wechatPayUrl);
    const qrCodeUrl = response.data.qrCodeUrl;

    res.status(200).json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to process payment" });
  }
}
