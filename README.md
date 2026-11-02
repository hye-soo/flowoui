# FlowOui landing page

Stage 1 public landing page for FlowOui (BCIT Industry Project × StayInCanada Immigration). The product spec (`spec.md`) is internal and not in this repo; ask the team for a copy.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # static output in dist/ (Vercel: build `npm run build`, output `dist`)
```

- Design tokens: `src/styles/globals.css`, copied from the FlowOui Figma style guide (Foundations v1.1).
- Section copy lives in small data arrays at the top of each `src/components/landing/*.jsx` file.
