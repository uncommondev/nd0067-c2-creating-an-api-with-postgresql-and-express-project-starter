/* Replace with your SQL commands */
-- CREATE database "storefront";
-- CREATE database "storefront_test";

/* Create tables for Dev*/

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    price FLOAT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer,
    user_id bigint REFERENCES users(id),
    status bool
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(100)
);

/* Create tables for test */