import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  UseMiddleware,
} from "type-graphql";
import { Length } from "class-validator";

import { User, UserModel } from "../../entities/User";
import { CreateUserInput } from "./createUser/createUserInput";
import { Product, ProductModel } from "../../entities/Product";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleWare?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleWare || []))
    async create(@Arg("data", () => inputType) data: any) {
      return (await entity.create(data)).save();
    }
  }

  return BaseResolver;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  CreateUserInput,
  UserModel
);

@InputType()
class ProductInput implements Partial<Product> {
  @Field()
  @Length(1, 255)
  name: String;
}
export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  ProductModel
);

// @Resolver()
// export class CreateUserResolver extends BaseCreateUser {}

// @Resolver()
// export class CreateProductResolver extends BaseCreateProduct {}
