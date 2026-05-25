"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import { calculateEnergyScores, getPriorityLabel } from "@/lib/scoring";

export default function ReportPage() {
  const searchParams = useSearchParams();
const communityFromUrl = searchParams.get("community");

const [selectedName, setSelectedName] = useState(
  sampleNeighbourhoods.some((community) => community.name === communityFromUrl)
    ? communityFromUrl!
    : sampleNeighbourhoods[0].name
);

useEffect(() => {
  if (
    communityFromUrl &&
    sampleNeighbourhoods.some((community) => community.name === communityFromUrl)
  ) {
    setSelectedName(communityFromUrl);
  }
}, [communityFromUrl]);

  const area = useMemo(
    () =>
      sampleNeighbourhoods.find((community) => community.name === selectedName) ||
      sampleNeighbourhoods[0],
    [selectedName]
  );

  const scores = calculateEnergyScores(area);
  const priorityLabel = getPriorityLabel(scores.overallPriorityScore);

  const recommendations = getEnergyBurdenRecommendations(
    area,
    scores.overallPriorityScore
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            COMMUNITY BURDEN ACTION REPORT
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              {area.name} Renter Affordability & Upgrade Gap Report

            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              A targeted action report for identifying where renter shelter-cost
              burden, upgrade barriers, and limited access to efficiency
              programs overlap.
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
              href={`/dashboard?community=${encodeURIComponent(area.name)}`}
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
            NRG RENTER AFFORDABILITY & UPGRADE GAP REPORT            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              {area.name}, {area.city}
            </h2>
            <p className="mt-2 text-slate-600">
              Prepared for utilities, municipalities, housing partners, and
              community organizations.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <ReportMetric
              label="Priority Level"
              value={priorityLabel}
              note="Based on shelter burden, renter barriers, program access, and building efficiency risk."
            />

            <ReportMetric
              label="Overall Score"
              value={`${scores.overallPriorityScore}/100`}
              note="Higher means stronger need for targeted support."
            />

            <ReportMetric
              label="Renter Shelter Burden"
              value={`${area.renterShelterBurdenPercent}%`}
              note="Real ArcGIS/StatsCan renter households spending over 30% of income on shelter costs."
            />

            <ReportMetric
              label="Renter Households"
              value={`${area.renterHouseholdPercent}%`}
              note="Shows how many households may not control building upgrades."
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Executive Summary
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              {area.name} has an overall priority score of{" "}
              <span className="font-semibold">
                {scores.overallPriorityScore}/100
              </span>
              . NRG identifies this community by combining real
              ArcGIS/Statistics Canada census indicators with prototype utility
              and program-access inputs. The key issue is not only affordability,
              but also the renter-owner split: renters may pay monthly utility
              and shelter costs while landlords or property owners control major
              upgrades such as insulation, windows, HVAC systems, or appliances.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Core Recommendation
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              NRG recommends prioritizing {area.name} for renter-focused
              energy affordability outreach, direct-install efficiency programs,
              landlord partnership opportunities, and targeted communication
              about bill support or conservation programs.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Real Data Profile
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <DataPoint
                label="Population 2021"
                value={area.population2021.toLocaleString()}
              />

              <DataPoint
                label="Occupied private dwellings"
                value={area.occupiedPrivateDwellings2021.toLocaleString()}
              />

              <DataPoint
                label="Population density"
                value={`${area.populationDensityPerSqKm2021.toLocaleString()} / km²`}
              />

              <DataPoint
                label="Median household income"
                value={`$${area.medianIncome.toLocaleString()}`}
              />

              <DataPoint
                label="Total shelter burden"
                value={`${area.shelterBurdenPercent}%`}
              />

              <DataPoint
                label="Renter shelter burden"
                value={`${area.renterShelterBurdenPercent}%`}
              />

              <DataPoint
                label="Owner shelter burden"
                value={`${area.ownerShelterBurdenPercent}%`}
              />

              <DataPoint
                label="Renter households"
                value={`${area.renterHouseholdPercent}%`}
              />
            </div>

            <div className="mt-5 rounded-3xl bg-slate-100 p-5">
              <p className="font-semibold text-slate-950">Data note</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Median household income, renter/owner household share,
                shelter-cost burden, population, dwelling count, and density are
                based on ArcGIS / Statistics Canada city-level Census
                Subdivision data. Average monthly electricity bill, program
                access score, building efficiency risk, and retrofit eligibility
                gap are prototype estimates for this demo.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Key Risk Drivers
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <RiskItem
                title="Shelter-Cost Burden"
                score={`${area.renterShelterBurdenPercent}%`}
                description={`${area.renterShelterBurdenPercent}% of renter households in the city-level Census Subdivision spend more than 30% of income on shelter costs. This is used as a real affordability-pressure indicator.`}
              />

              <RiskItem
                title="Renter Upgrade Gap"
                score={`${scores.renterUpgradeGapScore}/100`}
                description={`${area.renterHouseholdPercent}% of households are renters, meaning many residents may pay energy bills without controlling major building upgrades.`}
              />

              <RiskItem
                title="Program Access Gap"
                score={`${scores.programAccessGapScore}/100`}
                description={`Program access is rated ${area.programAccessScore}/10, suggesting that available supports may not be reaching this community effectively.`}
              />

              <RiskItem
                title="Building Efficiency Risk"
                score={`${scores.buildingEfficiencyRiskScore}/100`}
                description={`Building efficiency risk is rated ${area.buildingAgeScore}/10, which may indicate older or less efficient housing stock. This remains a prototype estimate until building-condition data is integrated.`}
              />

              <RiskItem
                title="Low-Income Vulnerability"
                score={`${scores.equityVulnerabilityScore}/100`}
                description={`${area.lowIncomeHouseholdPercent}% of households are estimated as low-income, increasing sensitivity to high utility bills and housing affordability pressure.`}
              />

              <RiskItem
                title="Retrofit Eligibility Gap"
                score={`${area.retrofitEligibilityGapScore}/100`}
                description="This estimates how strongly current owner-focused incentives may miss renters or households without upgrade control."
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-950">
              Recommended Utility & Community Actions
            </h3>

            <div className="mt-4 space-y-3">
              {recommendations.map((action) => (
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
              How This Solves the Challenge
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              This report helps utilities visualize where renter affordability
              pressure and upgrade barriers overlap. Instead of only promoting
              owner-focused incentives, partners can identify renter-heavy
              communities and design outreach, direct-install programs, landlord
              partnerships, and bill-support pathways that better match the
              reality of who pays the bill and who controls upgrades.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function getEnergyBurdenRecommendations(area: any, score: number) {
  if (score >= 75) {
    return [
      "Prioritize this community for renter-focused energy affordability outreach.",
      "Create landlord partnership programs for building-level efficiency upgrades.",
      "Offer direct-install measures for renters, such as LED kits, smart power bars, and thermostat education.",
      "Send targeted bill-support and conservation program information to high-burden households.",
      "Partner with community organizations to host local energy-saving workshops.",
      "Review whether current efficiency incentives are missing renter-heavy buildings.",
    ];
  }

  if (score >= 50) {
    return [
      "Expand awareness of energy-efficiency and bill-support programs in this community.",
      "Monitor renter households and older buildings for possible upgrade barriers.",
      "Pilot renter-friendly conservation education and low-cost direct-install programs.",
      "Work with housing providers to identify buildings that could benefit from retrofits.",
    ];
  }

  return [
    "Continue regular program outreach and track changes in energy burden over time.",
    "Use this area as a comparison benchmark for higher-priority neighbourhoods.",
    "Maintain awareness campaigns for conservation and available utility supports.",
  ];
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

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
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