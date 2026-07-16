import { parseUsernames, buildLinks, formatTable } from "./gen-refs.lib";

function main(): void {
  if (!process.env.REF_SECRET) {
    console.error("REF_SECRET is not set. Add it to .env or pass REF_SECRET=... inline.");
    process.exit(1);
  }
  const baseUrl = process.env.REF_BASE_URL || "https://coresec.finance";

  let names: string[];
  try {
    names = parseUsernames(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
    return;
  }

  if (names.length === 0) {
    console.error("No usernames given. Usage: npm run gen-refs -- <user> [user...] [--file list.txt]");
    process.exit(1);
  }

  console.log(formatTable(buildLinks(names, baseUrl)));
}

main();
