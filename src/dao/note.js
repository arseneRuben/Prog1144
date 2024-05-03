import { connect, query, disconnect } from '../connectors/daoMySql.js'
import { CONTENT_TYPE_JSON, HTTP_OK, LIMIT } from './util.js'

export const createFolder = async (req, res) => {
    try {
        connect()
        query('INSERT INTO folders (programId, customerId,consultantId, folderNumber, lastVisit, comments) VALUES (?,?,?,?, ?,? )', [req.body.programId, req.body.customerId,req.body.consultantId,req.body.folderNumber, Date.now(), req.body.comments ], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'Fodler created', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const deleteFolder = async (req, res) => {
    try {
        connect()
        query('DELETE FROM folders WHERE id=?', [req.params.id], (result) => {
            if(result.affectedRows == 0) {
                return res.status(404).json({
                    message: 'Folder not found'
                })
            }
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'Folder deleted', success: true }, null, 4))
        })
        disconnect()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getFolderById = async (req, res) => {
    try {
            connect()
                query('SELECT * FROM folders WHERE id=?', [req.params.id], (resp) => {
                    if(resp.length > 0) {
                    res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
                    res.end(JSON.stringify(resp[0], null, 4))
                } else {
                    res.status(404).json({message: 'Folder not found'})
                }
            disconnect()                            
            } 
        )
    }catch (error) {
        res.status(404).json({ message: error.message })
    }
}

