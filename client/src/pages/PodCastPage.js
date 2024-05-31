import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { Button, Form, ListGroup } from 'react-bootstrap';

const PodCastPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [filename, setFilename] = useState('');
  const [langue, setLangue] = useState('');
  const [idProgram, setIdProgram] = useState('');
  const [idPresentation, setIdPresentation] = useState('');
=======
import { Container, Row, Col, Table } from 'react-bootstrap';

const PodCastPage = () => {
  const [podcasts, setPodcasts] = useState([]);
>>>>>>> 5f65a23b360551ebb7260b5fbbf0f8ec62d8149b

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = () => {
<<<<<<< HEAD
    fetch('http://localhost:3001/podcasts')
=======
    fetch('http://localhost:5000/podcasts')
>>>>>>> 5f65a23b360551ebb7260b5fbbf0f8ec62d8149b
      .then(response => response.json())
      .then(data => setPodcasts(data))
      .catch(error => console.error('Error fetching podcasts:', error));
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPodcast = { title, descriptions, filename, langue, id_program: idProgram, id_presentation: idPresentation };

    fetch('http://localhost:3001/podcasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPodcast),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPodcasts([...podcasts, newPodcast]);
          setTitle('');
          setDescriptions('');
          setFilename('');
          setLangue('');
          setIdProgram('');
          setIdPresentation('');
        } else {
          alert('Failed to add podcast');
        }
      })
      .catch(error => console.error('Error adding podcast:', error));
  };

  return (
    <div className="container">
      <h2>PodCastPage</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formDescriptions">
          <Form.Label>Descriptions</Form.Label>
          <Form.Control type="text" value={descriptions} onChange={(e) => setDescriptions(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formFilename">
          <Form.Label>Filename</Form.Label>
          <Form.Control type="text" value={filename} onChange={(e) => setFilename(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formLangue">
          <Form.Label>Langue</Form.Label>
          <Form.Control type="text" value={langue} onChange={(e) => setLangue(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formIdProgram">
          <Form.Label>Id Program</Form.Label>
          <Form.Control type="text" value={idProgram} onChange={(e) => setIdProgram(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formIdPresentation">
          <Form.Label>Id Presentation</Form.Label>
          <Form.Control type="text" value={idPresentation} onChange={(e) => setIdPresentation(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ListGroup>
        {podcasts.map((podcast, index) => (
          <ListGroup.Item key={index}>
            <strong>{podcast.title}</strong> - {podcast.descriptions} - {podcast.filename} - {podcast.langue} - {podcast.id_program} - {podcast.id_presentation}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PodCastPage;
=======
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h2>Podcast Page</h2>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Filename</th>
                <th>Language</th>
                <th>Id Program</th>
                <th>Id Presentation</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((podcast, index) => (
                <tr key={index}>
                  <td>{podcast.title}</td>
                  <td>{podcast.descriptions}</td>
                  <td>{podcast.filename}</td>
                  <td>{podcast.langue}</td>
                  <td>{podcast.id_program}</td>
                  <td>{podcast.id_presentation}</td>
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
>>>>>>> 5f65a23b360551ebb7260b5fbbf0f8ec62d8149b
