const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "db21e45a860f62040b6016e8e5de54c2a4e1c5fdfaa0a13f3dbd4f48e9f3f48c", // Stable Diffusion 1.5
        input: { prompt: prompt }
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const prediction = response.data;
    res.json({ image: prediction.urls.get });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on http:54.90.83.127:${PORT}`);
});
