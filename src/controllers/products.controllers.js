import { getConnection, sql } from "../database/connection.js";


export const getProducts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM productos WHERE estados_idestados = 1');
    res.json(result.recordset);
};
  
export const getProduct = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM productos WHERE idProducto = @id');
    res.json(result.recordset);
};
  

export const createProduct = async (req, res) => { // Para crear un producto
    const { nombre, descripcion, cantidad, precio } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Decimal, precio)
            .input('estado', sql.Int, 1) // 1 indica que está Activo
            .query(
                'INSERT INTO productos (nombre, descripcion, cantidad, precio, estados_idestados) VALUES (@nombre, @descripcion, @cantidad, @precio, @estado)'
            );

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.recordset[0]?.idProducto || null, // Devuelve el ID si está disponible
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message,
        });
    }
};

export const updateProduct = async (req, res) => { // Para actualizar un producto
    const { id } = req.params;
    const { nombre, descripcion, cantidad, precio } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('cantidad', sql.Int, cantidad)
            .input('precio', sql.Decimal, precio)
            .query(
                'UPDATE productos SET nombre = @nombre, descripcion = @descripcion, cantidad = @cantidad, precio = @precio WHERE idProducto = @id'
            );

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                message: "Producto no encontrado",
            });
        }

        res.json({
            message: "Producto actualizado exitosamente",
            updatedFields: { nombre, descripcion, cantidad, precio },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto",
            error: error.message,
        });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .query('UPDATE productos SET estados_idestados = 0 WHERE idProducto = @id');
    res.json({ message: 'Producto inactivado exitosamente' });
  };