import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    console.log('user found--',user)

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          console.log('returender user--',user)
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      console.log('user in JWT--',JSON.stringify(user))
      if (user) {
        console.log('user exist--',user)
        token.username = user.username;
        token.img = user.img;
        token.id=user._id
      }
      console.log('token ata auth--',token)
      return token;
    },
    async session({ session, token,user }) {

      console.log('token at session',token)
      if (token) {
        console.log('yes token',token)
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.sub;
        session.user.img = token.img;
      }
      console.log('session ata auth--', session)
      return {session};
    },
  },
});
