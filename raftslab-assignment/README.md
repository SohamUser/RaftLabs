# RaftLab Assignment

Lightweight Next.js app and companion Python scripts for exploring and preparing startup data used in the RaftLab assignment.

**Quick summary**
- **Frontend:** Next.js (app router) TypeScript app displaying a list of startups and per-startup pages.
- **Data:** JSON files under `data/` and `pyscript/` hold sample startups used by the site and scripts.
- **Scripts:** Simple Python utilities in `pyscript/` to clean and prepare startup datasets.

**Key features**
- Startup listing and detail pages with share button.
- Type-safe data model via TypeScript types in `types/`.

**Repository layout**
- **App:** [raftslab-assignment/app/startups/page.tsx](https://github.com/SohamUser/RaftLabs/blob/main/raftslab-assignment/app/startups/page.tsx) and related components in [raftslab-assignment/app/startups/](https://github.com/SohamUser/RaftLabs/tree/main/raftslab-assignment/app/startups)
- **Data:** [raftslab-assignment/data/startups.json](https://github.com/SohamUser/RaftLabs/blob/main/raftslab-assignment/data/startups.json)
- **Helpers:** [raftslab-assignment/lib/startups.ts](https://github.com/SohamUser/RaftLabs/blob/main/raftslab-assignment/lib/startups.ts)
- **Types:** [raftslab-assignment/types/startup.ts](https://github.com/SohamUser/RaftLabs/blob/main/raftslab-assignment/types/startup.ts)
- **Python tools:** [pyscript/](https://github.com/SohamUser/RaftLabs/tree/main/pyscript) contains cleaning and small processing scripts and example JSON files.

**Getting started**

1. Install Node dependencies (from repository root):

```bash
cd raftslab-assignment
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build and start for production:

```bash
npm run build
npm start
```

**Python utilities**

Python scripts live under the `pyscript/` folder and are standalone helpers for preparing `startups.json` data.

Typical usage (Windows):

```powershell
cd pyscript
python main3.py
```

These scripts read and write JSON files in `pyscript/data/` and can be used to generate the `data/startups.json` consumed by the Next.js app.

**How the app reads data**

- The app loads startup data from [raftslab-assignment/data/startups.json](raftslab-assignment/data/startups.json) via helper functions in [raftslab-assignment/lib/startups.ts](raftslab-assignment/lib/startups.ts).
- Add or update entries in the JSON file to modify the site content. New items should conform to the shape defined in [raftslab-assignment/types/startup.ts](raftslab-assignment/types/startup.ts).

**Development notes**

- Pages and components living in the `app/` directory use the app-router conventions (server components, TSX).
- Important UI files:
  - [raftslab-assignment/app/startups/StartupsList.tsx](raftslab-assignment/app/startups/StartupsList.tsx)
  - [raftslab-assignment/app/startups/[slug]/page.tsx](raftslab-assignment/app/startups/[slug]/page.tsx)
  - [raftslab-assignment/app/startups/[slug]/ShareButton.tsx](raftslab-assignment/app/startups/[slug]/ShareButton.tsx)

**Tips**

- When adding data, keep IDs/slugs URL-friendly (lowercase, hyphens).
- If you update TypeScript types, run the app to catch type errors early: `npm run dev` will surface issues.

**Contributing**

Open issues or create pull requests. Keep changes focused and include small, testable commits.

**License**

No license included. Add a LICENSE file if you want to clarify reuse terms.
