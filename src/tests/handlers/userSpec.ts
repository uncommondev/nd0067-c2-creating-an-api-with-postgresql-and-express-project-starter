import supertest from "supertest";
import app from "../../server";

// JWT created by in the auth spec and exported
import token from "../authSpec";

const request = supertest(app);

describe("User Handler Tests", () => {
  // CREATE - Moved to orderSpec.ts
  it("Should creates a new user", async () => {
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

  // INDEX
  it("Should list all users", async () => {
    const response = await request
      .get("/users")
      .set("Content-type", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // SHOW
  it("Should show an user with the ID of 2", async () => {
    const response = await request
      .get("/users/2")
      .set("Content-type", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.body.firstname).toEqual("William");
    expect(response.body.lastname).toEqual("Gates");
  });

  // UPDATE
  it("Should update the user", async () => {
    const response = await request
      .put("/users")
      .send({
        id: 2,
        firstname: "Bill",
        lastname: "Gates",
        password: "Windows123",
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // DELETE
  it("Should delete the user", async () => {
    const response = await request
      .delete("/users/2")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });
});
