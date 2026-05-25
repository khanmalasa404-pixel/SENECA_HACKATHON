import Link from "next/link";
import Image from "next/image";

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
        
       {/* Brand Area: Maximum presentation scaling with balanced heavy typography */}
        <Link href="/" className="flex items-center gap-4.5 group">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-200/70 shadow-xl transition duration-300 group-hover:border-slate-300/90 bg-white">
            <Image
              src="/nrg-logo.png"
              alt="NRG Logo"
              fill
              className="object-cover scale-105 transition duration-300 group-hover:scale-110"
              priority
            />
          </div>

          <div className="flex flex-col justify-center project-brand-text">
            <div className="text-3xl font-black tracking-tight text-slate-950 leading-none transition group-hover:text-slate-800">
              NRG
            </div>
            <div className="text-[12px] font-black uppercase tracking-[0.28em] text-emerald-700 mt-2.5 leading-none">
              Renter Equity Tool
            </div>
          </div>
        </Link>

        {/* Navigation Links Mapping */}
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

        {/* Right Accent Pill badge */}
        <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 lg:block">
          Renter Equity Tool
        </div>

      </div>
    </nav>
  );
}