import assert from "node:assert/strict";
import { test } from "node:test";
import { CASE_SLUGS, hrefFor, hrefForCase, hrefForCases, pageOf, resolvePath, swapLang } from "./routes";

const SLUG = CASE_SLUGS[0];

test("hrefFor keeps English at the bare domain and prefixes the rest", () => {
  assert.equal(hrefFor("en"), "/");
  assert.equal(hrefFor("uk"), "/uk");
  assert.equal(hrefFor("ru"), "/ru");
  assert.equal(hrefFor("en", "privacy"), "/privacy");
  assert.equal(hrefFor("uk", "privacy"), "/uk/privacy");
  assert.equal(hrefFor("ru", "terms"), "/ru/terms");
});

test("resolves the real routes", () => {
  assert.deepEqual(resolvePath("/"), { kind: "route", lang: "en", page: "" });
  assert.deepEqual(resolvePath("/uk"), { kind: "route", lang: "uk", page: "" });
  assert.deepEqual(resolvePath("/ru/"), { kind: "route", lang: "ru", page: "" });
  assert.deepEqual(resolvePath("/privacy"), { kind: "route", lang: "en", page: "privacy" });
  assert.deepEqual(resolvePath("/uk/terms"), { kind: "route", lang: "uk", page: "terms" });
});

test("treats a bare code segment as a referral so blogger links keep working", () => {
  assert.deepEqual(resolvePath("/I0MIrSWGFC5BZ3NB"), {
    kind: "referral",
    code: "I0MIrSWGFC5BZ3NB",
  });
  assert.deepEqual(resolvePath("/a-_9"), { kind: "referral", code: "a-_9" });
});

test("never mistakes a language prefix or a real page for a referral code", () => {
  for (const path of ["/uk", "/ru", "/privacy", "/terms", "/uk/privacy"]) {
    assert.notEqual(resolvePath(path).kind, "referral", path);
  }
});

test("redirects the /en prefix back to the canonical bare domain", () => {
  assert.deepEqual(resolvePath("/en"), { kind: "redirect", to: "/" });
  assert.deepEqual(resolvePath("/en/privacy"), { kind: "redirect", to: "/privacy" });
});

test("junk paths stay unknown so they can 404 instead of duplicating the homepage", () => {
  for (const path of [
    "/wp-admin/setup.php",
    "/uk/nope",
    "/a",
    "/one/two/three",
    "/en/nope",
    "/cases/not-a-case",
    "/uk/cases/not-a-case",
    "/cases/one/two",
  ]) {
    assert.equal(resolvePath(path).kind, "unknown", path);
  }
});

test("case URLs resolve per language and never look like referral codes", () => {
  assert.equal(hrefForCases("en"), "/cases");
  assert.equal(hrefForCases("uk"), "/uk/cases");
  assert.equal(hrefForCase("en", SLUG), `/cases/${SLUG}`);
  assert.equal(hrefForCase("ru", SLUG), `/ru/cases/${SLUG}`);

  assert.deepEqual(resolvePath("/cases"), { kind: "cases", lang: "en" });
  assert.deepEqual(resolvePath("/uk/cases"), { kind: "cases", lang: "uk" });
  assert.deepEqual(resolvePath(`/cases/${SLUG}`), { kind: "case", lang: "en", slug: SLUG });
  assert.deepEqual(resolvePath(`/ru/cases/${SLUG}`), { kind: "case", lang: "ru", slug: SLUG });

  assert.notEqual(resolvePath("/cases").kind, "referral");
});

test("the /en prefix redirects for case URLs too", () => {
  assert.deepEqual(resolvePath("/en/cases"), { kind: "redirect", to: "/cases" });
  assert.deepEqual(resolvePath(`/en/cases/${SLUG}`), {
    kind: "redirect",
    to: `/cases/${SLUG}`,
  });
});

test("swapLang keeps the visitor on the same page in the new language", () => {
  assert.equal(swapLang("/uk/privacy", "ru"), "/ru/privacy");
  assert.equal(swapLang("/uk/privacy", "en"), "/privacy");
  assert.equal(swapLang(`/cases/${SLUG}`, "uk"), `/uk/cases/${SLUG}`);
  assert.equal(swapLang(`/ru/cases/${SLUG}`, "en"), `/cases/${SLUG}`);
  assert.equal(swapLang("/uk/cases", "ru"), "/ru/cases");
  assert.equal(swapLang("/I0MIrSWGFC5BZ3NB", "uk"), "/uk");
});

test("pageOf survives referral and junk paths", () => {
  assert.equal(pageOf("/uk/privacy"), "privacy");
  assert.equal(pageOf("/I0MIrSWGFC5BZ3NB"), "");
  assert.equal(pageOf("/wp-admin/setup.php"), "");
});
