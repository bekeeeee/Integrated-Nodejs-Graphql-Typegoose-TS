import { gCall } from "../../../test-utils/gCall"
import {testConn} from "../../../test-utils/testConn"

beforeAll(async ()=>{
    await testConn()
})


const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    firstName
    lastName
    email
    name
  }
}
`;
describe("Register",()=>{
    it("create user",async()=>{
        console.log( await gCall({
            source:registerMutation,
            variableValues:{
                data:{
                    firstName:"beke",
                    lastName:"Bekeeee",
                    email:"Bekeeee1@gmail.com",
                    password:"12345678"
                }
            }
        }))
    })
})