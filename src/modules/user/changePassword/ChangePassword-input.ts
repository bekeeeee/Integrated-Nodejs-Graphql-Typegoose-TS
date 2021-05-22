import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { User } from "../../../entities/User";
// import { ObjectId } from "mongodb";

@InputType()
export class ChangePasswordInput implements Partial<User> {


  @Field()
  token: String;

  @Field()
  @Length(8, 16)
  password: String;

}
