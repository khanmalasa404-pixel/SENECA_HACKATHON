"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import { calculateEnergyScores, getPriorityLabel } from "@/lib/scoring";

export default function SimulatorPage() {
  const searchParams = useSearchParams();
  const communityFromUrl = searchParams.get("community");

  const initialCommunity =
    sampleNeighbourhoods.find(
      (community) => community.name === communityFromUrl
    ) || sampleNeighbourhoods[0];

  const [selectedName, setSelectedName] = useState(initialCommunity.name);
  const [area, setArea] = useState({ ...initialCommunity });

  const selectedCommunity =
    sampleNeighbourhoods.find((community) => community.name === selectedName) ||
    sampleNeighbourhoods[0];

  useEffect(() => {
    if (!communityFromUrl) return;

    const community = sampleNeighbourhoods.find(
      (item) => item.name === communityFromUrl
    );

    if (community) {
      setSelectedName(community.name);
      setArea({ ...community });
    }
  }, [communityFromUrl]);

  function handleCommunityChange(name: string) {
    const community =
      sampleNeighbourhoods.find((item) => item.name === name) ||
      sampleNeighbourhoods[0];

    setSelectedName(name);
    setArea({ ...community });
  }

  function updateField(field: keyof typeof area, value: number) {
    setArea((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function improveProgramAccess() {
    setArea((previous) => ({
      ...previous,
      programAccessScore: Math.min(10, previous.programAccessScore + 4),
    }));
  }

  function addDirectInstallProgram() {
    setArea((previous) => ({
      ...previous,
      avgMonthlyBill: Math.max(80, Math.round(previous.avgMonthlyBill * 0.9)),
      programAccessScore: Math.min(10, previous.programAccessScore + 2),
      retrofitEligibilityGapScore: Math.max(
        0,
        previous.retrofitEligibilityGapScore - 15
      ),
    }));
  }

  function launchLandlordPartnership() {
    setArea((previous) => ({
      ...previous,
      buildingAgeScore: Math.max(1, previous.buildingAgeScore - 2),
      retrofitEligibilityGapScore: Math.max(
        0,
        previous.retrofitEligibilityGapScore - 25
      ),
      programAccessScore: Math.min(10, previous.programAccessScore + 2),
    }));
  }

  function reduceBillByTenPercent() {
    setArea((previous) => ({
      ...previous,
      avgMonthlyBill: Math.max(80, Math.round(previous.avgMonthlyBill * 0.9)),
    }));
  }

  const baselineScores = calculateEnergyScores(selectedCommunity);
  const scores = calculateEnergyScores(area);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);
  const impactDifference =
    scores.overallPriorityScore - baselineScores.overallPriorityScore;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            RENTER BURDEN SCENARIO SIMULATOR
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            Simulate renter affordability and upgrade-barrier risk            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Adjust bills, income, renter concentration, program access,
              building efficiency risk, low-income vulnerability, and retrofit
              eligibility gaps to see how the community priority score changes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedName}
              onChange={(event) => handleCommunityChange(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm"
            >
              {sampleNeighbourhoods.map((community) => (
                <option key={community.name} value={community.name}>
                  {community.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setArea({ ...selectedCommunity })}
              className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-white"
            >
              Reset Scenario
            </button>

            <Link
              href={`/dashboard?community=${encodeURIComponent(selectedName)}`}
              className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Adjust Scenario Inputs
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-3xl bg-slate-100 p-5">
                <p className="font-semibold text-slate-950">
                  Quick intervention tests
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Click an intervention to simulate how renter-focused programs
                  could reduce the community priority score.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={improveProgramAccess}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Improve Program Access
                  </button>

                  <button
                    onClick={addDirectInstallProgram}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Add Renter Direct-Install Program
                  </button>

                  <button
                    onClick={launchLandlordPartnership}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Launch Landlord Retrofit Partnership
                  </button>

                  <button
                    onClick={reduceBillByTenPercent}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Reduce Monthly Bill by 10%
                  </button>
                </div>
              </div>

              <Slider
                label="Average Monthly Energy Bill"
                value={area.avgMonthlyBill}
                min={80}
                max={250}
                prefix="$"
                onChange={(value) => updateField("avgMonthlyBill", value)}
              />

              <Slider
                label="Median Household Income"
                value={area.medianIncome}
                min={30000}
                max={150000}
                prefix="$"
                onChange={(value) => updateField("medianIncome", value)}
              />

              <Slider
                label="Renter Household Percentage"
                value={area.renterHouseholdPercent}
                min={10}
                max={90}
                suffix="%"
                onChange={(value) =>
                  updateField("renterHouseholdPercent", value)
                }
              />

              <Slider
                label="Low-Income Household Percentage"
                value={area.lowIncomeHouseholdPercent}
                min={5}
                max={60}
                suffix="%"
                onChange={(value) =>
                  updateField("lowIncomeHouseholdPercent", value)
                }
              />

              <Slider
                label="Program Access Score"
                value={area.programAccessScore}
                min={1}
                max={10}
                suffix="/10"
                onChange={(value) => updateField("programAccessScore", value)}
              />

              <Slider
                label="Building Age / Efficiency Risk"
                value={area.buildingAgeScore}
                min={1}
                max={10}
                suffix="/10"
                onChange={(value) => updateField("buildingAgeScore", value)}
              />

              <Slider
                label="Retrofit Eligibility Gap"
                value={area.retrofitEligibilityGapScore}
                min={0}
                max={100}
                suffix="/100"
                onChange={(value) =>
                  updateField("retrofitEligibilityGapScore", value)
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Live Results</h2>
            <p className="mt-2 text-sm text-slate-600">
              Adjust the sliders to see how changes in bills, income, renter
              concentration, program access, and upgrade barriers affect the
              community priority score.
            </p>

            <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-300">Priority Level</p>
              <p className="mt-2 text-4xl font-bold">{priorityLabel}</p>
              <p className="mt-2 text-slate-300">
                Score: {scores.overallPriorityScore}/100
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <ImpactCard
                label="Original Score"
                value={`${baselineScores.overallPriorityScore}/100`}
              />

              <ImpactCard
                label="Scenario Score"
                value={`${scores.overallPriorityScore}/100`}
              />

              <ImpactCard
                label="Estimated Impact"
                value={`${impactDifference > 0 ? "+" : ""}${impactDifference} pts`}
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Energy-Cost Pressure"
                value={`${scores.energyBurdenScore}/100`}
              />

              <ResultCard
                label="Renter Retrofit Gap"
                value={`${scores.renterUpgradeGapScore}/100`}
              />

              <ResultCard
                label="Program Access Gap"
                value={`${scores.programAccessGapScore}/100`}
              />

              <ResultCard
                label="Building Efficiency Risk"
                value={`${scores.buildingEfficiencyRiskScore}/100`}
              />

              <ResultCard
                label="Low-Income Vulnerability"
                value={`${scores.equityVulnerabilityScore}/100`}
              />

              <ResultCard
                label="Overall Priority"
                value={`${scores.overallPriorityScore}/100`}
              />
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-5">
              <p className="font-semibold text-slate-950">What this means</p>
              <p className="mt-2 leading-7 text-slate-700">
              This scenario shows how renter affordability risk changes when households face high monthly energy bills, lower incomes, high renter concentration, weak program access, and limited control over building upgrades.
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-950">
                Best intervention to test
              </p>
              <p className="mt-2 leading-7 text-slate-700">
                Test an intervention by increasing the Program Access Score,
                lowering the Retrofit Eligibility Gap, or reducing average
                monthly energy bills. If the priority score decreases, it shows
                how renter-friendly programs, direct-install efficiency
                measures, and landlord partnerships could reduce renter burden
                risk.
              </p>
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

function ImpactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}