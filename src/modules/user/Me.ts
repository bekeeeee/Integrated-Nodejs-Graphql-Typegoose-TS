import { Resolver, Ctx, Query, Authorized } from "type-graphql";

import { User, UserModel } from "../../entities/User";
import { MyContext } from "../../types/Mycontext";

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session!.userId) {
      return null;
    }
    return UserModel.findById(ctx.req.session!.userId);
  }
}
