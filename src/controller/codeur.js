import { connect, query, disconnect } from '../connectors/daoMySql.js'
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js'



export const createCodeur = async (req, res) => {
    try {
        connect()
        query('INSERT INTO codeurs (firstname, lastname, experience) VALUES (?, ?, ?)', [req.body.firstname, req.body.lastname , req.body.experience], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
            res.end(JSON.stringify({ message: 'Codeur created', success: true }, null, 4))
            disconnect()
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}