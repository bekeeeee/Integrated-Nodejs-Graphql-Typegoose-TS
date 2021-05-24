declare module "express-session" {
  // cause userId not exist
  interface Session {
    userId: string;
  }
}

import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { User, UserModel } from "../../entities/User";
import { LoginInput } from "./login/Login-input";
import { MyContext } from "../../types/Mycontext";

@Resolver()
export class LoginResolver {
  //async deleteProduct(@Arg("id") id: string)
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email }).select("+password");
    if (
      !user ||
      !(await user.correctPassword(
        password.toString(),
        user.password.toString()
      ))
    )
      return null;

    // ctx.req.session.userId! = user.id;
    // if (!user.confirmed) {
    //   return null;
    // }
    ctx.req.session!.userId = user.id;

    console.log("ctx", ctx.req.session);

    return user;
  }
}
