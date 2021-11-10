import express, {Request, Response} from "express";
import { Order, OrderStore } from "../models/order";

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
            product_id: req.body.product_id,
            quantity: req.body.quantity,
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

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.get('/orders', create)
    app.get('/orders', destroy)
}

export default orderRoutes