/* Replace with your SQL commands */

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    price FLOAT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR(100)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    status bool
);

CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id),
    quantity int
);
