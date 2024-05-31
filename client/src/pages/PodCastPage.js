import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'react-bootstrap';

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