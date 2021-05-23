// import {graphql} from "graphql"
import {testConn} from "./testConn"

testConn().then(()=> {
    console.log("Conncted to testing db")
    process.exit();
})

