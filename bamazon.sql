DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT (10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("L'Oreal mascara","Cosmetics",9.99,88),
("Morton Salt","Condiments",2.99,100),
("Red Bull","Beverages",3.99,200),
("Amazon Echo Dot","Electronics",50,300),
("Maybelline lipstick","Cosmetics",5.99,75),
("Hanes underwear- 5 pack","Apparel",12,100),
("Essie nail polish","Cosmetics",9.99,75),
("Cupcake wine","Beverages",8,89),
("Pringles","Food",4.50,100),
("Jergens lotion","Cosmetics",7.50,90),
("Orbit gum","Food",2,50),
("Halo Top ice cream","Food",5,50),
("Snickers","Food",3,75);



