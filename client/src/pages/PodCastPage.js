
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
    id_podcast: '',
    id_podcastwebapi: ''
  });
 
  // Utilisation de useEffect pour récupérer les podcasts lors du premier rendu du composant
  useEffect(() => {
    fetchPodcasts();
    fetchLocalPodcasts();
  }, []);
 
  // Fonction pour récupérer les podcasts à partir de Listen Notes
  const fetchPodcasts = async () => {
    try {
      const response = await fetch('http://localhost:8000/podcasts'); // Requête GET pour récupérer les podcasts
      if (response.ok) {
        const data = await response.json(); // Conversion de la réponse en JSON
        console.log('Fetched podcasts:', data); // Affichage des podcasts dans la console
        setPodcasts(data); // Mise à jour de l'état des podcasts
      } else {
        console.error('Failed to fetch podcasts:', response.statusText); // Affichage d'une erreur en cas d'échec
      }
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
<<<<<<< HEAD
      await fetch(`http://localhost:8000/podcasts/${id}`, {
        method: 'DELETE', // Requête DELETE pour supprimer un podcast
=======
      await fetch(`http://localhost:5000/podcasts/${id}`, {
        method: 'DELETE',
>>>>>>> c327b2207557e1111a6085098a3e50f9b1ed4e35
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
<<<<<<< HEAD
      const response = await fetch('http://localhost:8000/podcasts', {
        method: 'POST', // Requête POST pour créer un nouveau podcast
=======
      const response = await fetch('http://localhost:5000/podcasts', {
        method: 'POST',
>>>>>>> c327b2207557e1111a6085098a3e50f9b1ed4e35
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
        id_podcast: '',
        id_podcastwebapi: ''
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
            <th>Id Podcast</th>
            <th>Id Podcastwebapi</th>
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
              <td>{podcast.id_podcast}</td>
              <td>{podcast.id_podcastwebapi}</td>
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
              <Form.Label>Id Podcast</Form.Label>
              <Form.Control type="text" placeholder="Enter Id Podcast" name="id_podcast" value={formData.id_podcast} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formIdPresentation">
              <Form.Label>Id Podcastwebapi</Form.Label>
              <Form.Control type="text" placeholder="Enter Id Podcastwebapi" name="id_podcastwebapi" value={formData.id_podcastwebapi} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
 
export default PodCastPage