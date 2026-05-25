"use client";

import { useEffect, useRef, useState } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";

function supportsWebGL2() {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return !!canvas.getContext("webgl2");
}

const priorityZones = [
  {
    name: "Jane-Finch",
    city: "Toronto",
    score: 90,
    level: "High Priority",
    coordinates: [-79.5196, 43.757],
    summary:
      "High energy burden, renter affordability pressure, and strong retrofit barrier.",
  },
  {
    name: "Rexdale",
    city: "Toronto",
    score: 86,
    level: "High Priority",
    coordinates: [-79.5663, 43.7214],
    summary: "Strong renter retrofit gap and program access gap.",
  },
  {
    name: "Malton",
    city: "Mississauga",
    score: 79,
    level: "High Priority",
    coordinates: [-79.6386, 43.703],
    summary:
      "Renter affordability pressure with targeted program opportunity.",
  },
  {
    name: "Downtown Brampton",
    city: "Brampton",
    score: 67,
    level: "Medium Priority",
    coordinates: [-79.7624, 43.686],
    summary: "Moderate affordability pressure and renter support opportunity.",
  },
  {
    name: "Port Credit",
    city: "Mississauga",
    score: 43,
    level: "Monitor",
    coordinates: [-79.5866, 43.551],
    summary:
      "Lower priority compared with other communities, but still useful for monitoring.",
  },
];

export default function ArcGISMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    let view: any = null;

    async function loadMap() {
      if (!supportsWebGL2()) {
        setWebglAvailable(false);
        return;
      }

      if (!mapRef.current) return;

      const esriConfig = (await import("@arcgis/core/config.js")).default;
      const Map = (await import("@arcgis/core/Map.js")).default;
      const MapView = (await import("@arcgis/core/views/MapView.js")).default;
      const GraphicsLayer = (
        await import("@arcgis/core/layers/GraphicsLayer.js")
      ).default;
      const Graphic = (await import("@arcgis/core/Graphic.js")).default;

      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_API_KEY || "";

      const map = new Map({
        basemap: "gray-vector",
      });

      const priorityLayer = new GraphicsLayer({
        title: "GridWise Priority Zones",
      });

      map.add(priorityLayer);

      view = new MapView({
        container: mapRef.current,
        map,
        center: [-79.58, 43.68],
        zoom: 10,
        popup: {
          dockEnabled: true,
          dockOptions: {
            position: "top-right",
            breakpoint: false,
          },
        },
      });

      priorityZones.forEach((zone) => {
        const isHigh = zone.level === "High Priority";
        const isMedium = zone.level === "Medium Priority";

        const marker = new Graphic({
          geometry: {
            type: "point",
            longitude: zone.coordinates[0],
            latitude: zone.coordinates[1],
          } as any,
          symbol: {
            type: "simple-marker",
            style: "circle",
            color: isHigh
              ? [2, 6, 23, 1]
              : isMedium
              ? [100, 116, 139, 1]
              : [203, 213, 225, 1],
            size: isHigh ? 18 : 14,
            outline: {
              color: [255, 255, 255, 1],
              width: 2,
            },
          } as any,
          attributes: {
            name: zone.name,
            encodedName: encodeURIComponent(zone.name),
            city: zone.city,
            score: zone.score,
            level: zone.level,
            summary: zone.summary,
          },
          popupTemplate: {
            title: "{name}, {city}",
            content: (event: any) => {
              const attributes = event.graphic.attributes;
              const encodedName = encodeURIComponent(attributes.name);
          
              const container = document.createElement("div");
              container.style.fontFamily = "system-ui";
              container.style.lineHeight = "1.5";
          
              container.innerHTML = `
                <p><strong>Priority Level:</strong> ${attributes.level}</p>
                <p><strong>Score:</strong> ${attributes.score}/100</p>
                <p>${attributes.summary}</p>
          
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px;">
                  <a href="/dashboard?community=${encodedName}" style="font-weight: 700; text-decoration: underline;">
                    Open Dashboard
                  </a>
                  <a href="/report?community=${encodedName}" style="font-weight: 700; text-decoration: underline;">
                    View Report
                  </a>
                  <a href="/simulator?community=${encodedName}" style="font-weight: 700; text-decoration: underline;">
                    Run Simulator
                  </a>
                </div>
              `;
          
              return container;
            },
          },
        });

        priorityLayer.add(marker);
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
    <div className="relative">
      <div
        ref={mapRef}
        className="h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white"
      />

      <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Map Layers
        </p>

        <div className="mt-2 space-y-2 text-sm">
          <LegendItem label="High Priority" className="bg-slate-950" />
          <LegendItem label="Medium Priority" className="bg-slate-500" />
          <LegendItem label="Monitor" className="bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${className}`} />
      <span className="text-slate-700">{label}</span>
    </div>
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
            Priority zone map preview
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            GridWise displays priority zones for communities where affordability
            pressure, renter concentration, and program access gaps overlap.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {priorityZones.slice(0, 3).map((zone) => (
            <div
              key={zone.name}
              className="rounded-2xl border border-slate-300 bg-white p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {zone.level}
              </p>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {zone.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">{zone.summary}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          For the live ArcGIS map: enable graphics acceleration/WebGL2 or test
          in another browser.
        </p>
      </div>
    </div>
  );
}