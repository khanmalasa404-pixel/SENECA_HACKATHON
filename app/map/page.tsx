import Link from "next/link";
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
        outageRiskScore: scores.outageRiskScore,
        heatVulnerabilityScore: scores.heatVulnerabilityScore,
        programAccessGapScore: scores.programAccessGapScore,
        gridModernizationNeedScore: scores.gridModernizationNeedScore,
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
            Community Energy Map
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              Location intelligence for community energy decisions
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              A map-first decision tool that helps utilities, municipalities, and
              community partners identify where energy affordability support,
              outage resilience investment, and sustainability programs should go first.
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
                  Community Priority Map
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Prototype map view showing neighbourhoods by energy equity priority.
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

            <div className="mt-6 grid min-h-[460px] gap-4 rounded-3xl bg-slate-100 p-5 md:grid-cols-3">
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
                    <MapMetric label="Outage risk" value={area.outageRiskScore} />
                    <MapMetric
                      label="Heat risk"
                      value={area.heatVulnerabilityScore}
                    />
                    <MapMetric
                      label="Program gap"
                      value={area.programAccessGapScore}
                    />
                    <MapMetric
  label="Grid need"
  value={area.gridModernizationNeedScore}
/>
                  </div>

                  <Link
                    href="/dashboard"
                    className="mt-5 inline-block text-sm font-semibold text-slate-950 underline"
                  >
                    View analysis
                  </Link>
                </div>
              ))}
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
                note="Require immediate support or investment review."
              />

              <SummaryCard
                label="Medium priority communities"
                value={mediumPriority.length}
                note="Good candidates for targeted outreach and monitoring."
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
                Location-based scoring helps decision-makers see where energy,
                climate, and affordability risks overlap. Instead of treating every
                community the same, partners can prioritize action based on place.
              </p>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
              <h3 className="font-bold">Utility use case</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                A utility could combine this with outage history, customer program
                participation, and grid asset data to guide reliability investment
                and outreach planning.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <InfoBox
            title="1. Map communities"
            text="View neighbourhoods as geographic priority zones based on affordability, reliability, climate, and equity factors."
          />

          <InfoBox
            title="2. Explain the score"
            text="Open the dashboard to understand what is driving risk in each community."
          />

          <InfoBox
            title="3. Recommend action"
            text="Generate a report showing what utilities, municipalities, or community partners can do next."
          />
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