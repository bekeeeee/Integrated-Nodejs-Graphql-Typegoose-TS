import {connect} from "mongoose"

export const testConn = async()=>{
  // create mongoose connection
  return await connect("mongodb://localhost:27017/typescript-testing", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}