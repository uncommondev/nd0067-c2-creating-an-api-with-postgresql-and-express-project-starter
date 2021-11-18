import { UserStore } from './../../models/user';
import { ProductStore } from './../../models/product';
import { Order, OrderStore } from './../../models/order';

const uStore = new UserStore()
const pStore = new ProductStore()

const store = new OrderStore()
// Need to create a user and product before running the orderSpec 

// The reason it's failing is because there isn't a user or product available

describe("Order Model", () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('Should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // it('Should have a update method', () => {
  //   expect(store.update).toBeDefined();
  // });

  it('Should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  // Create a user and product 

  it('Create method should add a user', async () => {
    const result = await uStore.create({
      firstname: "John",
      lastname: "Smith",
      password: "Password123"
    });
    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      firstname: "John",
      lastname: "Smith",
      password: "Password123"
    });
  });

  it('Create method should add a product', async () => {
    const result = await pStore.create({
      name: "Apprenticeship Patterns",
      price: 19.99,
    });
    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      name: "Apprenticeship Patterns",
      price: 19.99
    });
  });

  it('Create method should add a order', async () => {
    const result = await store.create({
        product_id: 1,
        quantity: 50,
        user_id: 1,
        status: true
    });

    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      product_id: 1,
      quantity: 50,
      user_id: 1,
      status: true
    });
  });

  it('Index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([{
       // @ts-ignores
       id: 1,
       product_id: 1,
       quantity: 50,
       user_id: 1,
       status: true
    }]);
  });

  it('Show method should return the correct order', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
       // @ts-ignores
       id: 1,
       product_id: 1,
       quantity: 50,
       user_id: 1,
       status: true
    });
  });

  it('Delete method should remove the order', async () => {
    await store.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });

  // Delete user and product
  it('Delete method should remove the user', async () => {
    await uStore.delete("1")
    const result = await store.index()
    expect(result).toEqual([]);
  });

  it('Delete method should remove the product', async () => {
    await pStore.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });
});