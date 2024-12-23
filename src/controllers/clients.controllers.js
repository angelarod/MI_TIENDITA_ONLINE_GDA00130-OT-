import { getConnection, sql } from "../database/connection.js";

// Crear cliente
export const createClient = async (req, res) => {
    const { nombre, correo, telefono } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.VarChar, nombre)
            .input('correo', sql.VarChar, correo)
            .input('telefono', sql.VarChar, telefono)
            .query(
                'INSERT INTO clientes (nombre, correo, telefono) VALUES (@nombre, @correo, @telefono)'
            );

        res.status(201).json({
            message: "Cliente creado exitosamente",
            clientId: result.recordset[0]?.idCliente || null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message,
        });
    }
};

// Actualizar  cliente
export const updateClient = async (req, res) => {
    const { id } = req.params; // ID del cliente
    const { nombre, correo, telefono, direccion } = req.body; // Campos del cliente a actualizar

    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, nombre)
            .input("correo", sql.VarChar, correo)
            .input("telefono", sql.VarChar, telefono)
            .input("direccion", sql.VarChar, direccion)
            .query(`
                UPDATE clientes
                SET 
                    nombre = ISNULL(@nombre, nombre),
                    correo = ISNULL(@correo, correo),
                    telefono = ISNULL(@telefono, telefono),
                    direccion = ISNULL(@direccion, direccion)
                WHERE idCliente = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({
            message: "Cliente actualizado exitosamente",
            updatedFields: { nombre, correo, telefono, direccion },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message,
        });
    }
};

