import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Community Burden Map", "/map"],
  ["Dashboard", "/dashboard"],
  ["Report", "/report"],
  ["Simulator", "/simulator"],
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-md">
            NRG
          </div>

          <div className="leading-tight">
            <div className="text-xl font-black tracking-tight text-slate-950">
              NRG
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
              Renter Equity Tool
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 lg:block">
          Renter Equity Tool
        </div>
      </div>
    </nav>
  );
}