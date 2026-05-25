import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
            Energy Burden • Renters • Program Access
          </p>

          {/* Elevated Heading with your Gradient Text Accent + Teammate's Copy */}
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl leading-[1.1]">
            Helping utilities find where renter{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
              affordability burden and upgrade gaps
            </span>{" "}
            overlap.
          </h1>

          {/* Rebranded Paragraph: Merged Teammate's new description copy with your NRG name */}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            <span className="font-bold text-slate-950">NRG</span> helps utilities and municipalities identify communities where renters face affordability pressure, high shelter-cost burden, and limited access to property-owner-focused energy-efficiency incentives.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/map"
              className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-sm hover:bg-slate-800 transition transform active:scale-95"
            >
              Open Community Burden Map
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition transform active:scale-95"
            >
              View Dashboard
            </Link>

            <Link
              href="/simulator"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition transform active:scale-95"
            >
              Try Simulator
            </Link>

            <a
              href="#how-it-works"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition"
            >
              How it Works
            </a>
          </div>
        </div>

        {/* Feature Bento Grid Section with your premium Hover Styles & Teammate's Updated Wording */}
        <div id="how-it-works" className="mt-24 border-t border-slate-200/60 pt-16">
          <div className="grid gap-6 md:grid-cols-3">
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
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
              >
                <h2 className="text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                  {title}
                </h2>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}