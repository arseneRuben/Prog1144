import { connect, query, disconnect } from '../connectors/daoMySql.js';
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js';

// ======================================================

export const createPodcast = async (req, res) => {
    try {
        connect();
        query('INSERT INTO podcasts (title, description, filename, langue, id_program, id_presentation) VALUES (?, ?, ?, ?, ?, ?)', 
            [req.body.title, req.body.description, req.body.filename, req.body.langue, req.body.id_program, req.body.id_presentation], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Podcast created', success: true }, null, 3));
            disconnect();
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ======================================================

export const getPodcasts = async (req, res) => {
    try {
        connect();
        query('SELECT * FROM podcasts', [], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify(resp, null, 4));
            disconnect();
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ======================================================

export const getPodcast = async (req, res) => {
    try {
        connect();
        query('SELECT * FROM podcasts WHERE id=?', [req.params.id], (resp) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify(resp, null, 4));
            disconnect();
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ======================================================

export const updatePodcast = async (req, res) => {
    try {
        connect();
        query('UPDATE podcasts SET title=?, description=?, filename=?, langue=?, id_program=?, id_presentation=? WHERE id=?',
            [req.body.title, req.body.description, req.body.filename, req.body.langue, req.body.id_program, req.body.id_presentation, req.params.id], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Podcast updated', success: true }, null, 3));
            disconnect();
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ======================================================

export const deletePodcast = async (req, res) => {
    try {
        connect();
        query('DELETE FROM podcasts WHERE id=?', [req.params.id], (result) => {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Podcast deleted', success: true }, null, 4));
            disconnect();
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


