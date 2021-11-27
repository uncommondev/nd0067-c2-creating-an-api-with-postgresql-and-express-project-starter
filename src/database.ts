import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_TEST_DB,
POSTGRES_USER,
POSTGRES_TEST_USER,
POSTGRES_PASSWORD,
POSTGRES_TEST_PASSWORD,
ENV,
TOKEN_SECRET
} = process.env

// "test": "ENV=test && db-migrate --en~v test reset && db-migrate --env test up && jasmine-ts && db-migrate --env test reset",
// "test-dev": "ENV=dev && db-migrate --env dev reset && db-migrate --env dev up && jasmine-ts && db-migrate --env dev reset",

let client: Pool = new Pool({
        host: POSTGRES_HOST,
        database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
        user: ENV === "dev" ? POSTGRES_USER : POSTGRES_TEST_USER,
        password: ENV === "dev" ? POSTGRES_PASSWORD : POSTGRES_TEST_PASSWORD
    })

console.log(`Current environment is: ${ENV}`)

// if (ENV === 'dev'){
//     client = new Pool({
//         host: POSTGRES_HOST,
//         database: POSTGRES_DB,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD
//     })
// }
// if (ENV === 'test'){
//     client = new Pool({
//         host: POSTGRES_HOST,
//         database: POSTGRES_TEST_DB,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD
//     })
// }

export default client