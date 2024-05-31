import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const PodCastPage = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch('http://localhost:5000/podcasts');
      const data = await response.json();
      setPodcasts(data);
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

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-md-center">
        <Col md="8" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#343a40', textTransform: 'uppercase' }}>Podcast Page</h2>
          <Table striped bordered hover className="mt-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
            <thead style={{ backgroundColor: '#007bff', color: '#ffffff', fontWeight: 'bold' }}>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Filename</th>
                <th>Language</th>
                <th>Id Program</th>
                <th>Id Presentation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((podcast, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                  <td>{podcast.title}</td>
                  <td>{podcast.description}</td>
                  <td>{podcast.filename}</td>
                  <td>{podcast.language}</td>
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
    </Container>
  );
};

export default PodCastPage;