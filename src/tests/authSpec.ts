import supertest from "supertest";
import { UserStore } from "../models/user";
import app from "../server";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IldpbGxpYW0iLCJsYXN0bmFtZSI6IkdhdGVzIiwicGFzc3dvcmQiOiJXaW5kb3dzMTIzIn0sImlhdCI6MTYzODU1OTY4N30.7LzFKpSETLTKQFfZbHqiub6OohJCq4QjLVayvaUYbL4";
export default token;

const request = supertest(app);
const store = new UserStore();

describe("Authentication Tests", () => {
  it("Should create a new user", async () => {
    const response = await request
      .post("/users")
      .send({
        firstname: "William",
        lastname: "Gates",
        password: "Windows123",
      })
      .set("Content-type", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });
  it("Should authenticate a user (MODEL)", async () => {
    const result = await store.authenticate("2", "Windows123");
    expect(result).toEqual(true);
  });
  it("Should authenticate a user (HANDLER)", async () => {
    const response = await request
      .post("/users/auth")
      .send({
        id: "2",
        password: "Windows123",
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });
});
