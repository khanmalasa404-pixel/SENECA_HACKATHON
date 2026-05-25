import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Energy Burden • Renters • Program Access
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
          Helping utilities find where renter affordability burden and upgrade gaps overlap.          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          NRG helps utilities and municipalities identify communities where renters face affordability pressure, high shelter-cost burden, and limited access to property-owner-focused energy-efficiency incentives.          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/map"
              className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Open Community Burden Map            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-white"
            >
              View Dashboard
            </Link>

            <Link
              href="/simulator"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-white"
            >
              Try Simulator
            </Link>

            <a
              href="#how-it-works"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-white"
            >
              How it Works
            </a>
          </div>
        </div>

        <div id="how-it-works" className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            [
              "Map the burden",
              "Visualize communities where renter shelter-cost burden, affordability pressure, and upgrade barriers overlap.",
            ],
            [
              "Find renter gaps",
              "Identify renter-heavy communities that may be missed by property-owner-focused upgrade incentives.",
            ],
            [
              "Recommend action",
              "Generate targeted program recommendations such as renter outreach, direct-install supports, and landlord partnerships.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}