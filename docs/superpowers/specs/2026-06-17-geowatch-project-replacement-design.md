---
name: geowatch-project-replacement-design
description: Design specification for replacing the E-Commerce Dashboard project with the GeoWatch Indonesia project in the portfolio data store.
metadata:
  type: project
---

# Design Specification: Replace E-Commerce Dashboard with GeoWatch Indonesia

This document specifies the replacement of the E-Commerce Dashboard showcase project with GeoWatch Indonesia.

## 1. Context & Goals
The portfolio showcases personal projects built by Ryan. The user wants to replace the placeholders or less relevant projects (E-Commerce Dashboard) with a newly developed project: **GeoWatch Indonesia**.

## 2. Project Details: GeoWatch Indonesia
* **Title:** GeoWatch Indonesia
* **Description:** An interactive geospatial monitor for tracking active volcanoes and geothermal energy potential in Indonesia. Features real-time alert levels, seismic status, and interactive Leaflet map visualizations.
* **Tech Stack:** Next.js, TypeScript, Leaflet, Tailwind CSS, Zustand, SWR
* **GitHub URL:** https://github.com/scofieldolf/geowatch-indonesia
* **Demo URL:** https://geowatch-indonesia.vercel.app

## 3. Implementation Details
The portfolio website loads projects dynamically from a local JSON file: `data/projects.json`.
We will modify the JSON file to replace the "E-Commerce Dashboard" project entry.

### Changes in `data/projects.json`
* Locate the entry with `"title": "E-Commerce Dashboard"`.
* Replace it with:
```json
{
  "title": "GeoWatch Indonesia",
  "description": "An interactive geospatial monitor for tracking active volcanoes and geothermal energy potential in Indonesia. Features real-time alert levels, seismic status, and interactive Leaflet map visualizations.",
  "tech": ["Next.js", "TypeScript", "Leaflet", "Tailwind CSS", "Zustand", "SWR"],
  "github_url": "https://github.com/scofieldolf/geowatch-indonesia",
  "demo_url": "https://geowatch-indonesia.vercel.app"
}
```

## 4. Verification Plan
* Run `npm run lint` to check for syntax or type errors.
* Run `npm run test` to verify the test suite (Vitest) passes.
