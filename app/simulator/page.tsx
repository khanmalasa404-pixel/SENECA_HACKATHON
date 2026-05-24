"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import {
  calculateEnergyScores,
  getPriorityLabel,
  getRecommendation,
} from "@/lib/scoring";

export default function SimulatorPage() {
  const baseArea = sampleNeighbourhoods[0];

  const [area, setArea] = useState({
    ...baseArea,
  });

  const scores = calculateEnergyScores(area);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);
  const recommendation = getRecommendation(area, scores.overallPriorityScore);

  function updateField(field: keyof typeof area, value: number) {
    setArea((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Scenario Simulator
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              Test how community conditions change the priority score
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Adjust the values below to simulate how affordability, outages, heat risk,
              and program access affect the recommended action.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Adjust Scenario Inputs
            </h2>

            <div className="mt-6 space-y-6">
              <Slider
                label="Average Monthly Bill"
                value={area.avgMonthlyBill}
                min={80}
                max={250}
                prefix="$"
                onChange={(value) => updateField("avgMonthlyBill", value)}
              />

              <Slider
                label="Median Income"
                value={area.medianIncome}
                min={30000}
                max={100000}
                prefix="$"
                onChange={(value) => updateField("medianIncome", value)}
              />

              <Slider
                label="Outage Count"
                value={area.outageCount}
                min={0}
                max={12}
                onChange={(value) => updateField("outageCount", value)}
              />

              <Slider
                label="Heat Risk Score"
                value={area.heatRiskScore}
                min={1}
                max={10}
                suffix="/10"
                onChange={(value) => updateField("heatRiskScore", value)}
              />

              <Slider
                label="Program Access Score"
                value={area.programAccessScore}
                min={1}
                max={10}
                suffix="/10"
                onChange={(value) => updateField("programAccessScore", value)}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Live Results
            </h2>

            <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-300">Priority Level</p>
              <p className="mt-2 text-4xl font-bold">{priorityLabel}</p>
              <p className="mt-2 text-slate-300">
                Score: {scores.overallPriorityScore}/100
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard label="Energy Burden" value={`${scores.energyBurdenScore}/100`} />
              <ResultCard label="Outage Risk" value={`${scores.outageRiskScore}/100`} />
              <ResultCard label="Heat Risk" value={`${scores.heatVulnerabilityScore}/100`} />
              <ResultCard label="Program Gap" value={`${scores.programAccessGapScore}/100`} />
              <ResultCard label="Grid Need" value={`${scores.gridModernizationNeedScore}/100`} />
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-5">
              <p className="font-semibold text-slate-950">Recommendation</p>
              <p className="mt-2 leading-7 text-slate-700">{recommendation}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <label className="font-semibold text-slate-800">{label}</label>
        <span className="font-bold text-slate-950">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full"
      />
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}