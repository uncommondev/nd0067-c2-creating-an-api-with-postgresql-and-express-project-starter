import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  //id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`There was an error ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find the User${Error}`);
    }
  }

  async authenticate(id: string, password: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      result.rows[0];
      if (result.rows.length) {
        const user = result.rows[0];
        if (
          bcrypt.compareSync(
            password + process.env.BCRYPT_PASSWORD,
            user.password
          )
        ) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw new Error(`Could not find the User${Error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Could not create a new User ${error}`);
    }
  }

  async update(u: User, id: string): Promise<User> {
    try {
      const sql =
        "UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
        id,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Could not update user ${error}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user ${error}`);
    }
  }
}
