import { connect, query, disconnect } from '../connectors/daoMySql.js'
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js'



export const getPrograms = async (req, res) => {
    try {
        connect()
        query('SELECT * FROM program', [], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify(resp, null, 4))
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getProgram = async (req, res) => {
   try {
        connect()
        query('SELECT * FROM program  WHERE id=?', [req.params.id], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify(resp, null, 4))

            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}   


export const createProgram = async (req, res) => {
    try {
        connect()
        query('INSERT INTO program (title, description) VALUES (?, ?)', [req.body.title, req.body.description ], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'program created', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const updateProgram = async (req, res) => {
    try {
        connect()
        query('UPDATE program SET title=?, description=? WHERE id=?',
            [req.body.title, req.body.description, req.params.id], function () {
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
                res.end(JSON.stringify({ message: 'program updated', success: true }, null, 4))
                disconnect()
            })
      
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
   
}



export const deleteProgram = async (req, res) => {
    try {
        connect()
        query('DELETE FROM program WHERE id=?', [req.params.id], (result) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'program deleted', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

