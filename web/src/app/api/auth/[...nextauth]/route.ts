import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { __APP_BACKEND_URL__, __APP_API_URL__ } from "@/lib/constants";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${__APP_BACKEND_URL__}/sanctum/csrf-cookie`, {
          method: "GET",
        });

        if (!res.ok) {
          console.log("Failed to fetch CSRF token", res.json())
        }

        const setCookieHeader = res.headers.get("set-cookie")
        // console.log("setCookieHeader", setCookieHeader)
        // you'll find your_site_session key in this console log

        const cookies = setCookieHeader?.split(", ")
        // console.log(cookies)
        let sessionKey = null
        let xsrfToken = null

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1]
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1]
          }

          if (sessionKey && xsrfToken) {
            break
          }
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        }
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        })

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken)
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
        try {
          // console.log(options)
          const response = await fetch(`${__APP_API_URL__}/auth/login`, options)

          if (response.ok) {
            const res = await response.json()
            console.log("response", res)
            return res
          } else {
            console.log("HTTP error! Status:", response.status)
            // Handle non-successful response here, return an appropriate JSON response.
            return { error: "Authentication failed" }
          }
        } catch (error) {
          console.log("Error", error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.accessToken = (user as any).access_token
      }
      return token
    },
    async session({ session, token }: {
      session: any
      token: any
    }) {
      session.accessToken = token.access_token
      session.user = token.user
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };