import { connect, query, disconnect } from '../connectors/daoMySql.js';

export const searchAll = (req, res) => {
  const searchTerm = req.query.query;
  const sql = `
    SELECT 'animator' AS type, full_name AS name, email AS description FROM animator WHERE full_name LIKE ? 
    UNION
    SELECT 'event' AS type, title AS name, description FROM event WHERE title LIKE ?
  `;
  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  connect();
  query(sql, values, (err, results) => {
    disconnect();
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};
