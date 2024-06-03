import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  async afterAuth(auth, req, evt) {
    console.log("🚀 ~ afterAuth ~ evt:", evt);
    console.log("🚀 ~ afterAuth ~ req:", req);
    console.log("🚀 ~ afterAuth ~ auth:", auth);
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    console.log("🚀 ~ process.env.API_ADDRESS:", process.env.API_ADDRESS);
    const result = await fetch(process.env.API_ADDRESS + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: auth.userId,
      }),
    });
    await result.json();
  },
});

export const config = {
  matcher: ["/"],
};
