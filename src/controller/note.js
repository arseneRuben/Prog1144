import { connect, query, disconnect } from '../connectors/daoMySql.js'
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js'



export const getNotes = async (req, res) => {
    try {
        connect()
        query('SELECT * FROM notes', [], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify(resp, null, 4))
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createNote = async (req, res) => {
    try {
        connect()
        query('INSERT INTO notes (title, contents) VALUES (?, ?)', [req.body.title, req.body.contents ], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'Note created', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNote = async (req, res) => {
   try {
        connect()
        query('SELECT * FROM notes  WHERE id=?', [req.params.id], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify(resp, null, 4))

            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}   

export const updateNote = async (req, res) => {
    try {
        connect()
        query('UPDATE notes SET title=?, contents=? WHERE id=?',
            [req.body.title, req.body.contents, req.params.id], function () {
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
                res.end(JSON.stringify({ message: 'Note updated', success: true }, null, 4))
                disconnect()
            })
      
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
   
}







export const deleteNote = async (req, res) => {
    try {
        connect()
        query('DELETE  FROM notes WHERE id=?', [req.params.id], (result) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'Note deleted', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
