const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
    const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
        {
        contents: [{ parts: [{ text: `Generate an image based on: ${prompt}` }] }]
        }
    );

    const image = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No image generated';
    res.json({ image });
    } catch (error) {
    console.error((error.response && error.response.data) || error.message);
    res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.listen(5000, '0.0.0.0', () => {
    console.log(`Backend running on http://0.0.0.0:5000`);
});