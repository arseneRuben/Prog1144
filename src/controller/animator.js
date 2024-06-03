import { connect, query, disconnect } from '../connectors/daoMySql.js';
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js';

// Obtenir tous les animateurs
export const getAnimators = async (req, res) => {
    try {
        connect();
        query('SELECT * FROM animator', [], (err, resp) => {
            disconnect();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify(resp, null, 4));
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Créer un animateur
export const createAnimator = async (req, res) => {
    try {
        connect();
        query('INSERT INTO animator (login, pwd, full_name, google_id, email) VALUES (?, ?, ?, ?, ?)', 
            [req.body.login, req.body.pwd, req.body.full_name, req.body.google_id, req.body.email], (err, resp) => {
                disconnect();
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
                res.end(JSON.stringify({ message: 'Animator created', success: true }, null, 4));
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Obtenir un animateur spécifique
export const getAnimator = async (req, res) => {
    try {
        connect();
        query('SELECT id, login, full_name, google_id, email FROM animator WHERE id=?', 
            [req.params.id], (err, resp) => {
                disconnect();
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
                res.end(JSON.stringify(resp, null, 4));
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Mettre à jour un animateur
export const updateAnimator = async (req, res) => {
    try {
        connect();
        query('UPDATE animator SET login=?, pwd=?, full_name=?, google_id=?, email=? WHERE id=?',
            [req.body.login, req.body.pwd, req.body.full_name, req.body.google_id, req.body.email, req.params.id], (err, resp) => {
                disconnect();
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
                res.end(JSON.stringify({ message: 'Animator updated', success: true }, null, 4));
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Supprimer un animateur
export const deleteAnimator = async (req, res) => {
    try {
        connect();
        query('DELETE FROM animator WHERE id=?', [req.params.id], (err, resp) => {
            disconnect();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Animator deleted', success: true }, null, 4));
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
