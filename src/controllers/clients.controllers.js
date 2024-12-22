import { getConnection, sql } from "../database/connection.js";

// Crear cliente
export const createClient = async (req, res) => {
    const { nombre, direccion, telefono, email } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.varchar, nombre)
            .input('direccion', sql.varchar, direccion)
            .input('telefono', sql.varchar, telefono)
            .input('email', sql.varchar, email)
            .query('INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (@nombre, @direccion, @telefono, @email)');

        res.status(201).send("Cliente creado exitosamente");
    } catch (error) {
        res.status(500).send("Error al crear el cliente: " + error.message);
    }
};

// Actualizar  cliente
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('nombre', sql.varchar, nombre)
            .input('direccion', sql.varchar, direccion)
            .input('telefono', sql.varchar, telefono)
            .input('email', sql.varchar, email)
            .query('UPDATE clientes SET nombre = @nombre, direccion = @direccion, telefono = @telefono, email = @email WHERE idCliente = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send("Cliente no encontrado");
        }

        res.send("Cliente actualizado exitosamente");
    } catch (error) {
        res.status(500).send("Error al actualizar el cliente: " + error.message);
    }
};
