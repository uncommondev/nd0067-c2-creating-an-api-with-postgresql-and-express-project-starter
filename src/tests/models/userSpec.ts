import { User, UserStore } from './../../models/user';

const store = new UserStore()

describe("User Model", () => {
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

  it('Create method should add a user', async () => {
    const result = await store.create({
      firstName: "John",
      lastName: "Smith",
      password: "Password123"
    });
    expect(result).toEqual({
       // @ts-ignores
      id: 1,
      firstName: "John",
      lastName: "Smith",
      password: "Password123"
    });
  });

  it('Index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([{
       // @ts-ignores
       id: 1,
       firstName: "John",
       lastName: "Smith",
       password: "Password123"
    }]);
  });

  it('Show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
       // @ts-ignores
       id: 1,
       firstName: "John",
       lastName: "Smith",
       password: "Password123"
    });
  });

  it('Delete method should remove the user', async () => {
    store.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });
});