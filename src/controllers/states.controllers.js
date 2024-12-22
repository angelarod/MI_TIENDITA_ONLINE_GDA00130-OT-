import { getConnection, sql } from "../database/connection.js";


export const createState = async (req, res) => {            // para crear un estado
    const { nombre } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('nombre', sql.varchar, nombre)
            .query('INSERT INTO estados (nombre) VALUES (@nombre)');

        res.status(201).send("Estado creado exitosamente");
    } catch (error) {
        res.status(500).send("Error al crear el estado: " + error.message);
    }
};


export const updateState = async (req, res) => {                // para actualizar un estado
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('nombre', sql.varchar, nombre)
            .query('UPDATE estados SET nombre = @nombre WHERE idEstados = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send("Estado no encontrado");
        }

        res.send("Estado actualizado exitosamente");
    } catch (error) {
        res.status(500).send("Error al actualizar el estado: " + error.message);
    }
};
