import { UserStore } from './../../models/user';
import { ProductStore } from './../../models/product';
import { OrderStore } from './../../models/order';

const oStore = new OrderStore()
const pStore = new ProductStore()
const uStore = new UserStore()

xdescribe("Check Model Functions Exist", () => {
    describe("User Model", () => {
        it('Should have an index method', () => {
          expect(uStore.index).toBeDefined();
        });
      
        it('Should have a show method', () => {
          expect(uStore.show).toBeDefined();
        });
      
        it('Should have a create method', () => {
          expect(uStore.create).toBeDefined();
        });
      
        it('Should have a update method', () => {
          expect(uStore.update).toBeDefined();
        });
      
        it('Should have a delete method', () => {
          expect(uStore.delete).toBeDefined();
        });
    })
    describe("Product Model", () => {
        it('Should have an index method', () => {
          expect(pStore.index).toBeDefined();
        });
      
        it('Should have a show method', () => {
          expect(pStore.show).toBeDefined();
        });
      
        it('Should have a create method', () => {
          expect(pStore.create).toBeDefined();
        });
      
        it('Should have a update method', () => {
          expect(pStore.update).toBeDefined();
        });
      
        it('Should have a delete method', () => {
          expect(pStore.delete).toBeDefined();
        });
    })
    describe("Order Model", () => {
        it('Should have an index method', () => {
          expect(oStore.index).toBeDefined();
        });
      
        it('Should have a show method', () => {
          expect(oStore.show).toBeDefined();
        });
      
        it('Should have a create method', () => {
          expect(oStore.create).toBeDefined();
        });
      
        it('Should have a update method', () => {
          expect(oStore.update).toBeDefined();
        });

        it("Should have a addProduct method", () => {
          expect(oStore.addProduct).toBeDefined();
        })
      
        it('Should have a delete method', () => {
          expect(oStore.delete).toBeDefined();
        });
    }) 
})

xdescribe("Check the CRUD functions for User, Product and Order Models", () => {
    describe("CREATE", () => {
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
            const result = await oStore.create({
                user_id: 1,
                status: true
            });
        
            expect(result).toEqual({
               // @ts-ignores
              id: 1,
              user_id: 1,
              status: true
            });
          });
        it('Add a product to and order', async () => {
            const result = await oStore.addProduct({
              quantity: 50,
              order_id: 1,
              product_id: 1
            })

            expect(result).toEqual({
              // @ts-ignores
              id: 1,
              quantity: 50,
              order_id: 1,
              product_id: 1
            })
        })
    })
    describe("INDEX", () => {
        it('Index method should return a list of users', async () => {
            const result = await uStore.index();
            expect(result).toEqual([{
               // @ts-ignores
               id: 1,
               firstname: "John",
               lastname: "Smith",
               password: "Password123"
            }]);
          });
        it('Index method should return a list of products', async () => {
            const result = await pStore.index();
            expect(result).toEqual([{
               // @ts-ignores
              id: 1,
              name: "Apprenticeship Patterns",
              price: 19.99
            }]);
          });
        it('Index method should return a list of orders', async () => {
            const result = await oStore.index();
            expect(result).toEqual([{
               // @ts-ignores
               id: 1,
               user_id: 1,
               status: true
            }]);
          });
    })
    describe("SHOW", () => {
        it('Show method should return the correct user', async () => {
            const result = await uStore.show("1");
            expect(result).toEqual({
               // @ts-ignores
               id: 1,
               firstname: "John",
               lastname: "Smith",
               password: "Password123"
            });
          });
        it('Show method should return the correct product', async () => {
            const result = await pStore.show("1");
            expect(result).toEqual({
               // @ts-ignores
              id: 1,
              name: "Apprenticeship Patterns",
              price: 19.99
            });
          });
        it('Show method should return the correct order', async () => {
            const result = await oStore.show("1");
            expect(result).toEqual({
               // @ts-ignores
               id: 1,
               user_id: 1,
               status: true
            });
          });
    })
    describe("UPDATE", () => {
      it("Update the order", async () => {
        await oStore.update({
          user_id: 1,
          status: false
        }, "1")
        const result = await oStore.show("1")
        expect(result).toEqual({
          // @ts-ignores
          id: 1,
          user_id: 1,
          status: false
        })
      })
      it("Update the product", async () => {
        await pStore.update({
          name: "Apprenticeship Patterns",
          price: 15.99
        }, "1")
        const result = await pStore.show("1")
        expect(result).toEqual({
          // @ts-ignores
          id: 1,
          name: "Apprenticeship Patterns",
          price: 15.99
        })
      })
      it("Update the user", async () => {
        await uStore.update({
          firstname: "John",
          lastname: "Smith",
          password: "123Password"
        }, "1")
        const result = await uStore.show("1")
        expect(result).toEqual({
          // @ts-ignores
          id: 1,
          firstname: "John",
          lastname: "Smith",
          password: "123Password"
        })
      })
    }) 
    describe("DELETE", () => {
        it('Delete the order in order_product', async () => {
          await oStore.deleteProduct("1")
          const result = await oStore.indexProduct()
          expect(result).toEqual([])
        })      
        it('Delete method should remove the order', async () => {
            await oStore.delete("1");
            const result = await oStore.index()
            expect(result).toEqual([]);
          });
        
        it('Delete method should remove the user', async () => {
            await uStore.delete("1")
            const result = await uStore.index()
            expect(result).toEqual([]);
          });
        
        it('Delete method should remove the product', async () => {
            await pStore.delete("1");
            const result = await pStore.index()
            expect(result).toEqual([]);
          });
    })
    
})