import mysql from "mysql2";
import 'dotenv/config'

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'school_management'
});

export default connection;