import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Product model" })

export class Product {
 
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Property({ required: [true, "Please Provide a name"] })
  name: String;


}

export const ProductModel = getModelForClass(Product);
