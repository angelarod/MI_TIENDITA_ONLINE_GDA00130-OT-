import { getConnection, sql } from "../database/connection.js";

// Crear una orden (solo encabezado)
export const createOrder = async (req, res) => {
    const { usuarios_idusuarios, clientes_idClientes, total_orden, fecha_entrega } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('usuarios_idusuarios', sql.Int, usuarios_idusuarios)
            .input('clientes_idClientes', sql.Int, clientes_idClientes)
            .input('total_orden', sql.Decimal, total_orden)
            .input('fecha_entrega', sql.date, fecha_entrega)
            .query('INSERT INTO orden (usuarios_idusuarios, clientes_idClientes, total_orden, fecha_entrega, estados_idestados) VALUES (@usuarios_idusuarios, @clientes_idClientes, @total_orden, @fecha_entrega, 1)'); // Activo

        res.status(201).send("Orden creada exitosamente");
    } catch (error) {
        res.status(500).send("Error al crear la orden: " + error.message);
    }
};

// Actualizar una orden
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { usuarios_idusuarios, clientes_idClientes, total_orden, fecha_entrega } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('usuarios_idusuarios', sql.Int, usuarios_idusuarios)
            .input('clientes_idClientes', sql.Int, clientes_idClientes)
            .input('total_orden', sql.Decimal, total_orden)
            .input('fecha_entrega', sql.date, fecha_entrega)
            .query('UPDATE orden SET usuarios_idusuarios = @usuarios_idusuarios, clientes_idClientes = @clientes_idClientes, total_orden = @total_orden, fecha_entrega = @fecha_entrega WHERE idOrden = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send("Orden no encontrada");
        }

        res.send("Orden actualizada exitosamente");
    } catch (error) {
        res.status(500).send("Error al actualizar la orden: " + error.message);
    }
};
