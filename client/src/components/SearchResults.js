import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`http://localhost:4000/search?query=${searchTerm}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des résultats de recherche', error);
        });
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>Résultats de la recherche pour "{searchTerm}"</h2>
      {results.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Nom</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.type}</td>
                <td>{result.name}</td>
                <td>{result.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aucun résultat trouvé</p>
      )}
    </div>
  );
}

export default SearchResults;
