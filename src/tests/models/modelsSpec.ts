import { UserStore } from "./../../models/user";
import { ProductStore } from "./../../models/product";
import { OrderStore } from "./../../models/order";

// For test JWT
import { User } from "./../../models/user";
import jwt from "jsonwebtoken";

const oStore = new OrderStore();
const pStore = new ProductStore();
const uStore = new UserStore();

let test_jwt = "";

beforeAll(async () => {
  // CREATE TEST JWT -->
  const user: User = {
    firstname: "Mark",
    lastname: "Corrigan",
    password: "LondonBritish2000",
  };
  const newUser = await uStore.create(user);
  const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
  console.log(token);
  test_jwt = token;
});

export default test_jwt;

describe("Check the MODEL CRUD functions for User, Product and Order Models", () => {
  describe("CREATE", () => {
    it("Create method should add a user", async () => {
      const result = await uStore.create({
        firstname: "John",
        lastname: "Smith",
        password: "Password123",
      });
      expect(result.firstname).toEqual("John");
      expect(result.lastname).toEqual("Smith");
    });
    it("Create method should add a product", async () => {
      const result = await pStore.create({
        name: "Apprenticeship Patterns",
        price: 19.99,
      });
      expect(result.name).toEqual("Apprenticeship Patterns");
      expect(result.price).toEqual(19.99);
    });
    it("Create method should add a order", async () => {
      const result = await oStore.create({
        user_id: 3,
        status: true,
      });
      expect(result.user_id).toEqual(3);
      expect(result.status).toEqual(true);
    });
    it("Add a product to and order", async () => {
      const result = await oStore.addProduct({
        quantity: 50,
        order_id: 2,
        product_id: 3,
      });
      expect(result.quantity).toEqual(50);
      expect(result.order_id).toEqual(2);
      expect(result.product_id).toEqual(3);
    });
  });
  describe("INDEX", () => {
    it("Index method should return a list of users", async () => {
      const result = await uStore.index();
      expect(result.length).toBeGreaterThan(0);
    });
    it("Index method should return a list of products", async () => {
      const result = await pStore.index();
      expect(result.length).toBeGreaterThan(0);
    });
    it("Index method should return a list of orders", async () => {
      const result = await oStore.index();
      expect(result.length).toBeGreaterThan(0);
    });

    describe("SHOW", () => {
      it("Show method should return the correct user", async () => {
        const result = await uStore.show("5");
        expect(result.firstname).toEqual("John");
        expect(result.lastname).toEqual("Smith");
      });
      it("Show method should return the correct product", async () => {
        const result = await pStore.show("3");
        expect(result.name).toEqual("Apprenticeship Patterns");
        expect(result.price).toEqual(19.99);
      });
      it("Show method should return the correct order", async () => {
        const result = await oStore.show("2");
        expect(result.user_id).toEqual(3);
        expect(result.status).toEqual(true);
      });
    });
    describe("UPDATE", () => {
      it("Update the order", async () => {
        await oStore.update(
          {
            user_id: 3,
            status: false,
          },
          "2"
        );
        const result = await oStore.show("2");
        expect(result.status).toEqual(false);
      });
      it("Update the product", async () => {
        await pStore.update(
          {
            name: "Apprenticeship Patterns",
            price: 15.99,
          },
          "3"
        );
        const result = await pStore.show("3");
        expect(result.price).toEqual(15.99);
      });
      it("Update the user", async () => {
        await uStore.update(
          {
            firstname: "Johnathan",
            lastname: "Smith",
            password: "123Password",
          },
          "5"
        );
        const result = await uStore.show("5");
        expect(result.firstname).toEqual("Johnathan");
        expect(result.lastname).toEqual("Smith");
      });
    });
    describe("DELETE", () => {
      it("Delete the order in order_product", async () => {
        await oStore.deleteProduct("2");
        const result = await oStore.indexProduct();
        expect(result).toThrowError;
      });

      it("Delete method should remove the order", async () => {
        await oStore.delete("2");
        const result = await oStore.show("2");
        expect(result).toThrowError;
      });

      it("Delete method should remove the user", async () => {
        // CONTEXT -->
        // A user has been created for provide the JWT and index will return multiple rows
        // The delete method returns the deleted "user"
        // We can confirm it's deleted by checking the values it returns

        const result = await uStore.delete("5");
        expect(result.firstname).toEqual("Johnathan");
        expect(result.lastname).toEqual("Smith");
      });

      it("Delete method should remove the product", async () => {
        await pStore.delete("1");
        const result = await pStore.show("3");
        expect(result).toThrowError;
      });
    });
  });
});
