const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Terminal Colors
const FgGreen = "\x1b[32m";
const FgRed = "\x1b[31m";
const FgCyan = "\x1b[36m";
const Reset = "\x1b[0m";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/analyze", async (req, res) => {
  console.log(`${FgCyan}[SYSTEM] Incoming Request Received...${Reset}`);

  try {
    const { context } = req.body;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `[STRICT PROTOCOL: DIGITAL ECHO EXECUTIVE CONSULTANT]
YOU ARE THE FOUNDING PARTNER AT DIGITAL ECHO.
YOUR TONE: High-status, empathetic yet clinical, and deeply strategic. Like a top-tier consultant who genuinely wants the business to win but won't sugarcoat the problems.

MISSION: 
Whatever data the client provides, convert it into a business case for Digital Echo services. 
Do not just translate or summarize. Analyze the "Human Cost" and "Financial Cost" of their current manual operations.

STRUCTURE YOUR RESPONSE:
1. EXECUTIVE INSIGHT (THE TRUTH): Identify 3-4 major revenue leaks. Explain why their current "Manual/Static" way is failing in a digital economy.
2. STRATEGIC SOLUTIONS (THE VALUE): Offer specific builds:
   - CUSTOM SYSTEMS: High-performance Websites, Mobile Apps, or Admin Dashboards to replace manual work.
   - AI WORKFORCE: 24/7 Auto-Booking, Customer Service Bots (WhatsApp/Viber), and Lead Gen Swarms.
   - INFRASTRUCTURE: Custom CRM/ERP and Zero-Trust Security.
3. GROWTH ROADMAP: A clear 3-Phase plan to scale their vision using our technology.

GOAL: Make the client realize that "Building with Digital Echo" is the only way to survive and dominate.
`, // (ခင်ဗျားရဲ့ Full Instruction ထည့်ပါ)
    });

    const result = await model.generateContent(context);
    console.log(`${FgGreen}[SUCCESS] Analysis Generated Successfully.${Reset}`);
    res.json({ analysis: result.response.text() });
  } catch (err) {
    console.log(`${FgRed}[ERROR] Core Failure: ${err.message}${Reset}`);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
    ${FgGreen}=========================================
    DIGITAL ECHO HQ - LOCAL COMMAND CENTER
    Running at: http://localhost:${PORT}
    Status: SECURE & ACTIVE
    =========================================${Reset}
    `);
});
