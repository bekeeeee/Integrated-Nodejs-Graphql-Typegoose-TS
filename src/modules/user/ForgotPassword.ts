import { Resolver, Mutation, Arg } from "type-graphql";
import { UserModel } from "../../entities/User";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { sendEmail } from "../utils/sendEmail";
import { forgotPasswordPrefix } from "../../modules/constants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    if (!user) return true;

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);
    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );
    return true;
  }
}
