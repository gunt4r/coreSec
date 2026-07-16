import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Referral links look like /k3Xf9aQ2vP. There is no such page, so without this
 * they would 404. Rewrite any non-asset path to the homepage; the browser URL
 * is kept, so the client can still read the code from the path.
 *
 * (Next 16's successor to the deprecated `middleware` convention.)
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except /api/*, Next internals, and any path with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
