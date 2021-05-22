import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass, pre } from "@typegoose/typegoose";
import * as bcrypt from "bcryptjs";
/*
   @staticMethod
    public static hello(...args) {
        console.log("hello, " + JSON.stringify([...args], null, 2));
    }
*/
@ObjectType({ description: "The User model" })
@pre<User>("save", async function (next) {
  console.log("hereeeeeeeeeeeee password");
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password.toString(), 12);
  console.log(this.password);
  next();
})
@pre<User>("save", async function (next) {
  this.name = `${this.firstName} ${this.lastName}`;
  next();
})
export class User {
  public correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, userPassword);
  }
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Property({ required: [true, "Please Provide a password"] })
  firstName: String;

  @Field(() => String)
  @Property({ required: true })
  lastName: String;

  @Field(() => String)
  @Property({ required: true, unique: true })
  email: String;

  @Field(() => String)
  @Property({ required: true, select: false })
  password: String;

  @Field(() => String)
  @Property({ required: false })
  name?: String;

  confirmed?: boolean;
  // @Field()
  _doc?: any;
}

export const UserModel = getModelForClass(User);
