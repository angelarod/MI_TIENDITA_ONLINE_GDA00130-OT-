import { getConnection, sql } from "../database/connection.js";

// Crear una orden (solo encabezado)
export const createOrder = async (req, res) => {
    const { clienteId, fecha, total } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('clienteId', sql.Int, clienteId)
            .input('fecha', sql.DateTime, fecha)
            .input('total', sql.Decimal, total)
            .query(
                'INSERT INTO ordenes (clienteId, fecha, total) VALUES (@clienteId, @fecha, @total)'
            );

        res.status(201).json({
            message: "Orden creada exitosamente",
            orderId: result.recordset[0]?.idOrden || null,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la orden",
            error: error.message,
        });
    }
};

// Actualizar una orden
export const updateOrder = async (req, res) => {
    const { id } = req.params; // ID de la orden
    const { clienteId, fechaOrden, estado } = req.body; // Campos del encabezado a actualizar

    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .input("clienteId", sql.Int, clienteId)
            .input("fechaOrden", sql.Date, fechaOrden)
            .input("estado", sql.VarChar, estado)
            .query(`
                UPDATE ordenes
                SET 
                    clienteId = ISNULL(@clienteId, clienteId),
                    fechaOrden = ISNULL(@fechaOrden, fechaOrden),
                    estado = ISNULL(@estado, estado)
                WHERE idOrden = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({
            message: "Orden actualizada exitosamente",
            updatedFields: { clienteId, fechaOrden, estado },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la orden",
            error: error.message,
        });
    }
};
