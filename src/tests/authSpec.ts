import supertest from "supertest";
import { UserStore } from "../models/user";
import app from "../server"

const request = supertest(app);
const store = new UserStore()

// Plan of action --> 

// IDEA --> Use the ID as the login variable
// Check the usermmodel for what we'll be working with (could cheat like the banks and use the last name as the username or firstname+password) 
// Create a variable that we can export with the JWT (console.log it)
// Create the unit tests to make sure it runs

// CREATE USER -->

// AUTHENTICATE -->

// Create a user, this returns the JWT (like a cookie) --> Authenticate checks the password (shouldn't that create a JWT?) --> Function in place to check the JWT is valid
describe("Authentication Tests", () => {
    it("Should creates a new user", async () => {
        const response = await request.post("/users").send({
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })
    it("Should authenticate a user (MODEL)", async () => {
            const result = await store.authenticate("1", "Windows123");
            expect(result).toEqual({
                // @ts-ignore
                "id": "1",
                "password": "Windows123"
            });
    })
    it("Should authenticate a user (HANDLER)", async () => {
        const response = await request.post("/users/auth").send({
            "id": "1",
            "password": "Windows123"
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual({
            // @ts-ignore
            "id": "1",
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        })
    })
})