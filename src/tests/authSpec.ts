import { Response } from "express";
import supertest from "supertest";
import checkAuthorisation from "../checkAuthorisation";
import { UserStore } from "../models/user";
import app from "../server"

const request = supertest(app);
const store = new UserStore()

let test_jwt = ""
describe("Authentication Tests", () => {
    it("Should creates a new user", async () => {
        const response = await request.post("/users").send({
            "firstname": "William",
            "lastname": "Gates",
            "password": "Windows123",
        }).set('Content-type', 'application/json')
        test_jwt = response.body
        console.log(`Test JWT`)
        console.log(test_jwt)
        expect(response.status).toEqual(200)
    })
    it("Should authenticate a user (MODEL)", async () => {
            const result = await store.authenticate("1", "Windows123");
            expect(result).toEqual(true);
    })
    it("Should authenticate a user (HANDLER)", async () => {
        const response = await request.post("/users/auth").send({
            "id": "1",
            "password": "Windows123"
        }).set('Content-type', 'application/json')
        expect(response.status).toEqual(200)
    })
    it("Should verify the JWT is valid", async () => {
        const result = await checkAuthorisation(test_jwt)
        expect(result).not.toThrowError
    })
})