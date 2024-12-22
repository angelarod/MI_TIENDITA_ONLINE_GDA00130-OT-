--CREATE database webstore

use webstore;

CREATE TABLE producst(
    id INT IDENTITY (1,1) primary key,
    nombre VARCHAR(100) not NULL,
    price decimal (10,2),
    quantity INT,
    descripcion text
);