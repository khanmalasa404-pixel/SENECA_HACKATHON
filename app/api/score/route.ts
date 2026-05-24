import { NextResponse } from "next/server";
import { calculateEnergyScores, getRecommendation } from "@/lib/scoring";

export async function POST(request: Request) {
  const area = await request.json();
  const scores = calculateEnergyScores(area);
  const recommendation = getRecommendation(scores.overallPriorityScore);

  return NextResponse.json({
    ...scores,
    recommendation,
  });
}
