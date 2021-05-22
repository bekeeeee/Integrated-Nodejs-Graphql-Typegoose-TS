import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

import { redis } from "./redis";
// import { sendEmail } from "./utils/sendEmail";
// resolvers
import { RegisterResolver } from "./modules/User/Register";
import { LoginResolver } from "./modules/User/Login";
import { LogoutResolver } from "./modules/User/Logout";

import { ConfirmResolver } from "./modules/User/Confirm";
import { ForgotPasswordResolver } from "./modules/user/ForgotPassword";
import { ChangePasswordResolver } from "./modules/user/ChangePassword";

import { MeResolver } from "./modules/User/Me";

const RedisStore = connectRedis(session);
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      ConfirmResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver
    ],
    emitSchemaFile: true,
    validate: false,
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  // create mongoose connection
  const mongoose = await connect("mongodb://localhost:27017/typescript", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  await mongoose.connection;

  const server = new ApolloServer({
    schema,
    context: ({ req,res }: any) => ({ req ,res}),
  });

  const app = Express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );
  server.applyMiddleware({ app });

  app.listen({ port: 3333 }, () => {
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    );
  });
};
main().catch((error) => {
  console.log(error, "error");
});
