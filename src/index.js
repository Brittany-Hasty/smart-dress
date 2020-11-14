const express = require('express');
const { getDressIdeas } = require('./utility/getDressIdeas');
const port = process.env.PORT || 3000;
const app = express();
const { urlWordExtractorRegex } = require('./utility/regex/urlWordExtractor');

app.get('/outfits/*', async (req, res) => {
    const matchResults = urlWordExtractorRegex.exec(req.originalUrl);
    if (!matchResults) {
        console.log(req);
        throw new Error("Could not extract url");
    }
    let word = matchResults[1];
    if (!word || word === ""){
       word = "fantastic"; 
    }
    const dressIdeas = await getDressIdeas(word);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dressIdeas, null, 2));
})

app.use((error, req, res, next) => {
    // Bad request error
    // console.log(req);
    res.status(400)
    res.json( /* ... */ )
})

app.listen(port);