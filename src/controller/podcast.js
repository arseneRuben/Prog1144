import { connect, query, disconnect } from '../connectors/daoMySql.js';
import { CONTENT_TYPE_JSON, HTTP_OK } from '../dao/util.js';

// ======================================================

export const createPodcast = async (req, res) => {
    try {
        connect();
        query('INSERT INTO podcasts (title, description, contents) VALUES (?, ?, ?)', 
            [req.body.title, req.body.description, req.body.contents], function () {
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
        query('UPDATE podcast SET title=?, description=?, contents=?, idCodeur=? WHERE id=?',
            [req.body.title, req.body.description, req.body.contents, req.body.idCodeur, req.params.id], function () {
            res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON });
            res.end(JSON.stringify({ message: 'Podcast updated', success: true }, null, 4));
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


