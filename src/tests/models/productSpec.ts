import { Product, ProductStore } from './../../models/product';

const store = new ProductStore()

describe("Product Model", () => {
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

  it('Create method should add a product', async () => {
    const result = await store.create({
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

  it('Index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
       // @ts-ignores
      id: 1,
      name: "Apprenticeship Patterns",
      price: 19.99
    }]);
  });

  it('Show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      name: "Apprenticeship Patterns",
      price: 19.99
    });
  });

  it('Delete method should remove the product', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});