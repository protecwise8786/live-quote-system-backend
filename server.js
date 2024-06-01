const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const config = {
    COMPULIFEAUTHORIZATION: process.env.COMPULIFEAUTHORIZATION
};

app.post('/api/get-quote', async (req, res) => {
    const {
        birthDate,
        gender,
        health,
        coverage,
        zipCode,
        smoker,
        compRating,
        newCategory,
        language,
        modeUsed,
        sortOverride1
    } = req.body;
    const [year, month, day] = birthDate.split('-');

    const requestPayload = {
        COMPULIFEAUTHORIZATIONID: config.COMPULIFEAUTHORIZATION,
        REMOTE_IP: req.ip,
        BirthMonth: month,
        Birthday: day,
        BirthYear: year,
        Sex: gender,
        Health: health,
        FaceAmount: coverage,
        ZipCode: zipCode,
        Smoker: smoker,
        CompRating: compRating,
        NewCategory: newCategory,
        Language: language,
        ModeUsed: modeUsed,
        SortOverride1: sortOverride1
    };

    try {
        const response = await axios.post('https://www.compulifeapi.com/api/request', requestPayload);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching quotes');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
