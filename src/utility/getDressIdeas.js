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
    const results = response.text.match(validFashionLineRegex).map(s => s.replace("- ", ""));
    return results;
}
exports.getDressIdeas = getDressIdeas;

if (module.parent === null) {
    (async () => {
        console.log(await getDressIdeas("fantastic"))
    })()
}