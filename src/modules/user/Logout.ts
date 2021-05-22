import { MyContext } from "Mycontext";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          rej(true);
        }
        ctx.res.clearCookie("qid");
        res(true);
      })
    );
  }
}
