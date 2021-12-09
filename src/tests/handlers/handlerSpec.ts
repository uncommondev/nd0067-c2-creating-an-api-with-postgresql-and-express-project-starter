import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

// Create a JWT
let test_jwt = "";

// For test JWT
import { User } from "./../../models/user";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  // CREATE TEST JWT -->
  const user: User = {
    firstname: "Mark",
    lastname: "Corrigan",
    password: "LondonBritish2000",
  };
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
  console.log(`Test JWT`);
  console.log(token);
  test_jwt = token;
});

export default test_jwt;

// Moving the handlers to a single file to control the flow of execution
// To prevent errors with dependencies

describe("Handler Testing (Integration Tests)", () => {
  // CREATE
  describe("CREATE - Handler Tests", () => {
    // Create a user - foreign key dependency for the order
    it("Should creates a new user", async () => {
      const response = await request
        .post("/users")
        .send({
          firstname: "Tim",
          lastname: "Apple",
          password: "iPhone123",
        })
        .set("Authorization", "Bearer " + test_jwt);
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
        .set("Authorization", "Bearer " + test_jwt);
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
  });

  // AUTH
  describe("AUTH - Handler Tests", () => {
    it("Should authenticate a user (HANDLER)", async () => {
      const response = await request
        .post("/users/auth")
        .send({
          id: "1",
          password: "iPhone123",
        })
        .set("Content-type", "application/json");
      expect(response.status).toEqual(200);
    });
  });

  // INDEX
  describe("INDEX - Handler Tests", () => {
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
    it("Should list all users", async () => {
      const response = await request
        .get("/users")
        .set("Content-type", "application/json")
        .set("Authorization", "Bearer " + test_jwt);
      expect(response.body.length).toBeGreaterThan(0);
    });
    it("Should list all products", async () => {
      const response = await request
        .get("/products")
        .set("Content-type", "application/json");
      expect(response.body[0]).toEqual({
        id: 1,
        name: "The 5AM Club",
        price: 19.99,
      });
    });
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
  });

  // SHOW
  describe("SHOW - Handler Tests", () => {
    it("Should show an order with the ID of 1", async () => {
      const response = await request
        .get("/orders/1")
        .set("Content-type", "application/json")
        .set("Authorization", "Bearer " + test_jwt);
      expect(response.body).toEqual({
        id: 1,
        user_id: 1,
        status: true,
      });
    });
    it("Should show an product with the ID of 1", async () => {
      const response = await request
        .get("/products/1")
        .set("Content-type", "application/json");
      expect(response.body).toEqual({
        id: 1,
        name: "The 5AM Club",
        price: 19.99,
      });
    });
    it("Should show an user with the ID of 1", async () => {
      const response = await request
        .get("/users/1")
        .set("Content-type", "application/json")
        .set("Authorization", "Bearer " + test_jwt);
      expect(response.body.firstname).toEqual("Tim");
      expect(response.body.lastname).toEqual("Apple");
    });
  });

  // UPDATE
  describe("UPDATE - Handler Tests", () => {
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
    it("Should update the product", async () => {
      const response = await request
        .put("/products")
        .send({
          id: 1,
          name: "The 5AM Club",
          price: 15.99,
        })
        .set("Content-type", "application/json");
      expect(response.status).toEqual(200);
    });
    it("Should update the user", async () => {
      const response = await request
        .put("/users")
        .send({
          id: 1,
          firstname: "Tim",
          lastname: "Apple",
          password: "iPhone123",
        })
        .set("Content-type", "application/json");
      expect(response.status).toEqual(200);
    });
  });

  // DELETE
  describe("DELETE - Handler Tests", () => {
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
});
