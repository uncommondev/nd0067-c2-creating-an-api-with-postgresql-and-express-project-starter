import supertest from "supertest";
import app from "../../server"

const request = supertest(app);

// app.get('/products', index)
// app.get('/products/:id', show)
// app.post('/products', create)
// app.put('/products', update)
// app.delete('/products', destroy)

// IDEA -- Add the delete handler at the beginning to run a "fresh" suite of tests
// OR instead add the delete test to the order spec

xdescribe("Product Handler Tests", () => {
    // CREATE - Moved to orderSpec.ts
    xit("Should creates a new order", async () => {
        const response = await request.post("/products").send({
            name: "The 5AM Club",
            price: 19.99
        })
        expect(response.status).toEqual(200)
    })
    
    // INDEX
    it("Should list all products", async () => {
        const response = await request.get("/products")
        expect(response.body).toEqual({
            id: 1,
            name: "The 5AM Club",
            price: 19.99
        })
    })

    // SHOW
    it("Should show an order with the ID of 1", async () => {
        const response = await request.get("/products/1")
        expect(response.body).toEqual({
            id: 1,
            name: "The 5AM Club",
            price: 19.99
        })
    })
    
    // UPDATE
    it("Should update the order", async () => {
        const response = await request.post("/products").send({
            id: 1,
            name: "The 5AM Club",
            price: 15.99
        })
        expect(response.status).toEqual(200)
    })

    // DELETE
    it("Should delete the order", async () => {
        const response = await request.delete("/products").send({
            id: 1
        })
        expect(response.status).toEqual(200)
    })
})