const axios = require('axios');

async function generateToken() {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString('base64');

  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    console.log('Access Token Response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating token:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = generateToken;
