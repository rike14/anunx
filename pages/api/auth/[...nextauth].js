import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/signin`, credentials)

                const user = res.data

                if (user) {
                    return user
                } else {
                    throw '/auth/signin?i=1'
                }
            }
        })

    ],

    session: {
        strategy: "jwt",
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },

    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.uid = user._id || user.id;
            }

            return Promise.resolve(token)
        },

        async session({ session, token }) {
            session.user.id = token.user?.id ?? token.uid
            session.user.name = token.user?.name ?? token.name
            session.user.email = token.user?.email ?? token.email
            session.user.image = token.user?.image ?? token.picture
            return session
        }
    },

    database: process.env.MONGODB_URI,
})