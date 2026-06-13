# Acquisition Status

Initial seed date: 2026-06-13

## Current Seed

- 111 arXiv IDs collected from Remnant Research and Revenants-True-Evolution notes.
- 28 arXiv metadata records resolved during the initial import.
- 0 full-text PDFs committed during the initial import because none of the resolved arXiv records exposed an explicit redistribution-friendly license in the arXiv API response.

## Why No Blind PDF Dump

The goal is for this repository to hold actual papers and research materials, but it is public. Full-text papers should only be committed when redistribution is clearly permitted. For records with unclear licensing, the library stores metadata and project notes first.

## Next Acquisition Steps

1. Manually review high-priority papers for publisher or author license statements.
2. Add full paper files under `papers/` when redistribution is verified.
3. Keep metadata and notes for papers whose full text cannot be redistributed.
4. Extend import scripts for non-arXiv sources with the same license-first rule.

