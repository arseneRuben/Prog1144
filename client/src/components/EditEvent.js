import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EditEvent() {
  const initialFormState = { title: '', description: '', date: '', location: '', createdBy: '' };
  const [form, setForm] = useState(initialFormState);
  const [animators, setAnimators] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/event/${id}`)
      .then(response => {
        setForm(response.data[0]);
      });

    axios.get('http://localhost:4000/animator')
      .then(response => {
        setAnimators(response.data);
      });
  }, [id]);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    axios.patch(`http://localhost:4000/event/${id}`, form)
      .then(() => {
        navigate('/event'); // Redirige vers la liste des événements après la modification
      });
  };

  return (
    <div>
      <h2>Modifier l'événement</h2>
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
        <Button variant="success" onClick={handleUpdate}>Modifier</Button>
      </form>
    </div>
  );
}

export default EditEvent;
