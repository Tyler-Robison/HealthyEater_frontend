// import { rest } from "msw";
// import { testUser } from "../testHelpers";

// const mockTokenData = {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld1VzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEyLCJpYXQiOjE2NDY4NjIzMDF9.JJqdcVY4iUqVA3dkNTvSTImGQQbetu0p8pQ7cXHgSd0'
// }

// const BASE_URL = "http://localhost:3001";
// // second parameter rest accepts is the cb resolver function
// // that accepts, req/res and context as params
// // ctx is where we set status code, headers etc.
// export const handlers = [
//     rest.post(`${BASE_URL}/auth/register`, (req, res, ctx) => {
//         return res(
//             ctx.status(201),
//             ctx.json(mockTokenData)
//         )
//     }),

//     rest.get(`${BASE_URL}/users/1`, (req, res, ctx) => {
//         return res (
//             ctx.status(200),
//             ctx.json(testUser)
//         )
//     })
// ]