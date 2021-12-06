/* Replace with your SQL commands 20211206200041 */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id),
    quantity int
);
