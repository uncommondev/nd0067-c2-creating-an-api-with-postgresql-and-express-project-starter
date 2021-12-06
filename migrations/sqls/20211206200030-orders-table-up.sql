/* Replace with your SQL commands 20211206195901 */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    status bool
);