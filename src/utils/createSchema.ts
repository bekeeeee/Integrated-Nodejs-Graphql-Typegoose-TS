
import { buildSchema } from "type-graphql"
import { RegisterResolver } from "../modules/User/Register";
import { LoginResolver } from "../modules/User/Login";
import { LogoutResolver } from "../modules/User/Logout";

import { ConfirmResolver } from "../modules/User/Confirm";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";

import { MeResolver } from "../modules/User/Me"
export const createSchema =() =>
     buildSchema({
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
