import express, { Request, Response } from "express";
import { Order, OrderProduct, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization as string;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const orders = await store.show(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const op: OrderProduct = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
    };
    const addedProduct = await store.addProduct(op);
    res.status(200);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const indexProduct = async (req: Request, res: Response) => {
  try {
    const response = await store.indexProduct();
    res.status(200);
    res.send(response);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedProduct = await store.deleteProduct(id);
    res.status(200);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const updatedOrder = await store.update(order, id);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.status(200);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.put("/orders", update);
  app.post("/order/:id/products", addProduct);
  app.get("/order/products", indexProduct);
  app.delete("/order/:id/products", deleteProduct);
  app.delete("/orders/:id", destroy);
};

export default orderRoutes;
