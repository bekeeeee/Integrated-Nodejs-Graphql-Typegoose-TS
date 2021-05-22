import { MyContext } from "Mycontext";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { UserModel, User } from "../../entities/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePassword-input";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async ChangePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      console.log("!userId");

      return null;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("!user");
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);
    user.password = password;
    await user.save();
    ctx.req.session.userId = user.id;
    return user;
  }
}
