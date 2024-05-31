import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';

const PodCastPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filename: '',
    langue: '',
    id_program: '',
    id_presentation: ''
  });

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch('http://localhost:5000/podcasts');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched podcasts:', data); // Debugging line
        setPodcasts(data);
      } else {
        console.error('Failed to fetch podcasts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    }
  };

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      console.log('Created podcast:', data); // Debugging line
      setPodcasts([...podcasts, data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating podcast:', error);
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-md-center">
        <Col md="8" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
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
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PodCastPage;