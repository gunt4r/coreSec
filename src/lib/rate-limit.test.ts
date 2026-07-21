import assert from "node:assert/strict";
import { test } from "node:test";
import { clientKey, rateLimit, resetRateLimits } from "./rate-limit";

test("allows a burst up to the limit then blocks", () => {
  resetRateLimits();
  for (let i = 0; i < 5; i++) {
    assert.equal(rateLimit("1.2.3.4").allowed, true, `request ${i + 1} should pass`);
  }
  const blocked = rateLimit("1.2.3.4");
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfter > 0);
});

test("keeps clients independent", () => {
  resetRateLimits();
  for (let i = 0; i < 5; i++) rateLimit("1.2.3.4");
  assert.equal(rateLimit("5.6.7.8").allowed, true);
});

test("lets a client back in once the window has passed", () => {
  resetRateLimits();
  const start = Date.now();
  for (let i = 0; i < 5; i++) rateLimit("9.9.9.9", start);
  assert.equal(rateLimit("9.9.9.9", start).allowed, false);
  assert.equal(rateLimit("9.9.9.9", start + 10 * 60 * 1000 + 1).allowed, true);
});

test("prefers the Cloudflare client ip over the forwarded chain", () => {
  const request = new Request("https://coresec.finance/api/contact", {
    headers: { "cf-connecting-ip": "203.0.113.9", "x-forwarded-for": "10.0.0.1, 10.0.0.2" },
  });
  assert.equal(clientKey(request), "203.0.113.9");
});

test("falls back to the first forwarded address", () => {
  const request = new Request("https://coresec.finance/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.2" },
  });
  assert.equal(clientKey(request), "203.0.113.7");
});
