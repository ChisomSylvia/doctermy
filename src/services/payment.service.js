import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const paystackBaseUrl = "https://api.paystack.co";

export const initializePaystackPayment = async ({
  email,
  amount,
  metaData,
  callBack = "https://your-callback-url.com/verify-payment",
}) => {
  const url = `${paystackBaseUrl}/transaction/initialize`;

  const headers = {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    currency: "NGN",
    metadata: metaData,
    callback_url: callBack,
  };
  console.log(data);
  

  try {
    // Step 1: Initialize transaction with Paystack
    const paystackResponse = await axios.post(url, data, { headers });

    const paystackData = paystackResponse.data.data;

    return {
      success: true,
      message: "Payment initiated successfully",
      authorizationUrl: paystackData.authorization_url,
      reference: paystackData.reference,
    };
  } catch (error) {
     const message = error.response.data.message;
    return {
      success: false,
      message,
    };
  }
};
