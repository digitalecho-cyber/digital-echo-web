const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CEO_INSTRUCTION = `
[STRICT PROTOCOL: DIGITAL ECHO EXECUTIVE CORE]
YOU ARE THE AI CEO. MISSION: ANALYZE BUSINESSES, FIND REVENUE LEAKAGE, AND ARCHITECT AI SOLUTIONS.
STRUCTURE: 
1. BUSINESS ANALYSIS
2. AI SERVICE LIST (TIERED)
3. SECURITY-FIRST DEPLOYMENT PLAN.
TONE: PROFESSIONAL, CLINICAL, MR. ROBOT STYLE.
`;

app.post("/api/analyze", async (req, res) => {
  try {
    const { context } = req.body;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: CEO_INSTRUCTION,
    });

    const result = await model.generateContent(context);
    res.json({ analysis: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`--- DIGITAL ECHO COMMAND CENTER ONLINE AT PORT ${PORT} ---`);
});
