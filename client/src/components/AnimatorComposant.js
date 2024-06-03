import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function AnimatorComposant({ searchTerm }) {
  const [animators, setAnimators] = useState([]);
  const [selectedAnimatorId, setSelectedAnimatorId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/animator')
      .then(response => {
        setAnimators(response.data);
      });
  }, []);

  const handleDelete = () => {
    if (selectedAnimatorId) {
      axios.delete(`http://localhost:4000/animator/${selectedAnimatorId}`)
        .then(() => {
          axios.get('http://localhost:4000/animator')
            .then(response => {
              setAnimators(response.data);
              setSelectedAnimatorId(null);
            });
        });
    }
  };

  const handleAnimatorSelect = (id) => {
    setSelectedAnimatorId(selectedAnimatorId === id ? null : id);
  };

  const filteredAnimators = animators.filter(animator => 
    animator.full_name && typeof animator.full_name === 'string' && animator.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <div>
          <Link to="/animator/create">
            <Button variant="primary" className="me-2">Créer</Button>
          </Link>
          {selectedAnimatorId && (
            <>
              <Link to={`/animator/edit/${selectedAnimatorId}`}>
                <Button variant="success" className="me-2">Modifier</Button>
              </Link>
              <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
            </>
          )}
        </div>
      </div>

      {filteredAnimators && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Login</th>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Google ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnimators.map(animator => (
              <tr key={animator.id}>
                <td>
                  <input type="checkbox" checked={selectedAnimatorId === animator.id} onChange={() => handleAnimatorSelect(animator.id)} />
                </td>
                <td>{animator.id}</td>
                <td>{animator.login}</td>
                <td>{animator.full_name}</td>
                <td>{animator.email}</td>
                <td>{animator.google_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AnimatorComposant;
