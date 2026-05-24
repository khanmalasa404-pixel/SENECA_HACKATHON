import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-bold text-slate-950">
        GridWise
        </Link>

        <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-slate-950">
            Home
          </Link>
          <Link href="/map" className="hover:text-slate-950">
          Community Energy Map
          </Link>
          <Link href="/dashboard" className="hover:text-slate-950">
            Dashboard
          </Link>
          <Link href="/report" className="hover:text-slate-950">
            Report
          </Link>
          <Link href="/simulator" className="hover:text-slate-950">
            Simulator
          </Link>
        </div>
      </div>
    </nav>
  );
}