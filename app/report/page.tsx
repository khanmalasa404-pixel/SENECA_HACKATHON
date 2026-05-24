"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import {
  calculateEnergyScores,
  getPartnerActions,
  getPriorityLabel,
  getRecommendation,
} from "@/lib/scoring";

export default function ReportPage() {
  const [selectedName, setSelectedName] = useState(sampleNeighbourhoods[0].name);

  const area = useMemo(
    () =>
      sampleNeighbourhoods.find((community) => community.name === selectedName) ||
      sampleNeighbourhoods[0],
    [selectedName]
  );

  const scores = calculateEnergyScores(area);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);
  const recommendation = getRecommendation(area, scores.overallPriorityScore);
  const partnerActions = getPartnerActions(area, scores.overallPriorityScore);
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Community Energy Action Report            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            {area.name} GridWise Action Report
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              A sample action report for utilities, sustainability partners, and
              municipal teams.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
  <select
    value={selectedName}
    onChange={(event) => setSelectedName(event.target.value)}
    className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm"
  >
    {sampleNeighbourhoods.map((community) => (
      <option key={community.name} value={community.name}>
        {community.name}
      </option>
    ))}
  </select>

  <Link
    href="/dashboard"
    className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-white"
  >
    Back to Dashboard
  </Link>

  <button
    onClick={() => window.print()}
    className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
  >
    Print Report
  </button>
</div>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm print:shadow-none">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            GridWise Community Energy Report
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              {area.name}, {area.city}
            </h2>
            <p className="mt-2 text-slate-600">
              Prepared for energy utilities, municipalities, and community partners.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ReportMetric
              label="Priority Level"
              value={priorityLabel}
              note="Based on affordability, reliability, equity, and sustainability factors."
            />

            <ReportMetric
              label="Overall Score"
              value={`${scores.overallPriorityScore}/100`}
              note="Higher means stronger need for targeted intervention."
            />

            <ReportMetric
              label="Energy Burden"
              value={`${scores.energyBurdenPercent}%`}
              note="Estimated annual electricity cost as share of income."
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Executive Summary
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              {area.name} shows a priority score of{" "}
              <span className="font-semibold">{scores.overallPriorityScore}/100</span>.
              This score suggests that the community may benefit from targeted
              energy affordability support, outreach on available programs,
              resilience planning, and sustainability investment.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Recommendation
            </h3>
            <p className="mt-3 leading-7 text-slate-700">{recommendation}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Key Risk Drivers
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <RiskItem
                title="Energy Affordability"
                score={`${scores.energyBurdenScore}/100`}
                description={`Average monthly bill is estimated at $${area.avgMonthlyBill}, with a median income of $${area.medianIncome.toLocaleString()}.`}
              />

              <RiskItem
                title="Outage Reliability"
                score={`${scores.outageRiskScore}/100`}
                description={`The sample outage count is ${area.outageCount}, suggesting reliability should be monitored.`}
              />
              <RiskItem
  title="Grid Modernization Need"
  score={`${scores.gridModernizationNeedScore}/100`}
  description={`This score combines building age, outage frequency, and program access gaps to estimate where infrastructure or reliability review may be useful.`}
/>

              <RiskItem
                title="Heat Vulnerability"
                score={`${scores.heatVulnerabilityScore}/100`}
                description={`Heat risk is rated ${area.heatRiskScore}/10, which may increase cooling demand and household energy stress.`}
              />

              <RiskItem
                title="Program Access Gap"
                score={`${scores.programAccessGapScore}/100`}
                description={`Program access is rated ${area.programAccessScore}/10, suggesting outreach may need improvement.`}
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
            Recommended Utility & Community Actions
            </h3>

            <div className="mt-4 space-y-3">
              {partnerActions.map((action) => (
                <div
                  key={action}
                  className="rounded-2xl border border-slate-200 p-4 text-slate-700"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-950">
  How Utilities and Mapping Partners Could Use This
</h3>
<p className="mt-3 leading-7 text-slate-700">
  This report can support decision-making by showing where customer
  outreach, grid reliability review, energy-efficiency education,
  sustainability planning, and community partnerships may have the
  greatest impact. A utility could connect this with outage history,
  customer program data, and grid asset information, while a mapping
  partner could help visualize priority zones through location intelligence.
</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ReportMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{note}</p>
    </div>
  );
}

function RiskItem({
  title,
  score,
  description,
}: {
  title: string;
  score: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-bold text-slate-950">{title}</h4>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-semibold text-white">
          {score}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}