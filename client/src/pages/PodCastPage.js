// Importation des bibliothèques nécessaires depuis React et React Bootstrap
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../css/style.css'; 
 
// Définition du composant PodCastPage
const PodCastPage = () => {
  // Déclaration des états locaux avec useState
  const [podcasts, setPodcasts] = useState([]); // État pour stocker les podcasts
  const [showModal, setShowModal] = useState(false); // État pour gérer la visibilité du modal
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filename: '',
    langue: '',
    id_program: '',
    id_presentation: ''
  });
 
  // Utilisation de useEffect pour récupérer les podcasts lors du premier rendu du composant
  useEffect(() => {
    fetchPodcasts();
    fetchLocalPodcasts();
  }, []);
 
  // Fonction pour récupérer les podcasts à partir de Listen Notes
  const fetchPodcasts = async () => {
    try {
      const response = await axios.get('https://listen-api.listennotes.com/api/v2/best_podcasts', {
        headers: {
          'X-ListenAPI-Key': '936ec5bd33444626814b68f4e93c00f7'
        },
        params: {
          genre_id: 68, 
          page: 1,
          limit:12
        }
      });
      setPodcasts(prevPodcasts => [...prevPodcasts, ...response.data.podcasts]);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    }
  };
 
  // Fonction pour récupérer les podcasts depuis la base de données locale
  const fetchLocalPodcasts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/podcasts');
      setPodcasts(prevPodcasts => [...prevPodcasts, ...response.data]);
    } catch (error) {
      console.error('Error fetching local podcasts:', error);
    }
  };
 
  // Fonction pour supprimer un podcast de la base de données locale
  const deletePodcast = async (id) => {
    try {
      await fetch(`http://localhost:5000/podcasts/${id}`, {
        method: 'DELETE',
      });
      
      setPodcasts(podcasts.filter(podcast => podcast.id !== id));
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };
 
  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  // Fonction pour soumettre le formulaire et créer un nouveau podcast
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/podcasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Created podcast:', data);
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        filename: '',
        langue: '',
        id_program: '',
        id_presentation: ''
      });
      fetchLocalPodcasts();
    } catch (error) {
      console.error('Error creating podcast:', error);
    }
  };
 
  // Rendus du composant PodCastPage
  return (
    <Container style={{ marginTop: '20px' }}>
<Row className="justify-content-md-center">
    <Col md="10" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#343a40', textTransform: 'uppercase' }}>Podcast Page</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginBottom: '20px' }}>Create</Button>
      <Table striped bordered hover className="mt-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #000000' }}>
        <thead style={{ backgroundColor: '#007bff', color: '#ffffff', fontWeight: 'bold' }}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Filename</th>
            <th>Langue</th>
            <th>Id Program</th>
            <th>Id Presentation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {podcasts.map((podcast, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
              <td>{podcast.title}</td>
              <td style={{ maxWidth: '200px', maxHeight: '50px', overflowY: 'auto' }}>{podcast.description}</td>
              <td>{podcast.filename}</td>
              <td>{podcast.langue}</td>
              <td>{podcast.id_program}</td>
              <td>{podcast.id_presentation}</td>
              <td>
                <Button variant="danger" onClick={() => deletePodcast(podcast.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Podcast</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formFilename">
              <Form.Label>Filename</Form.Label>
              <Form.Control type="text" placeholder="Enter filename" name="filename" value={formData.filename} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formLanguage">
              <Form.Label>Langue</Form.Label>
              <Form.Control type="text" placeholder="Enter langue" name="langue" value={formData.langue} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formIdProgram">
              <Form.Label>Id Program</Form.Label>
              <Form.Control type="text" placeholder="Enter Id Program" name="id_program" value={formData.id_program} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formIdPresentation">
              <Form.Label>Id Presentation</Form.Label>
              <Form.Control type="text" placeholder="Enter Id Presentation" name="id_presentation" value={formData.id_presentation} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
 
export default PodCastPage