const {
    readFile
} = require('fs-extra');
const {
    openaiConnection
} = require('./network/openaiConnection');
const {
    validFashionLineRegex
} = require('./regex/validFashionLineRegex');

async function getDressIdeas(descriptorWord) {
    if (!descriptorWord || descriptorWord === "") {
        throw new Error("Description cannot be blank!");
    }
    const txt = (await readFile('seededTxt.txt', 'utf8')).replace("$DESCRIPTION", descriptorWord);

    let attempt = 0;
    let finalResult;
    do {
        const completion = await openaiConnection.complete({
            engine: 'davinci',
            prompt: txt,
            maxTokens: 80,
            temperature: 0.9,
            topP: 1,
            presence_penalty: 0,
            frequency_penalty: 0,
            best_of: 1,
            n: 1,
            stream: false
        });
        const response = completion.data.choices[0];
        const transientRes = response.text.match(validFashionLineRegex);
        if (transientRes) {
            const results = transientRes.map(s => s.replace("- ", ""));
            return results;
        }
        attempt++;
    } while (!finalResult && attempt < 2)
    throw new Error("Could not convince bot to give good ideas, sorry!")
}
exports.getDressIdeas = getDressIdeas;

if (module.parent === null) {
    (async () => {
        console.log(await getDressIdeas("fantastic"))
    })()
}