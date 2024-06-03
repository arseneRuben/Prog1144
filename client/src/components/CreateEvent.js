import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CreateEvent() {
  const initialFormState = { title: '', description: '', date: '', location: '', createdBy: '' };
  const [form, setForm] = useState(initialFormState);
  const [animators, setAnimators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/animator')
      .then(response => {
        setAnimators(response.data);
      });
  }, []);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    axios.post('http://localhost:4000/event', form)
      .then(() => {
        navigate('/event'); // Redirige vers la liste des événements après la création
      });
  };

  return (
    <div>
      <h2>Créer un nouvel événement</h2>
      <form className="mb-3">
        <div className="mb-3">
          <label className="form-label">Titre:</label>
          <input type="text" name="title" value={form.title} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input type="text" name="description" value={form.description} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input type="datetime-local" name="date" value={form.date} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Lieu:</label>
          <input type="text" name="location" value={form.location} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Créé par (User ID):</label>
          <select name="createdBy" value={form.createdBy} onChange={handleFormChange} className="form-control">
            <option value="">Sélectionner un animateur</option>
            {animators.map(animator => (
              <option key={animator.id} value={animator.id}>
                {animator.full_name} ({animator.email})
              </option>
            ))}
          </select>
        </div>
        <Button variant="primary" onClick={handleCreate}>Créer</Button>
      </form>
    </div>
  );
}

export default CreateEvent;
