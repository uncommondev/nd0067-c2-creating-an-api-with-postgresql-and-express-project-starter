import supertest from "supertest";
import app from "../../server";

// JWT created by in the auth spec and exported
import token from "../authSpec";

const request = supertest(app);

describe("Order Handler Tests", () => {
  // CREATE
  // Create a user - foreign key dependency for the order
  it("Should creates a new user", async () => {
    const response = await request
      .post("/users")
      .send({
        firstname: "Tim",
        lastname: "Apple",
        password: "iPhone123",
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });
  // Create a product - foreign key dependency for the join table
  it("Should creates a new product", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "The 5AM Club",
        price: 19.99,
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toEqual(200);
  });

  it("Should creates a new order", async () => {
    const response = await request
      .post("/orders")
      .send({
        user_id: 1,
        status: true,
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // INDEX
  it("Should list all orders", async () => {
    const response = await request
      .get("/orders")
      .set("Content-type", "application/json");
    expect(response.body[0]).toEqual({
      id: 1,
      user_id: 1,
      status: true,
    });
  });

  // SHOW
  it("Should show an order with the ID of 1", async () => {
    const response = await request
      .get("/orders/1")
      .set("Content-type", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.body).toEqual({
      id: 1,
      user_id: 1,
      status: true,
    });
  });

  // UPDATE
  it("Should update the order", async () => {
    const response = await request
      .put("/orders")
      .send({
        id: 1,
        user_id: 1,
        status: false,
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // JOIN TABLE ENDPOINT TESTS

  //CREATE
  it("Should add a product to an order", async () => {
    const response = await request
      .post("/order/1/products")
      .send({
        quantity: 50,
        order_id: 1,
        product_id: 1,
      })
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // INDEX
  it("Should show the index of order_products", async () => {
    const response = await request
      .get("/order/products")
      .set("Content-type", "application/json");
    expect(response.body[0]).toEqual({
      id: 1,
      quantity: 50,
      order_id: 1,
      product_id: 1,
    });
  });

  // DELETE - order_products
  it("Should delete a product to an order", async () => {
    const response = await request
      .delete("/order/1/products")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // DELETE - Order
  it("Should delete the order", async () => {
    const response = await request
      .delete("/orders/1")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // DELETE - User
  it("Should delete the user", async () => {
    const response = await request
      .delete("/users/1")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });

  // DELETE - Product
  it("Should delete the product", async () => {
    const response = await request
      .delete("/products/1")
      .set("Content-type", "application/json");
    expect(response.status).toEqual(200);
  });
});
