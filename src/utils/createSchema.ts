
import { buildSchema } from "type-graphql"
import { RegisterResolver } from "../modules/User/Register";
import { LoginResolver } from "../modules/User/Login";
import { LogoutResolver } from "../modules/User/Logout";

import { ConfirmResolver } from "../modules/User/Confirm";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { CreateProductResolver,CreateUserResolver } from "../modules/user/CreateUser";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";



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
          LogoutResolver,
          CreateUserResolver,
          CreateProductResolver,
          ProfilePictureResolver
        ],
        emitSchemaFile: true,
        validate: false,
        authChecker: ({ context: { req } }) => {
          return !!req.session.userId;
        },
      });




      // curl 'http://localhost:3333/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3333' --data-binary '{"query":"mutation AddProfilePicture($picture:Upload!){\n  addProfilePicture(picture:$picture)\n}"}' --compressed