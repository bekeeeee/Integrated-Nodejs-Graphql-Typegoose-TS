import { Resolver, Mutation, Arg } from "type-graphql";
import { UserModel } from "../../entities/User";
import { redis } from "../../redis";
import { confirmUserPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async ConfirmUser(@Arg("token") token: string): Promise<boolean> {
    console.log("hereeeee");

    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) {
      console.log("false token");
      return false;
    }

    UserModel.findByIdAndUpdate(userId, { confirmed: true });
    redis.del(token);
    return true;
  }
}
