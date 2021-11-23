import supertest from "supertest";
import app from "../../server"

const request = supertest(app);

// app.get('/orders', index)
// app.get('/orders/:id', show)
// app.post('/orders', create)
// app.put('/orders', update)
// app.post('/order/:id/products', addProduct)
// app.delete('/orders', destroy)

describe("Order Handler Tests", () => {
    // CREATE
    it("Should creates a new order", async () => {
        const response = await (await request.post("/orders")).body({
            user_id: 1,
            status: true
        })
        expect(response.status).toEqual(200)
    })
    
    // INDEX
    it("Should list all orders", async () => {
        const response = await request.get("/orders")
        expect(response.body).toEqual({
            id: 1,
            user_id: 1,
            status: true
        })
    })

    // SHOW
    it("Should show an order with the ID of 1", async () => {
        expect().toEqual({})
    })
    
    // UPDATE
    it("Should update the order", async () => {
        expect().toEqual({})
    })

    // DELETE
    it("Should delete the order", async () => {
        expect().toEqual({})
    })
})