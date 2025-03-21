import { OpenAI } from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const processFileWithAI = async (filePath, prompt) => {
    const fileData = fs.readFileSync(`.${filePath}`, "utf-8");

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: `${prompt}\n\n${fileData}` }],
    });

    return response.choices[0].message.content;
};

export { processFileWithAI };
