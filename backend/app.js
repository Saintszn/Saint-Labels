const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const initiateSTKPush = require('./stkPush');
const callbackHandler = require('./callbackHandler');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/pay', async (req, res) => {
  const { amount, phone } = req.body;
  
  try {
    const response = await initiateSTKPush(amount, phone);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed" });
  }
});

app.use('/api/callback', callbackHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
