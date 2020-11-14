const OpenAI = require("openai-api");

const openaiConnection = new OpenAI(process.env.OPENAI_SECRET_KEY);
exports.openaiConnection = openaiConnection;
