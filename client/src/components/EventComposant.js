import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EventComposant({ searchTerm }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/event')
      .then(response => {
        setEvents(response.data);
      });
  }, []);

  const handleDelete = () => {
    if (selectedEventId) {
      axios.delete(`http://localhost:4000/event/${selectedEventId}`)
        .then(() => {
          axios.get('http://localhost:4000/event')
            .then(response => {
              setEvents(response.data);
              setSelectedEventId(null);
            });
        });
    }
  };

  const handleEventSelect = (id) => {
    setSelectedEventId(selectedEventId === id ? null : id);
  };

  const filteredEvents = events.filter(event => 
    event.title && typeof event.title === 'string' && event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <div>
          <Link to="/event/create">
            <Button variant="primary" className="me-2">Créer</Button>
          </Link>
          {selectedEventId && (
            <>
              <Link to={`/event/edit/${selectedEventId}`}>
                <Button variant="success" className="me-2">Modifier</Button>
              </Link>
              <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
            </>
          )}
        </div>
      </div>

      {filteredEvents && (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Créé par</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td>
                  <input type="checkbox" checked={selectedEventId === event.id} onChange={() => handleEventSelect(event.id)} />
                </td>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventComposant;
