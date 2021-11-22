import { Product, ProductStore } from './../models/product';
import express, {Request, Response} from "express";

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.body.id)
        res.json(product)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const updatedProduct = await store.update(product, id)
        res.json(updatedProduct)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.put('/products', update)
    app.delete('/products', destroy)
}

export default productRoutes