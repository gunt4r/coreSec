import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolvePath } from "@/lib/routes";

export function proxy(request: NextRequest) {
  const resolved = resolvePath(request.nextUrl.pathname);

  if (resolved.kind === "redirect") {
    const target = request.nextUrl.clone();
    target.pathname = resolved.to;
    return NextResponse.redirect(target, 308);
  }

  if (resolved.kind !== "referral") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
