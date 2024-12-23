import { getConnection, sql } from "../database/connection.js";


export const createEstado = async (req, res) => {
    const { nombre } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.VarChar, nombre)
            .query('INSERT INTO estados (nombre) VALUES (@nombre)');

        res.status(201).json({
            message: "Estado creado exitosamente",
            estadoId: result.recordset[0]?.idEstado || null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el estado",
            error: error.message,
        });
    }
};

export const updateEstado = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .query('UPDATE estados SET nombre = @nombre WHERE idEstado = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                message: "Estado no encontrado",
            });
        }

        res.json({
            message: "Estado actualizado exitosamente",
            updatedFields: { nombre },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el estado",
            error: error.message,
        });
    }
};

