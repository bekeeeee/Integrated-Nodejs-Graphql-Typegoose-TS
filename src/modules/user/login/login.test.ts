import faker from "faker";
import { UserModel } from "../../../entities/User";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

const LoginMutation = `
mutation Login($data: LoginInput!) {
  login(
    data: $data
  ) {
    firstName
    lastName
    email
    name
  }
}
`;

describe("Login", () => {
  it("login", async () => {

    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    (await UserModel.create(user)).save();

    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        data: {
          email: user.email,
          password: user.password,
        },
      },
    });
    // console.log(response);
    expect(response).toMatchObject({ 
      data: {
        login: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });
});
