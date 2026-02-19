require("dotenv").config();

async function runCEOStrategicAnalysis(businessData) {
  console.log("--- 🏢 DIGITAL ECHO HQ: CEO STRATEGIC ANALYSIS STARTING ---");

  const API_KEY = process.env.GEMINI_API_KEY;
  // Direct Endpoint URL
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are the Lead Business Analyst of 'Digital Echo', an elite AI Agency.
                Analyze this business: ${businessData}
                Structure:
                1. BUSINESS VULNERABILITIES
                2. AI ECHO SOLUTIONS
                3. SECURITY PROTOCOL (Mr. Robot style)
                Tone: Professional and high-level.`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      console.error("--- ⚠️ API ERROR ---", data.error.message);
      return;
    }

    const report = data.candidates[0].content.parts[0].text;
    console.log("\n--- 📄 ANALYSIS REPORT FROM ANALYST AGENT ---");
    console.log(report);
    console.log("\n--- 🏢 ANALYSIS COMPLETE. READY FOR CLIENT OUTREACH ---");
  } catch (error) {
    console.error("--- ⚠️ NETWORK ERROR ---", error.message);
  }
}

const targetBusiness =
  "A real estate agency with 50+ listings but only 2 office staff. They take 24 hours to respond to email leads.";
runCEOStrategicAnalysis(targetBusiness);
