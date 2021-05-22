import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { User } from "../../../entities/User";
// import { ObjectId } from "mongodb";

@InputType()
export class LoginInput implements Partial<User> {


  @Field()
  @IsEmail()
  email: String;

  @Field()
  @Length(8, 16)
  password: String;

}
