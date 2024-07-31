

export const authConfig = {
  providers:[

  ],
  pages: {
    signIn: "/login",
  },
    callbacks: {
        async authorized({ auth, request }) {
            const isLoggedIn = auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
            const isOnHomepage = request.nextUrl.pathname === "/";
            const isOnLoginPage = request.nextUrl.pathname === "/login";

            // If the user is on the dashboard and is not logged in, redirect to the login page
            if (isOnDashboard && !isLoggedIn) {
                return Response.redirect(new URL("/login", request.nextUrl));
            }

            // If the user is on the homepage and is not logged in, redirect to the login page

            // If the user is logged in and is on the login page, redirect to the dashboard
            if (isLoggedIn && isOnLoginPage) {
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }

            // Otherwise, allow the request
            return true;
        },
    },


};
