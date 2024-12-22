import { getConnection, sql } from "../database/connection.js";


export const createProduct = async (req, res) => {              // para crear un producto
    const { nombre, descripcion, cantidad, precio } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.varchar, nombre)
            .input('descripcion', sql.text, descripcion)
            .input('cantidad', sql.int, cantidad)
            .input('precio', sql.Decimal, precio)
            .input('estado', sql.int, 1)                // 1 indica que esta Activo
            .query('INSERT INTO productos (nombre, descripcion, cantidad, precio, estados_idestados) VALUES (@nombre, @descripcion, @cantidad, @precio, @estado)');

        res.status(201).send("Producto creado exitosamente");
    } catch (error) {
        res.status(500).send("Error al crear el producto: " + error.message);
    }
};


export const updateProduct = async (req, res) => {                  // para actualizar producto
    const { id } = req.params;
    const { nombre, descripcion, cantidad, precio } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('nombre', sql.varchar, nombre)
            .input('descripcion', sql.text, descripcion)
            .input('cantidad', sql.int, cantidad)
            .input('precio', sql.Decimal, precio)
            .query('UPDATE productos SET nombre = @nombre, descripcion = @descripcion, cantidad = @cantidad, precio = @precio WHERE idProducto = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send("Producto no encontrado");
        }

        res.send("Producto actualizado exitosamente");
    } catch (error) {
        res.status(500).send("Error al actualizar el producto: " + error.message);
    }
};
