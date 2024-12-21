import sql from 'mssql'

const dbSettings ={
    user: 'sa',
    Password : 'yourStronger#Password',
    server: 'localhost',
    database: 'GDA00130_OT_AngelaRodriguez',
    options:{
        encrypt: false,
        trustServerCertificate: true,
    }
};

export const getConnection = async() => {
  try{
    const pool = await sql.connect(dbSettings);
    return pool;
  }  catch(error){
    console.error(error);
  }
};

