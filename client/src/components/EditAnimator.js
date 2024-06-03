import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EditAnimator() {
  const initialFormState = { login: '', pwd: '', full_name: '', google_id: '', email: '' };
  const [form, setForm] = useState(initialFormState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/animator/${id}`)
      .then(response => {
        setForm(response.data[0]);
      });
  }, [id]);

  const handleFormChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleUpdate = () => {
    axios.patch(`http://localhost:4000/animator/${id}`, form)
      .then(() => {
        navigate('/animator'); // Redirige vers la liste des animateurs après la modification
      });
  };

  return (
    <div>
      <h2>Modifier l'animateur</h2>
      <form className="mb-3">
        <div className="mb-3">
          <label className="form-label">Login:</label>
          <input type="text" name="login" value={form.login} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe:</label>
          <input type="password" name="pwd" value={form.pwd} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Nom complet:</label>
          <input type="text" name="full_name" value={form.full_name} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Google ID:</label>
          <input type="text" name="google_id" value={form.google_id} onChange={handleFormChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleFormChange} className="form-control" />
        </div>
        <Button variant="success" onClick={handleUpdate}>Modifier</Button>
      </form>
    </div>
  );
}

export default EditAnimator;
