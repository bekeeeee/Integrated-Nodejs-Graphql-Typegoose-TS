import faker from "faker";
import { UserModel, User } from "../../../entities/User";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

const meQuery = `
{
  me
   {
    id
    firstName
    lastName
    email
    name
  }
}
`;
describe("Me", () => {
  it("get user", async () => {
    const user: Promise<User> = (
      await UserModel.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    ).save();

    const response = await gCall({
      source: meQuery,
      userId: (await user).id,
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: (await user).id.toString(),
          firstName: (await user).firstName,
          lastName: (await user).lastName,
          email: (await user).email,
        },
      },
    });
  });
});
