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
        
        {/* Brand Area: Seamless Integration of your Logo and Brand Text */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 shadow-sm transition group-hover:border-slate-300">
            <Image
              src="/nrg-logo.png"
              alt="NRG Logo"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-xl font-black tracking-tight text-slate-950 transition group-hover:text-slate-800">
              NRG
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
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