import dotenv from 'dotenv';
import assert from 'assert'; // assert is a nodejs module that validates if a condition is true or false

dotenv.config();

const { PORT, HOST, URL, USER, PASSWORD, DATABASE, SERVER, JWT_SECRET } = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPTED === "true";

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
 // this loads the variables from .env into process.env

const config = {
    port: PORT,
    host: HOST,
    url: URL,
    sql: {
        server: SERVER,
        database: DATABASE,
        user: USER,
        password: PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        }
    },
    jwt_secret: JWT_SECRET
};



export default config;