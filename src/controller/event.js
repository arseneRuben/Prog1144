import { connect, query, disconnect } from '../connectors/daoMySql.js';
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js';

// Obtenir tous les événements
export const getEvents = async (req, res) => {
    try {
        connect();
        query('SELECT * FROM Event', [], (err, resp) => {
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

// Créer un événement
export const createEvent = async (req, res) => {
    try {
        connect();
        query('INSERT INTO Event (title, description, date, location, createdBy) VALUES (?, ?, ?, ?, ?)', 
            [req.body.title, req.body.description, req.body.date, req.body.location, req.body.createdBy], (err, resp) => {
                disconnect();
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
                res.end(JSON.stringify({ message: 'Event created', success: true }, null, 4));
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Obtenir un événement spécifique
export const getEvent = async (req, res) => {
    try {
        connect();
        query('SELECT id, title, description, date, location, createdBy FROM Event WHERE id=?', 
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

// Mettre à jour un événement
export const updateEvent = async (req, res) => {
    try {
        connect();
        query('UPDATE Event SET title=?, description=?, date=?, location=?, createdBy=? WHERE id=?',
            [req.body.title, req.body.description, req.body.date, req.body.location, req.body.createdBy, req.params.id], (err, resp) => {
                disconnect();
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
                res.end(JSON.stringify({ message: 'Event updated', success: true }, null, 4));
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Supprimer un événement
export const deleteEvent = async (req, res) => {
    try {
        connect();
        query('DELETE FROM Event WHERE id=?', [req.params.id], (err, resp) => {
            disconnect();
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Event deleted', success: true }, null, 4));
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
