import supertest from "supertest";
import app from "../../server"

const request = supertest(app);

// app.get('/users', index)
// app.get('/users/:id', show)
// app.post('/users', create)
// app.put('/users', update)
// app.post('/order/:id/products', addProduct)
// app.delete('/users', destroy)

xdescribe("User Handler Tests", () => {
    // CREATE - Moved to orderSpec.ts
    xit("Should creates a new order", async () => {
        const response = await request.post("/users").send({
            firstname: "Tim",
            lastname: "Apple",
            password: "iPhone123",
        })
        expect(response.status).toEqual(200)
    })
    
    // INDEX
    it("Should list all users", async () => {
        const response = await request.get("/users")
        expect(response.body).toEqual({
            id: 1,
            firstname: "Tim",
            lastname: "Apple",
            password: "iPhone123",
        })
    })

    // SHOW
    it("Should show an order with the ID of 1", async () => {
        const response = await request.get("/users/1")
        expect(response.body).toEqual({
            id: 1,
            firstname: "Tim",
            lastname: "Apple",
            password: "iPhone123",
        })
    })
    
    // UPDATE
    it("Should update the order", async () => {
        const response = await request.post("/users").send({
            id: 1,
            firstname: "Tim",
            lastname: "Apple",
            password: "iPhone123",
        })
        expect(response.status).toEqual(200)
    })

    // DELETE
    it("Should delete the order", async () => {
        const response = await request.delete("/users").send({
            id: 1
        })
        expect(response.status).toEqual(200)
    })
})