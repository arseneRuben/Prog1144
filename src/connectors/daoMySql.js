
'use strict'
import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config({ })

let connection = {}

export function connect () {
    connection = mysql.createConnection({
        host:  process.env.MYSQL_HOST ,
        user: process.env.MYSQL_USER ,
        password: process.env.MYSQL_PASSWORD ,
        database: process.env.MYSQL_DATABASE,
    })
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to Db')
            throw err
        }
        console.log('Connection ESTABLISHED')
    })
}
export function query (query, values, resultCallback) {
    connection.query(query, values, (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result)
    })
}

export function disconnect () {
    console.log('Connection ENDED')
    connection.end()
}
