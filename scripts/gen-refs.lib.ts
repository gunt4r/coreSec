import { readFileSync } from "node:fs";
import { encodeRef } from "../src/lib/ref";

export function parseUsernames(argv: string[]): string[] {
  const names: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--file") {
      const path = argv[++i];
      if (!path) throw new Error("--file requires a path");
      for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) names.push(trimmed);
      }
    } else {
      names.push(arg);
    }
  }
  return names;
}

export function buildLinks(names: string[], baseUrl: string): { name: string; url: string }[] {
  const base = baseUrl.replace(/\/+$/, "");
  return names.map((name) => ({ name, url: `${base}/${encodeRef(name)}` }));
}

export function formatTable(links: { name: string; url: string }[]): string {
  const width = Math.max(0, ...links.map((l) => l.url.length));
  return links.map((l) => `${l.url.padEnd(width)}   →  ${l.name}`).join("\n");
}
