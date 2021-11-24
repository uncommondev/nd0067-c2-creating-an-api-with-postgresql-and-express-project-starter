import client from "../database"

export type User = {
    //id: number;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignores
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
           throw new Error(`There was an error ${error}`)
        }
    }

    async show(id: string): Promise<User> {
        try{
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(error) {
            throw new Error(`Could not find the User${Error}`)
        }
    }

    async create(u: User): Promise<User> {
        try{
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(error){
            throw new Error(`Could not create a new User ${error}`)
        }
    }

    async update(u: User, id: string): Promise<User> {
        try{
            const sql = 'UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password, id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(error){
            throw new Error(`Could not update user ${error}`)
        }
    }

    async delete(id: string) {
        try {
            const sql = 'DELETE FROM "users" WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(error){
            throw new Error(`Could not delete user ${error}`)
        }
    }
}