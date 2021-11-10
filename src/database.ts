import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_TEST_DB,
POSTGRES_USER,
POSTGRES_PASSWORD,
ENV
} = process.env

let client: Pool = ENV === 'dev' ? new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    }) : new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
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