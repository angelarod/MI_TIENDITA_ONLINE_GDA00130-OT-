import bcrypt from 'bcrypt';
import { getConnection, sql } from "../database/connection.js";


const encryptPassword = async (password) => {           // con esto encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


export const createUser = async (req, res) => {             // para crear usuario
    const { correo_electronico, nombre_completo, contraseña, telefono, fecha_nacimiento } = req.body;

    try {
        const encryptedPassword = await encryptPassword(contraseña);
        
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('correo_electronico', sql.varchar, correo_electronico)
            .input('nombre_completo', sql.varchar, nombre_completo)
            .input('contraseña', sql.varchar, encryptedPassword)
            .input('telefono', sql.varchar, telefono)
            .input('fecha_nacimiento', sql.date, fecha_nacimiento)
            .query('INSERT INTO usuarios (correo_electronico, nombre_completo, contraseña, telefono, fecha_nacimiento) VALUES (@correo_electronico, @nombre_completo, @contraseña, @telefono, @fecha_nacimiento)');

        res.status(201).send("Usuario creado exitosamente");
    } catch (error) {
        res.status(500).send("Error al crear el usuario: " + error.message);
    }
};

export const updateUser = async (req, res) => {        // para actualizar usuario
    const { id } = req.params;
    const { correo_electronico, nombre_completo, contraseña, telefono, fecha_nacimiento } = req.body;

    try {
        const encryptedPassword = await encryptPassword(contraseña);

        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('correo_electronico', sql.varchar, correo_electronico)
            .input('nombre_completo', sql.varchar, nombre_completo)
            .input('contraseña', sql.varchar, encryptedPassword)
            .input('telefono', sql.varchar, telefono)
            .input('fecha_nacimiento', sql.date, fecha_nacimiento)
            .query('UPDATE usuarios SET correo_electronico = @correo_electronico, nombre_completo = @nombre_completo, contraseña = @contraseña, telefono = @telefono, fecha_nacimiento = @fecha_nacimiento WHERE idUsuario = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.send("Usuario actualizado exitosamente");
    } catch (error) {
        res.status(500).send("Error al actualizar el usuario: " + error.message);
    }
};
