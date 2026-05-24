"use client";

import Link from "next/link";
import ArcGISMap from "@/components/ArcGISMap";
import { sampleNeighbourhoods } from "@/data/sampleNeighbourhoods";
import { calculateEnergyScores, getPriorityLabel } from "@/lib/scoring";

export default function MapPage() {
  const communities = sampleNeighbourhoods
    .map((area) => {
      const scores = calculateEnergyScores(area);

      return {
        ...area,
        score: scores.overallPriorityScore,
        label: getPriorityLabel(scores.overallPriorityScore),
        energyBurdenScore: scores.energyBurdenScore,
        renterUpgradeGapScore: scores.renterUpgradeGapScore,
        programAccessGapScore: scores.programAccessGapScore,
        buildingEfficiencyRiskScore: scores.buildingEfficiencyRiskScore,
        equityVulnerabilityScore: scores.equityVulnerabilityScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  const highPriority = communities.filter(
    (area) => area.label === "High Priority"
  );
  const mediumPriority = communities.filter(
    (area) => area.label === "Medium Priority"
  );
  const monitor = communities.filter((area) => area.label === "Monitor");

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Energy Burden Map
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              Map where energy burden and renter retrofit gaps overlap
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              GridWise helps utilities and municipalities identify neighbourhoods
              where high energy costs, renter concentration, limited program
              access, and building upgrade barriers create the greatest need for
              targeted support.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Open Dashboard
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Renter Energy Burden Priority Map
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  ArcGIS-powered map view showing where energy burden, renter
                  concentration, and program access gaps overlap.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-white">
                  High Priority
                </span>
                <span className="rounded-full bg-slate-300 px-3 py-1 text-slate-900">
                  Medium
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  Monitor
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-5">
              <div className="mb-5">
                <ArcGISMap />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {communities.map((area, index) => (
                  <div
                    key={area.name}
                    className={`rounded-3xl border p-5 shadow-sm ${
                      area.label === "High Priority"
                        ? "border-slate-950 bg-white"
                        : area.label === "Medium Priority"
                        ? "border-slate-300 bg-white"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Zone {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-950">
                          {area.name}
                        </h3>
                        <p className="text-sm text-slate-500">{area.city}</p>
                      </div>

                      <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-bold text-white">
                        {area.score}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                      <MapMetric
                        label="Energy burden"
                        value={area.energyBurdenScore}
                      />

                      <div className="rounded-xl bg-slate-100 px-3 py-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Renter households
                          </span>
                          <span className="font-semibold text-slate-950">
                            {area.renterHouseholdPercent}%
                          </span>
                        </div>
                      </div>

                      <MapMetric
                        label="Renter retrofit gap"
                        value={area.renterUpgradeGapScore}
                      />

                      <MapMetric
                        label="Program gap"
                        value={area.programAccessGapScore}
                      />

                      <MapMetric
                        label="Building risk"
                        value={area.buildingEfficiencyRiskScore}
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                      <Link
                        href={`/dashboard?community=${encodeURIComponent(
                          area.name
                        )}`}
                        className="text-slate-950 underline"
                      >
                        View analysis
                      </Link>

                      <Link
                        href={`/report?community=${encodeURIComponent(
                          area.name
                        )}`}
                        className="text-slate-950 underline"
                      >
                        Report
                      </Link>

                      <Link
                        href={`/simulator?community=${encodeURIComponent(
                          area.name
                        )}`}
                        className="text-slate-950 underline"
                      >
                        Simulate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Map Intelligence Summary
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryCard
                label="High priority communities"
                value={highPriority.length}
                note="Strong overlap between energy burden, renter barriers, and program gaps."
              />

              <SummaryCard
                label="Medium priority communities"
                value={mediumPriority.length}
                note="Good candidates for targeted renter outreach and monitoring."
              />

              <SummaryCard
                label="Monitor communities"
                value={monitor.length}
                note="Continue regular support and track changes over time."
              />
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-5">
              <h3 className="font-bold text-slate-950">
                Why location intelligence matters
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Energy burden is not spread evenly across a city. Mapping helps
                utilities see where low-income households, renters, older
                buildings, and weak program access overlap, so support can be
                targeted more fairly.
              </p>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
              <h3 className="font-bold">Challenge alignment</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                This map addresses the renter-owner misalignment by showing
                where households may pay high energy bills but lack control over
                building upgrades needed to reduce those costs.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <InfoBox
            title="1. Map energy burden"
            text="Visualize communities by estimated energy cost pressure and household income."
          />

          <InfoBox
            title="2. Identify renter gaps"
            text="Highlight where renter-heavy communities may be missed by property-owner-focused incentives."
          />

          <InfoBox
            title="3. Recommend programs"
            text="Generate targeted actions such as renter outreach, direct-install supports, and landlord partnerships."
          />
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Methodology
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            How the priority score is calculated
          </h2>

          <p className="mt-3 max-w-4xl leading-7 text-slate-700">
            GridWise calculates a community priority score by combining energy
            burden, renter retrofit barriers, program access gaps, building
            efficiency risk, low-income vulnerability, and sustainability
            opportunity. The score is designed to help utilities and
            municipalities identify where renter-focused support and efficiency
            programs may create the greatest impact.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MethodologyCard
              title="Energy Burden"
              text="Estimates how much household income may be spent on energy costs."
            />

            <MethodologyCard
              title="Renter Retrofit Gap"
              text="Highlights communities where renters may pay bills but lack control over building upgrades."
            />

            <MethodologyCard
              title="Program Access Gap"
              text="Identifies where available energy-efficiency or affordability programs may not be reaching residents."
            />

            <MethodologyCard
              title="Building Efficiency Risk"
              text="Uses building age and efficiency indicators to estimate where housing may need upgrades."
            />

            <MethodologyCard
              title="Low-Income Vulnerability"
              text="Shows where households may be more sensitive to high utility bills."
            />

            <MethodologyCard
              title="Overall Priority"
              text="Combines the indicators into one score to support fairer targeting of programs and outreach."
            />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Data Sources & Prototype Notes
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            How real data is used in this prototype
          </h2>

          <p className="mt-3 max-w-4xl leading-7 text-slate-700">
            GridWise uses ArcGIS / Statistics Canada Shelter Costs 2021 data at
            the Census Subdivision level to support renter household percentage,
            owner household percentage, and shelter-cost burden indicators. These
            real city-level values are applied to selected GTA communities for
            demonstration.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MethodologyCard
              title="Real ArcGIS / StatsCan Data"
              text="Renter households, owner households, and shelter-cost burden are based on the Shelter Costs 2021 Feature Service."
            />

            <MethodologyCard
              title="Prototype Estimates"
              text="Average monthly energy bill, program access score, building efficiency risk, and retrofit eligibility gap are estimated for demo purposes."
            />

            <MethodologyCard
              title="Production Upgrade"
              text="A full version would use finer geography such as dissemination areas, neighbourhood boundaries, utility billing data, and program participation records."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function MapMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-950">{value}/100</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-950"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{note}</p>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-slate-600">{text}</p>
    </div>
  );
}

function MethodologyCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}