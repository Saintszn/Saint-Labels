const express = require('express');
const router = express.Router();

router.post('/callback', (req, res) => {
  console.log("Callback Data Received:", req.body);

  // Save the payment response to the database (not implemented here)
  res.status(200).send("Callback Received");
});

module.exports = router;
