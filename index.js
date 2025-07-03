const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('✅ AI Image Generator Backend is running.');
});

// POST /generate route
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "7de2ea26c616ac41f9178aa9b1ebdc2b3f8b13893d767b98c4cf60e220d4b5e3", // ✅ Stable Diffusion working version
        input: { prompt }
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
    console.error('❌ Error generating image:', error.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on http://54.90.83.127:${PORT}`);
});
