import { Order, OrderStore } from './../../models/order';

const store = new OrderStore()

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

  it('Create method should add a order', async () => {
    const result = await store.create({
        product_id: [1],
        quantity: 50,
        user_id: 1,
        status: true
    });
    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      product_id: [1],
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
       product_id: [1],
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
       product_id: [1],
       quantity: 50,
       user_id: 1,
       status: true
    });
  });

  it('Delete method should remove the order', async () => {
    store.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });
});