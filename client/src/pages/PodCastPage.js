// Importation des bibliothèques nécessaires depuis React et React Bootstrap
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

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
  const [spotifyToken, setSpotifyToken] = useState(''); // État pour stocker le token Spotify

  // Utilisation de useEffect pour récupérer les podcasts et token lors du premier rendu du composant
  useEffect(() => {
    fetchPodcasts();
    fetchSpotifyToken();
  }, []);

  // Fonction pour récupérer le token Spotify
  const fetchSpotifyToken = async () => {
    const clientId = 'fe4a32aa4ded4c31b3d93795f49eddd6';
    const clientSecret = '9964604fc107428cb51ba491455cfc18';
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setSpotifyToken(response.data.access_token);
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
    }
  };

  // Fonction pour récupérer les podcasts à partir du serveur
  const fetchPodcasts = async () => {
    try {
      const response = await fetch('http://localhost:5000/podcasts'); // Requête GET pour récupérer les podcasts
      if (response.ok) {
        const data = await response.json(); // Conversion de la réponse en JSON
        console.log('Fetched podcasts:', data); // Affichage des podcasts dans la console
        setPodcasts(data); // Mise à jour de l'état des podcasts
      } else {
        console.error('Failed to fetch podcasts:', response.statusText); // Affichage d'une erreur en cas d'échec
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error); // Gestion des erreurs
    }
  };

  // Fonction pour supprimer un podcast
  const deletePodcast = async (id) => {
    try {
      await fetch(`http://localhost:5000/podcasts/${id}`, {
        method: 'DELETE', // Requête DELETE pour supprimer un podcast
      });
      setPodcasts(podcasts.filter(podcast => podcast.id !== id)); // Mise à jour de l'état des podcasts après suppression
    } catch (error) {
      console.error('Error deleting podcast:', error); // Gestion des erreurs
    }
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Mise à jour de l'état des données du formulaire
  };

  // Fonction pour soumettre le formulaire et créer un nouveau podcast
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    try {
      const response = await fetch('http://localhost:5000/podcasts', {
        method: 'POST', // Requête POST pour créer un nouveau podcast
        headers: {
          'Content-Type': 'application/json' // Définition des en-têtes de la requête
        },
        body: JSON.stringify(formData) // Conversion des données du formulaire en JSON
      });
      const data = await response.json(); // Conversion de la réponse en JSON
      console.log('Created podcast:', data); // Affichage du nouveau podcast dans la console
      setShowModal(false); 
      setFormData({ // Réinitialisation des données du formulaire
        title: '',
        description: '',
        filename: '',
        langue: '',
        id_program: '',
        id_presentation: ''
      });
      fetchPodcasts(); // Récupération des podcasts mis à jour
    } catch (error) {
      console.error('Error creating podcast:', error); // Gestion des erreurs
    }
  };

  // Fonction pour rechercher un podcast sur Spotify
  const searchSpotify = async (query) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`
        },
        params: {
          q: query,
          type: 'podcast'
        }
      });
      console.log('Spotify search results:', response.data);
      // Handle the search results here
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };

  // Rendu du composant PodCastPage
  return (
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-md-center">
        <Col md="8" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#343a40', textTransform: 'uppercase' }}>Podcast Page</h2>
          <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginBottom: '20px' }}>Create</Button>
          <Button variant="info" onClick={() => searchSpotify('Your Search Query')} style={{ marginBottom: '20px', marginLeft: '10px' }}>Search Spotify</Button>
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
                  <td>{podcast.descriptions}</td>
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
            <Button variant="primary" type="submit">Create Podcast</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PodCastPage;

