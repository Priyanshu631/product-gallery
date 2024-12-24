import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export HTTP methods for the route
export { handler as GET, handler as POST };
