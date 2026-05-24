"use client";

import { useEffect, useRef, useState } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";

function supportsWebGL2() {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return !!canvas.getContext("webgl2");
}

export default function ArcGISMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    let view: __esri.MapView | null = null;

    async function loadMap() {
      if (!supportsWebGL2()) {
        setWebglAvailable(false);
        return;
      }

      if (!mapRef.current) return;

      const esriConfig = (await import("@arcgis/core/config")).default;
      const Map = (await import("@arcgis/core/Map")).default;
      const MapView = (await import("@arcgis/core/views/MapView")).default;

      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY || "";

      const map = new Map({
        basemap: "arcgis/light-gray",
      });

      view = new MapView({
        container: mapRef.current,
        map,
        center: [-79.3832, 43.6532],
        zoom: 9,
      });
    }

    loadMap();

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  if (!webglAvailable) {
    return <MapFallback />;
  }

  return (
    <div
      ref={mapRef}
      className="h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white"
    />
  );
}

function MapFallback() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex h-full flex-col justify-between rounded-3xl bg-slate-100 p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            ArcGIS Map Preview
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            WebGL2 is unavailable on this browser
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            The live ArcGIS map is connected, but this browser or device is not
            currently allowing WebGL2 rendering. GridWise can still display the
            priority zones below and can render the live Esri map when WebGL2 is
            enabled.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              High Priority Zone
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">Jane-Finch</p>
            <p className="mt-1 text-sm text-slate-600">
              Energy burden and renter barriers overlap.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              High Priority Zone
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">Rexdale</p>
            <p className="mt-1 text-sm text-slate-600">
              Strong renter retrofit and program access gap.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Medium Priority Zone
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">Malton</p>
            <p className="mt-1 text-sm text-slate-600">
              Candidate for targeted outreach and monitoring.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          For the live map: enable graphics acceleration/WebGL2 or test in
          another browser.
        </p>
      </div>
    </div>
  );
}