const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // POST request မဟုတ်ရင် ပယ်ချမယ်
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { context } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
[STRICT PROTOCOL: DIGITAL ECHO EXECUTIVE CORE]
YOU ARE THE AI CEO. MISSION: ANALYZE CLIENT BUSINESS AND GENERATE A HIGH-VALUE SERVICE PROPOSAL.

YOUR RESPONSE MUST INCLUDE THESE 3 SECTIONS:

1. CORE ANALYSIS: Identify 3-4 major revenue leaks or operational bottlenecks.

2. DIGITAL ECHO SOLUTIONS (THE OFFERS):
   For every leak identified, you MUST offer a specific production-ready service from our catalog:
   - CUSTOM DEVELOPMENT: High-performance Websites, Mobile Apps, and Enterprise Admin Dashboards.
   - AI AUTOMATION: Autonomous Customer Service Bots, Lead Generation Swarms, and Auto-Booking Systems.
   - MANAGEMENT: Full Social Media Management and AI-driven Content Strategy.
   - INFRASTRUCTURE: Zero-Trust Security setup and Custom CRM/ERP solutions.

3. STRATEGIC ROADMAP: A clear Phase 1, 2, and 3 implementation plan with a "Security-First" (Mr. Robot) approach.

TONE: Professional, Direct, High-Authority. We don't just "suggest"; we "architect and build".
`,
    });

    const result = await model.generateContent(context);
    const response = await result.response;

    // Response ပြန်ပို့မယ်
    return res.status(200).json({ analysis: response.text() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
