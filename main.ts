// main.ts — entrypoint for the news-image-20261122 v2 entry.
// The entry is a single image, entry.png, held in this repository.
// This program copies it to the output directory the harness provides
// (MAKEFUN_OUTPUT_DIR, or /output), writing exactly the same bytes
// on every run. It uses only the Node standard library and no network.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of silently shipping a truncated copy:
// the gate requires a whole image, so the two files must match in size.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png copy is incomplete");
}
