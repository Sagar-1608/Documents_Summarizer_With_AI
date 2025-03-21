import { processFileWithAI } from "../services/aiService.js";

const analyzeFile = async (req, res) => {
    const { filePath, prompt } = req.body;
    if (!filePath || !prompt) return res.status(400).json({ message: "Missing parameters" });

    try {
        const output = await processFileWithAI(filePath, prompt);
        res.json({ output });
    } catch (error) {
        res.status(500).json({ message: "AI processing failed", error: error.message });
    }
};

export { analyzeFile };
