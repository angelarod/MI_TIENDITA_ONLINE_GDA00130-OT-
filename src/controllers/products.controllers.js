import {getConnection} from '../database/connection.js'

export const getProducts = (req, res)=>{
    const pool = await getConnection()
    
    res.send('obteniendo productos');
}

export const getProduct = (req, res)=>{
    res.send('obteniendo un productos');
}

export const createProduct = (req, res)=>{
    res.send('creando un producto');
}

export const actProduct = (req, res)=>{
    res.send('actualizando un producto');
}

export const deleteProduct = (req, res)=>{
    res.send('eliminando un prodcuto');
}