import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, isAbsolute, join, resolve } from "node:path";

const siteRoot = resolve(process.argv[2] ?? "_site");
const supportedFiles = new Set([".css", ".html"]);
const ignoredSchemes = /^(?:data:|https?:|mailto:|tel:|javascript:|\/\/)/i;
const missing = [];

function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

function checkReference(source, reference) {
  const cleanReference = reference.trim().split(/[?#]/, 1)[0];

  if (!cleanReference || cleanReference.startsWith("#") || ignoredSchemes.test(cleanReference)) {
    return;
  }

  let decodedReference;
  try {
    decodedReference = decodeURIComponent(cleanReference);
  } catch {
    decodedReference = cleanReference;
  }

  const target = isAbsolute(decodedReference)
    ? join(siteRoot, decodedReference)
    : resolve(dirname(source), decodedReference);

  if (!existsSync(target)) {
    missing.push(`${source.slice(siteRoot.length + 1)} -> ${reference}`);
  }
}

for (const file of filesIn(siteRoot).filter((path) => supportedFiles.has(extname(path)))) {
  const contents = readFileSync(file, "utf8");
  const references = [];

  for (const match of contents.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gis)) {
    references.push(match[2]);
  }

  for (const match of contents.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gis)) {
    references.push(match[2]);
  }

  references.forEach((reference) => checkReference(file, reference));
}

if (missing.length > 0) {
  console.error("Missing local site references:\n" + missing.join("\n"));
  process.exit(1);
}

console.log("All local site references exist.");

