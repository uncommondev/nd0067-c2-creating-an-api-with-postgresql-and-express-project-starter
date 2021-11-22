import client from "../database"

export type Order = {
    //id: number,
    user_id: number,
    status: boolean
}

export type OrderProduct = {
    //id: number,
    quantity: number,
    order_id: number,
    product_id: number
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
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch(error){
            throw new Error(`Could not create a new order ${error}`)
        }
    }

    // Update code - will need the ID for this (wonder if the code will also need to be updated)
    async update(o: Order, id: string): Promise<Order> {
        try{
            const sql = 'UPDATE orders SET user_id = $1, status = $2 WHERE id = $3'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [o.user_id, o.status, id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch(error){
            throw new Error(`Could not update order ${error}`)
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

    // order_product model functions

    async addProduct(op: OrderProduct): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
          const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id])
          const order = result.rows[0]
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`)
        }
      }

      async indexProduct(): Promise<OrderProduct[]> {
        try {
            // @ts-ignores
            const conn = await client.connect()
            const sql = 'SELECT * FROM order_products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
           throw new Error(`There was an error ${error}`)
        }
    }
    
      async deleteProduct(id: string) {
        try {
          const sql = 'DELETE FROM order_products WHERE id=($1)'
          //@ts-ignore
          const conn = await client.connect()
          const result = await conn.query(sql, [id])
          const order = result.rows[0]
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not delete order_product with ID ${id}: ${err}`)
        }
      }
}