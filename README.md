# Research Library

Public research library for the Remnant Research and Revenants-True-Evolution projects.

This repository is intended to be the shared source of research material used by both projects:

- papers and source metadata
- topic indexes and reading notes
- project-specific research references
- full paper files when redistribution is allowed by the paper license

## Related Projects

- Remnant Research: https://github.com/Nitestalkr/Remnant-Research
- Revenants-True-Evolution: https://github.com/Nitestalkr/Revenants-True-Evolution

## Repository Layout

```text
library/
  arxiv/                ArXiv IDs, metadata manifests, import outputs
materials/
  remnant-research/     Curated notes copied or derived from Remnant Research
  revenants-true-evolution/
papers/
  arxiv/                Full paper files when license permits redistribution
scripts/
  import-arxiv.mjs      Metadata/PDF importer with license checks
```

## Paper Storage Policy

This repository should contain actual paper files where it is legally safe to do so.

Full-text files may be committed when one of these is true:

- the paper is public domain
- the paper has an explicit redistribution-friendly license, such as CC BY, CC BY-SA, CC BY-NC, CC0, or another clearly stated open license
- the authors or publisher explicitly permit redistribution

If redistribution is unclear, store only metadata, notes, abstracts, citations, and source links until the license is verified.

Each committed paper file should have adjacent metadata recording source URL, license URL, retrieval date, and project relevance.

## Initial Scope

The first seed focuses on research already covered by Remnant Research and Revenants:

- cognitive architectures
- self-evolving agents
- gradient-driven optimization
- agent memory and retrieval
- multi-agent systems
- safety, privacy, and alignment
- OpenClaw/plugin-oriented agent runtimes
- recursive self-improving agents for Revenants

## Initial Seed Status

The first import collected 111 arXiv IDs from existing project notes and resolved metadata for the currently available records. No PDFs were committed in the first pass because the resolved arXiv records did not expose explicit redistribution-friendly license metadata. See `ACQUISITION_STATUS.md`.

## Maintenance

When new papers are reviewed in either project:

1. Add the source ID or URL to the relevant manifest.
2. Fetch metadata.
3. Download the full paper only if the license permits redistribution.
4. Add a short note explaining why the material matters.
5. Keep project-specific implementation notes in the project repo, and keep reusable research material here.
