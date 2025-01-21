const axios = require('axios');
const dotenv = require('dotenv');
const generateToken = require('./generateToken');
const base64 = require('base-64');
dotenv.config();

async function initiateSTKPush(amount, phone) {
  const accessToken = await generateToken();
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // YYYYMMDDHHMMSS
  const password = base64.encode(`${process.env.SHORTCODE}${process.env.PASSKEY}${timestamp}`);
  
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const data = {
    BusinessShortCode: process.env.SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone, 
    PartyB: process.env.SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: "Order123",
    TransactionDesc: "E-Commerce Purchase",
  };

  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("STK Push error:", error.response.data);
    throw error;
  }
}

module.exports = initiateSTKPush;
