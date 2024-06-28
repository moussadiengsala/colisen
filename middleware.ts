import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";


export async function middleware(request: NextRequest) {
  const supabase = createClient()
  const { data: {session}, error } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl;
  const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  if (!session ) {
    // If there is no session and the user is not already on the sign-in page, redirect to the sign-in page
    if (pathname !== "/" && pathname != "/annonce" && !pathname.includes("/auth")) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = "/auth/signin";
      return NextResponse.redirect(signInUrl);
    }
  } else {
    // If there is a session and the user is trying to access the sign-in page, redirect them to the previous page
    if (pathname.includes("/auth")) {
      const previousPageUrl = new URL("/annonces", baseUrl);
      return NextResponse.redirect(previousPageUrl);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
