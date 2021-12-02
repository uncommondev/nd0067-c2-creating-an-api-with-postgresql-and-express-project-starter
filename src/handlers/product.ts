import { Product, ProductStore } from './../models/product';
import express, {Request, Response} from "express";
import jwt from "jsonwebtoken"

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    } catch (error) {
        res.status(400)
        res.json(error)
        console.log(`Index Error`)
        console.log(error)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(400)
        res.json(error)
        console.log(`Show Error`)
        console.log(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }    
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
    try {
        const deleted = await store.delete(req.params.id)
        res.status(200)
        res.json(deleted)
    } catch(error) {
        res.status(400)
        res.json(error)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.put('/products', update)
    app.delete('/products/:id', destroy)
}

export default productRoutes