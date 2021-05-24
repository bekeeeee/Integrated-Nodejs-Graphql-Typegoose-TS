import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { User } from "../../../entities/User";
// import { ObjectId } from "mongodb";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: String;

  @Field()
  @Length(1, 255)
  lastName: String;

  @Field()
  @IsEmail()
  email: String;

  @Field()
  @Length(8, 16)
  password: String;


  // @Field()
  @Length(1, 255)
  name: String;

  // @Field(()=> ID)
  // cart_id: ObjectId;
}
