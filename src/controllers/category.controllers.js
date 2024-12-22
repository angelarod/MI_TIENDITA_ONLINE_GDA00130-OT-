import { getConnection, sql } from "../database/connection.js";

export const getCategories = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM caterogiraProductos');
    res.json(result.recordset);
  };
  
  export const getCategory = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM caterogiraProductos WHERE idCategoriaProductos = @id');
    res.json(result.recordset);
  };


  export const createCategory = async (req, res) => {
    const { nombre, usuarioId, estadoId } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('nombre', sql.Varchar, nombre)
      .input('usuarioId', sql.Int, usuarioId)
      .input('estadoId', sql.Int, estadoId)
      .query('INSERT INTO caterogiraProductos (nombre, usuarios_idusuarios, estados_idestados) VALUES (@nombre, @usuarioId, @estadoId)');
    res.json({ message: 'Categoría creada exitosamente' });
  };
  
  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nombre, usuarioId, estadoId } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('nombre', sql.Varchar, nombre)
      .input('usuarioId', sql.Int, usuarioId)
      .input('estadoId', sql.Int, estadoId)
      .query('UPDATE caterogiraProductos SET nombre = @nombre, usuarios_idusuarios = @usuarioId, estados_idestados = @estadoId WHERE idCategoriaProductos = @id');
    res.json({ message: 'Categoría actualizada exitosamente' });
  };