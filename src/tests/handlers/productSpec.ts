import supertest from "supertest";
import app from "../../server";

// JWT created by in the auth spec and exported
import token from "../authSpec";

const request = supertest(app);

describe("Product Handler Tests", () => {
  // CREATE - Moved to orderSpec.ts
  it("Should creates a new product", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "Atomic Habits",
        price: 19.99,
      })
      .set("Content-type", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });

  // INDEX
  it("Should list all products", async () => {
    const response = await request
      .get("/products")
      .set("Content-type", "application/json");
    expect(response.body[0]).toEqual({
      id: 2,
      name: "Atomic Habits",
      price: 19.99,
    });
  });

  // SHOW
  it("Should show an product with the ID of 1", async () => {
    const response = await request
      .get("/products/2")
      .set("Content-type", "application/json");
    expect(response.body).toEqual({
      id: 2,
      name: "Atomic Habits",
      price: 19.99,
    });
  });

  // UPDATE
  it("Should update the product", async () => {
    const response = await request
      .put("/products")
      .send({
        id: 2,
        name: "Atomic Habits",
        price: 15.99,
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // DELETE
  it("Should delete the product", async () => {
    const response = await request
      .delete("/products/2")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });
});
