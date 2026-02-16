const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/form', async (req, res) => {
    const { name, start, destinations, numbers, emails, dates } = req.body;
    
    try {
        const response = await fetch('/.netlify/functions/sendEmail', {
            method: 'POST',
            body: JSON.stringify({ name, start, destinations, numbers, emails,dates, messages }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        res.status(response.status).json(result);
    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is starting on ${port}`);
});
