process.env.REF_SECRET ||= "test-secret-do-not-use-in-prod";

import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { parseUsernames, buildLinks, formatTable } from "./gen-refs.lib";
import { decodeRef } from "../src/lib/ref";

test("parseUsernames reads positional args", () => {
  assert.deepEqual(parseUsernames(["a", "b"]), ["a", "b"]);
});

test("parseUsernames reads a --file, skipping blanks and # comments", () => {
  const path = join(tmpdir(), `refs-${randomBytes(6).toString("hex")}.txt`);
  writeFileSync(path, "# comment\nboyarskiy\n\n  cryptoAnna  \n");
  assert.deepEqual(parseUsernames(["--file", path]), ["boyarskiy", "cryptoAnna"]);
});

test("parseUsernames combines file and positional args in order", () => {
  const path = join(tmpdir(), `refs-${randomBytes(6).toString("hex")}.txt`);
  writeFileSync(path, "fromfile\n");
  assert.deepEqual(parseUsernames(["--file", path, "extra"]), ["fromfile", "extra"]);
});

test("buildLinks produces decodable urls under the base url", () => {
  const links = buildLinks(["joe"], "https://x.com/");
  assert.equal(links.length, 1);
  assert.ok(links[0].url.startsWith("https://x.com/"));
  const code = links[0].url.slice("https://x.com/".length);
  assert.equal(decodeRef(code), "joe");
});

test("formatTable aligns and shows each nickname", () => {
  const out = formatTable([
    { name: "joe", url: "https://x.com/aa" },
    { name: "anna", url: "https://x.com/bbbbb" },
  ]);
  const lines = out.split("\n");
  assert.equal(lines.length, 2);
  assert.ok(lines[0].includes("→") && lines[0].includes("joe"));
  assert.ok(lines[1].includes("anna"));
});
