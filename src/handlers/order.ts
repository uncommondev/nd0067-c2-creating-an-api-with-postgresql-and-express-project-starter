import express, {Request, Response} from "express";
import { Order, OrderProduct, OrderStore } from "../models/order";

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    // const order_id: number = parseInt(_req.params.order_id)
    // const product_id: number = _req.body.product_id
    // const quantity: number = parseInt(_req.body.quantity)
    const op: OrderProduct = {
        quantity: _req.body.quantity,
        order_id: _req.body.order_id,
        product_id: _req.body.product_id
    }
  
    try {
      const addedProduct = await store.addProduct(op)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
} 

const update = async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }
        const updatedOrder = await store.update(order, id)
        res.json(updatedOrder)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.put('/orders', update)
    app.post('/order/:id/products', addProduct)
    app.delete('/orders', destroy)
}

export default orderRoutes