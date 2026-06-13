#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const idFile = process.argv[2] || path.join(ROOT, 'library/arxiv/seed-ids.txt');
const outDir = process.argv[3] || path.join(ROOT, 'papers/arxiv');

const REDISTRIBUTABLE_LICENSE_PATTERNS = [
  /creativecommons\.org\/licenses\//i,
  /creativecommons\.org\/publicdomain\//i,
];

async function main() {
  const ids = (await fs.readFile(idFile, 'utf8'))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  await fs.mkdir(outDir, { recursive: true });

  const results = [];
  for (const id of ids) {
    try {
      const metadata = await fetchArxivMetadata(id);
      const canRedistribute = metadata.license
        && REDISTRIBUTABLE_LICENSE_PATTERNS.some((pattern) => pattern.test(metadata.license));

      const paperDir = path.join(outDir, id.replace('/', '_'));
      await fs.mkdir(paperDir, { recursive: true });
      await fs.writeFile(
        path.join(paperDir, 'metadata.json'),
        `${JSON.stringify({ ...metadata, canRedistribute }, null, 2)}\n`,
      );

      if (canRedistribute) {
        const pdfUrl = `https://arxiv.org/pdf/${id}`;
        await downloadFile(pdfUrl, path.join(paperDir, `${id}.pdf`));
      }

      results.push({ id, title: metadata.title, license: metadata.license, canRedistribute });
    } catch (error) {
      results.push({
        id,
        error: error?.message || String(error),
      });
    }
  }

  await fs.writeFile(
    path.join(ROOT, 'library/arxiv/import-results.json'),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`,
  );
}

async function fetchArxivMetadata(id) {
  const url = `https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`arXiv metadata fetch failed for ${id}: ${response.status}`);
  const xml = await response.text();
  return {
    id,
    title: extractTag(xml, 'title', 1),
    summary: extractTag(xml, 'summary', 0),
    authors: [...xml.matchAll(/<author>\s*<name>([\s\S]*?)<\/name>\s*<\/author>/g)]
      .map((match) => decodeXml(match[1].trim())),
    published: extractTag(xml, 'published', 0),
    updated: extractTag(xml, 'updated', 0),
    license: extractTag(xml, 'arxiv:license', 0) || null,
    sourceUrl: `https://arxiv.org/abs/${id}`,
  };
}

function extractTag(xml, tag, skip = 0) {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'g');
  const matches = [...xml.matchAll(pattern)];
  const match = matches[skip];
  return match ? decodeXml(match[1].replace(/\s+/g, ' ').trim()) : null;
}

function decodeXml(value) {
  return String(value || '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

async function downloadFile(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`PDF fetch failed for ${url}: ${response.status}`);
  await pipeline(response.body, createWriteStream(filePath));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
