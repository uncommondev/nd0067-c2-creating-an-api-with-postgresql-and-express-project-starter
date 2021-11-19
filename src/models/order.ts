import client from "../database"

export type Order = {
    //id: number,
    product_id: number,
    quantity: number,
    user_id: number,
    status: boolean
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignores
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
           throw new Error(`There was an error ${error}`)
        }
    }

    async show(id: string): Promise<Order> {
        try{
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch(error) {
            throw new Error(`Could not find the order${Error}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try{
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch(error){
            throw new Error(`Could not create a new order ${error}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
          const result = await conn.query(sql, [quantity, orderId, productId])
          const order = result.rows[0]
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch(error){
            throw new Error(`Could not delete book ${error}`)
        }
    }
}