import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { community, scores } = body;

    if (!community || !scores) {
      return NextResponse.json(
        { error: "Missing community or score data." },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY in .env.local." },
        { status: 500 }
      );
    }

    const prompt = `
You are an AI planning assistant for GridWise, an energy equity decision-support tool.

Use the community data and scores below to generate a concise action plan for utilities, municipalities, housing partners, and community organizations.

Important:
- Be honest that ArcGIS / Statistics Canada fields are city-level Census Subdivision data.
- Treat average monthly bill, program access score, building efficiency risk, outage count, and retrofit eligibility gap as prototype/demo inputs.
- Focus on renter affordability, shelter-cost burden, renter-owner split incentive problem, and targeted action.
- Keep the response practical, clear, and non-technical.
- Do not invent exact funding amounts, exact utility programs, or guarantees.
- When referencing 39.5%, 38.5%, 36.7%, 32.2%, 27.9%, 25.5%, 23.4%, or 29.3%, call them shelter-cost burden values, not electricity energy burden values.

Community data:
${JSON.stringify(community, null, 2)}

Scores:
${JSON.stringify(scores, null, 2)}

Return exactly this format:

Priority Summary:
[2-3 sentences]

Main Risk Drivers:
- [driver 1]
- [driver 2]
- [driver 3]

Recommended Utility Action:
[1-2 sentences]

Recommended Municipal Action:
[1-2 sentences]

Recommended Community Partner Action:
[1-2 sentences]

One-Sentence Pitch:
[one sentence]
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 700,
    });

    const actionPlan =
      completion.choices[0]?.message?.content ||
      "No AI action plan generated.";

    return NextResponse.json({ actionPlan });
  } catch (error) {
    console.error("AI action plan error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to generate AI action plan. Check the API key, free quota, and server terminal error.",
      },
      { status: 500 }
    );
  }
}