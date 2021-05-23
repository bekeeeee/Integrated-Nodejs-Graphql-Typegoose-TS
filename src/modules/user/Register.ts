import {
  Resolver,
  Mutation,
  Arg,
  Query,
  // FieldResolver,
  // Root,
} from "type-graphql";

import { User, UserModel } from "../../entities/User";
import { RegisterInput } from "./register/Register-input";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@Resolver(() => User)
export class RegisterResolver {
  //async deleteProduct(@Arg("id") id: string)
  @Mutation(() => User)
  async register(
    @Arg("data")
    { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const user = (
      await UserModel.create({
        firstName,
        lastName,
        email,
        password,
      })
    ).save();

    // console.log("user", (await user).firstName)
    await sendEmail(
      email.toString(),
      await createConfirmationUrl((await user).id)
    );

    return user;
  }

  @Query(() => [User])
  async getAllusers() {
    const users = await UserModel.find({});
    console.log("users", users);
    return users;
  }

  // @FieldResolver()
  // async name(@Root() parent: User) {
  //   console.log("User", parent._doc);
  //   return `${parent._doc.firstName} ${parent._doc.lastName}`;
  // }
}
