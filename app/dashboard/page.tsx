"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
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
  getPartnerActions,
  getPriorityLabel,
  getRecommendation,
} from "@/lib/scoring";
import { MetricCard } from "@/components/MetricCard";

export default function DashboardPage() {
  const [selectedName, setSelectedName] = useState(sampleNeighbourhoods[0].name);
  const [view, setView] = useState("Company View");

  const selectedArea = useMemo(
    () =>
      sampleNeighbourhoods.find((area) => area.name === selectedName) ||
      sampleNeighbourhoods[0],
    [selectedName]
  );

  const scores = calculateEnergyScores(selectedArea);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);
  const recommendation = getRecommendation(selectedArea, scores.overallPriorityScore);
  const partnerActions = getPartnerActions(selectedArea, scores.overallPriorityScore);

  const chartData = [
    { name: "Energy Burden", score: scores.energyBurdenScore },
    { name: "Outage Risk", score: scores.outageRiskScore },
    { name: "Heat Risk", score: scores.heatVulnerabilityScore },
    { name: "Program Gap", score: scores.programAccessGapScore },
    { name: "Equity Risk", score: scores.equityVulnerabilityScore },
    { name: "Sustainability", score: scores.sustainabilityOpportunityScore },
    { name: "Grid Need", score: scores.gridModernizationNeedScore },
  ];

  const comparisonData = sampleNeighbourhoods.map((area) => {
    const areaScores = calculateEnergyScores(area);
    return {
      name: area.name,
      score: areaScores.overallPriorityScore,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Community Energy, Equity and Sustainability
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            GridWise Decision Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
            A decision-support dashboard that helps utilities, municipalities, and community partners understand which communities may need grid reliability investment, affordability support, climate resilience planning, or sustainability programs first.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={view}
              onChange={(event) => setView(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 font-medium shadow-sm"
            >
              <option>Company View</option>
              <option>Community View</option>
              <option>Municipal View</option>
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
            note="Combined affordability, reliability, equity, and sustainability score."
          />
          <MetricCard
            title="Energy Burden"
            value={`${scores.energyBurdenPercent}%`}
            note="Estimated annual electricity cost as a share of income."
          />
          <MetricCard
            title="Outage Count"
            value={selectedArea.outageCount}
            note="Sample outage frequency indicator."
          />
          <MetricCard
            title="Program Access Gap"
            value={`${scores.programAccessGapScore}/100`}
            note="Higher score means lower access to available support."
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-950">
              Risk and Opportunity Breakdown
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This shows which factors are driving the community priority score.
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
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Avg. monthly bill</span>
                <span className="font-semibold">${selectedArea.avgMonthlyBill}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Median income</span>
                <span className="font-semibold">${selectedArea.medianIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Low-income households</span>
                <span className="font-semibold">{selectedArea.lowIncomeHouseholdPercent}%</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Senior population</span>
                <span className="font-semibold">{selectedArea.seniorPopulationPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Solar potential</span>
                <span className="font-semibold">{selectedArea.solarPotentialScore}/10</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Neighbourhood Comparison
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compare priority scores across sample communities.
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
              Equity Radar
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
            Generated Community Report
          </h2>

          <div className="mt-4 rounded-3xl bg-slate-100 p-5">
            <p className="font-semibold text-slate-950">Recommendation</p>
            <p className="mt-2 text-slate-700">{recommendation}</p>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-slate-950">
              Suggested partner actions
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {partnerActions.map((action) => (
                <div
                  key={action}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>

          <Link
  href="/report"
  className="mt-6 inline-block rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
>
  Generate Full Report
</Link>
        </section>
      </div>
    </main>
  );
}