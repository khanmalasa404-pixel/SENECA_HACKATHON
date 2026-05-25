"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import {
  calculateEnergyScores,
  getPriorityLabel,
  getRecommendation,
} from "@/lib/scoring";
import { MetricCard } from "@/components/MetricCard";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const communityFromUrl = searchParams.get("community");

  const [selectedName, setSelectedName] = useState(
    sampleNeighbourhoods.some((area) => area.name === communityFromUrl)
      ? communityFromUrl!
      : sampleNeighbourhoods[0].name
  );

  const [view, setView] = useState("Utility View");
  const [aiActionPlan, setAiActionPlan] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState("");
  useEffect(() => {
    if (
      communityFromUrl &&
      sampleNeighbourhoods.some((area) => area.name === communityFromUrl)
    ) {
      setSelectedName(communityFromUrl);
    }
  }, [communityFromUrl]);

  const selectedArea = useMemo(
    () =>
      sampleNeighbourhoods.find((area) => area.name === selectedName) ||
      sampleNeighbourhoods[0],
    [selectedName]
  );

  const scores = calculateEnergyScores(selectedArea);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);
  const recommendation = getRecommendation(
    selectedArea,
    scores.overallPriorityScore
  );

  const chartData = [
    {
      name: "Shelter Burden",
      score: selectedArea.renterShelterBurdenPercent,
    },
    {
      name: "Renter Barrier",
      score: scores.renterUpgradeGapScore,
    },
    {
      name: "Program Gap",
      score: scores.programAccessGapScore,
    },
    {
      name: "Building Risk",
      score: scores.buildingEfficiencyRiskScore,
    },
    {
      name: "Low-Income Risk",
      score: scores.equityVulnerabilityScore,
    },
    {
      name: "Retrofit Gap",
      score: selectedArea.retrofitEligibilityGapScore,
    },
  ];

  const comparisonData = sampleNeighbourhoods.map((area) => {
    const areaScores = calculateEnergyScores(area);
    return {
      name: area.name,
      score: areaScores.overallPriorityScore,
    };
  });
  async function generateAiActionPlan() {
    try {
      setIsGeneratingAi(true);
      setAiError("");
      setAiActionPlan("");
  
      const response = await fetch("/api/ai-action-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          community: selectedArea,
          scores,
        }),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from AI route:", text);
        throw new Error(
          "AI route did not return JSON. Check that app/api/ai-action-plan/route.ts exists and the server was restarted."
        );
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate AI action plan.");
      }
  
      setAiActionPlan(data.actionPlan);
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Failed to generate AI action plan."
      );
    } finally {
      setIsGeneratingAi(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Energy Burden Decision Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              Understand where renter energy burden is highest
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              This dashboard combines ArcGIS / Statistics Canada census
              indicators with prototype utility and program-access inputs to
              identify why a community may be high priority. It breaks down
              shelter-cost burden, renter retrofit barriers, program access
              gaps, building efficiency risk, and low-income vulnerability.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={view}
              onChange={(event) => setView(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium shadow-sm"
            >
              <option>Utility View</option>
              <option>Municipal View</option>
              <option>Community Partner View</option>
            </select>

            <select
              value={selectedName}
              onChange={(event) => setSelectedName(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium shadow-sm"
            >
              {sampleNeighbourhoods.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Selected community
              </p>
              <h2 className="mt-1 text-3xl font-bold text-slate-950">
                {selectedArea.name}, {selectedArea.city}
              </h2>
              <p className="mt-2 text-slate-600">
                Current mode: <span className="font-semibold">{view}</span>
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 px-8 py-6 text-white">
              <p className="text-sm text-slate-300">Priority level</p>
              <p className="mt-1 text-3xl font-bold">{priorityLabel}</p>
              <p className="mt-1 text-slate-300">
                Score: {scores.overallPriorityScore}/100
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <MetricCard
            title="Overall Priority"
            value={`${scores.overallPriorityScore}/100`}
            note="Combined score for shelter burden, renter barriers, and program gaps."
          />

          <MetricCard
            title="Shelter-Cost Burden"
            value={`${selectedArea.renterShelterBurdenPercent}%`}
            note="Real ArcGIS/StatsCan renter households spending over 30% of income on shelter costs."
          />

          <MetricCard
            title="Renter Retrofit Gap"
            value={`${scores.renterUpgradeGapScore}/100`}
            note="Shows where renters may pay bills but lack control over upgrades."
          />

          <MetricCard
            title="Program Access Gap"
            value={`${scores.programAccessGapScore}/100`}
            note="Higher score means lower access to support programs."
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-950">
              Risk Driver Breakdown
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This shows which real-data and prototype factors are driving the
              community priority score.
            </p>

            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Community Profile
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <ProfileRow
                label="Population 2021"
                value={selectedArea.population2021.toLocaleString()}
              />

              <ProfileRow
                label="Occupied private dwellings"
                value={selectedArea.occupiedPrivateDwellings2021.toLocaleString()}
              />

              <ProfileRow
                label="Population density"
                value={`${selectedArea.populationDensityPerSqKm2021.toLocaleString()} / km²`}
              />

              <ProfileRow
                label="Median household income"
                value={`$${selectedArea.medianIncome.toLocaleString()}`}
              />

              <ProfileRow
                label="Renter households"
                value={`${selectedArea.renterHouseholdPercent}%`}
              />

              <ProfileRow
                label="Owner-occupied households"
                value={`${selectedArea.ownerOccupiedPercent}%`}
              />

              <ProfileRow
                label="Total shelter burden"
                value={`${selectedArea.shelterBurdenPercent}%`}
              />

              <ProfileRow
                label="Renter shelter burden"
                value={`${selectedArea.renterShelterBurdenPercent}%`}
              />

              <ProfileRow
                label="Owner shelter burden"
                value={`${selectedArea.ownerShelterBurdenPercent}%`}
              />

              <ProfileRow
                label="Retrofit eligibility gap"
                value={`${selectedArea.retrofitEligibilityGapScore}/100`}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-950">Data note</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Income, renter/owner household share, shelter-cost burden,
                population, dwelling count, and density are based on ArcGIS /
                Statistics Canada city-level Census Subdivision data. Utility
                bill, program access, and retrofit gap values are prototype
                estimates for this demo.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Neighbourhood Priority Comparison
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compare overall priority scores across selected GTA demo
              communities.
            </p>

            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Renter Burden Radar
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A quick visual of the main factors affecting this community.
            </p>

            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar dataKey="score" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Recommended Program Direction
          </h2>

          <div className="mt-4 rounded-3xl bg-slate-100 p-5">
            <p className="font-semibold text-slate-950">Recommendation</p>
            <p className="mt-2 text-slate-700">{recommendation}</p>
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
    <div>
      <p className="font-semibold text-slate-950">
        AI Action Plan Assistant
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Generate a stakeholder-specific action plan using the selected
        community data, priority scores, and GridWise methodology.
      </p>
    </div>

    <button
      onClick={generateAiActionPlan}
      disabled={isGeneratingAi}
      className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isGeneratingAi ? "Generating..." : "Generate AI Action Plan"}
    </button>
  </div>

  {aiError && (
    <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
      {aiError}
    </div>
  )}

  {aiActionPlan && (
    <div className="mt-4 whitespace-pre-line rounded-2xl bg-slate-100 p-5 text-sm leading-7 text-slate-700">
      {aiActionPlan}
    </div>
  )}
</div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <ActionCard text="Prioritize renter-focused energy affordability outreach." />
            <ActionCard text="Review whether owner-focused incentives are missing renter-heavy buildings." />
            <ActionCard text="Create landlord-renter retrofit partnership opportunities." />
            <ActionCard text="Promote direct-install supports and conservation education for renters." />
          </div>

          <Link
            href={`/report?community=${encodeURIComponent(selectedArea.name)}`}
            className="mt-6 inline-block rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Generate Full Report
          </Link>
        </section>
      </div>
    </main>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function ActionCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
      {text}
    </div>
  );
}