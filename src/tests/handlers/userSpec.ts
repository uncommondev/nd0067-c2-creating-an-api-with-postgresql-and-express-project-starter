import supertest from "supertest";
import app from "../../server"

const request = supertest(app);

describe("User Handler Tests", () => {
    // DELETE
    xit("Should delete the user", async () => {
        const response = await request.delete("/users").send({
            "id": 2
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })    

    // CREATE - Moved to orderSpec.ts
    it("Should creates a new user", async () => {
        const response = await request.post("/users").send({
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })
    
    // INDEX
    it("Should list all users", async () => {
        const response = await request.get("/users").set('Content-type', 'application/json')
        expect(response.body[0]).toEqual({
            "id": 2,
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        })
    })

    // SHOW
    it("Should show an user with the ID of 1", async () => {
        const response = await request.get("/users/2").set('Content-type', 'application/json')
        expect(response.body).toEqual({
            "id": 2,
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        })
    })
    
    // UPDATE
    it("Should update the user", async () => {
        const response = await request.put("/users").send({
            "id": 2,
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })

    // DELETE
    it("Should delete the user", async () => {
        const response = await request.delete("/users/2").set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })
})