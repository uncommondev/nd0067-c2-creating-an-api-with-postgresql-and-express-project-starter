import { User, UserStore } from "./../models/user";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
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
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
    console.log(`Index Error`);
    console.log(error);
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
    const users = await store.show(req.params.id);
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
    console.log(`Show Error`);
    console.log(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization as string;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied");
    return;
  }
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const updatedUser = await store.update(user, id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const auth = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const authStatus = await store.authenticate(id, password);
    authStatus ? res.sendStatus(200) : res.sendStatus(401);
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

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.put("/users", update);
  app.post("/users/auth", auth);
  app.delete("/users/:id", destroy);
};

export default userRoutes;
