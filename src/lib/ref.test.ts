process.env.REF_SECRET ||= "test-secret-do-not-use-in-prod";

import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeRef, decodeRef } from "./ref";

test("round-trips a range of nicknames", () => {
  for (const name of ["boyarskiy", "cryptoAnna", "joe", "Ирина", "a", "🚀nick"]) {
    assert.equal(decodeRef(encodeRef(name)), name);
  }
});

test("same nickname yields varied codes that all decode back", () => {
  const codes = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const code = encodeRef("boyarskiy");
    codes.add(code);
    assert.equal(decodeRef(code), "boyarskiy");
  }
  assert.ok(codes.size > 1, "expected the random nonce to vary the code");
});

test("decodeRef returns null on empty input", () => {
  assert.equal(decodeRef(""), null);
});

test("decodeRef never throws on garbage", () => {
  assert.doesNotThrow(() => decodeRef("~~~not-valid~~~"));
  assert.doesNotThrow(() => decodeRef("%%%%"));
});
