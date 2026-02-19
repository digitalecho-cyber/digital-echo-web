const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { context } = req.body;

    // အဆင့်မြှင့်ထားသော Executive Instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
[STRICT PROTOCOL: DIGITAL ECHO EXECUTIVE CONSULTANT]
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
`,
    });

    const result = await model.generateContent(context);
    const response = await result.response;

    return res.status(200).json({ analysis: response.text() });
  } catch (err) {
    console.error("API_ERROR:", err.message);
    return res
      .status(500)
      .json({ error: "Executive Core Interrupted. Check API Key and Quota." });
  }
};
