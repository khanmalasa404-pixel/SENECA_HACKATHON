import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Energy • Mapping • Community Impact
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Smarter energy decisions start with location.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            GridWise helps utilities, municipalities, and community partners identify
            where grid reliability, energy affordability, climate resilience, and
            sustainability investments can create the greatest community impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/map"
              className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Open Community Energy Map
            </Link>

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
              "Map",
              "Visualize communities by energy burden, outage risk, heat exposure, and program access.",
            ],
            [
              "Prioritize",
              "Rank neighbourhoods by where support or infrastructure investment could make the biggest difference.",
            ],
            [
              "Act",
              "Generate practical recommendations for utilities, municipalities, and community organizations.",
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