import client from "../database"

export type Product = {
    //id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignores
            const conn = await client.connect()
            const sql = 'SELECT * FROM "products"'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
           throw new Error(`There was an error ${error}`)
        }
    }

    async show(id: string): Promise<Product> {
        try{
            const sql = 'SELECT * FROM "products" WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(error) {
            throw new Error(`Could not find the product${Error}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try{
            const sql = 'INSERT INTO "products" (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price])
            const product = result.rows[0]
            conn.release()
            return product
        } catch(error){
            throw new Error(`Could not create a new product ${error}`)
        }
    }

    async update(p: Product, id: string): Promise<Product> {
        try{
            const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price, id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch(error){
            throw new Error(`Could not update product ${error}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(error){
            throw new Error(`Could not delete product ${error}`)
        }
    }
}