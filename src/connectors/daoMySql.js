'use strict';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment Variables:', {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

let connection = {};

export function connect() {
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to Db:', err);
            throw err;
        }
        console.log('Connection ESTABLISHED');
    });
}

export function query(query, values, resultCallback) {
    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            throw error;
        }
        resultCallback(result);
    });
}

export function disconnect() {
    console.log('Connection ENDED');
    connection.end((err) => {
        if (err) {
            console.error('Error ending connection:', err);
            throw err;
        }
    });
}
