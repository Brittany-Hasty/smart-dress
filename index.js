const express = require('express');
const { getDressIdeas } = require('./src/utility/getDressIdeas');
const port = process.env.PORT || 3000;
const app = express();
const { urlWordExtractorRegex } = require('./src/utility/regex/urlWordExtractor');

app.get('/outfits/*', async (req, res) => {
    let word = urlWordExtractorRegex.exec(req.originalUrl)[1];
    if (!word || word === ""){
       word = "fantastic"; 
    }
    const dressIdeas = await getDressIdeas(word);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dressIdeas, null, 2));
})

app.listen(port);