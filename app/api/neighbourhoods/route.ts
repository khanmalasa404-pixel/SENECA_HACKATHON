import { NextResponse } from "next/server";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";

export async function GET() {
  // Hackathon version:
  // We return sample data first so the dashboard works immediately.
  // Later, replace this with MongoDB reads.
  return NextResponse.json(sampleNeighbourhoods);
}
