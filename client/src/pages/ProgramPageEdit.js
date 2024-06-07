import React, { useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const baseURL = "http://localhost:8000";

const EditProgramPage = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setTitle(localStorage.getItem('title'));
        setDescription(localStorage.getItem('description'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${baseURL}/programs/${id}`, {
                title,
                description
            });
            navigate('/programs');
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    return (
        <div style={{ margin: "5rem" }}>
            <h2>Edit Program</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button variant="warning" type="submit" >
                    UPDATE
                </Button>

			
				{/* <Link className="d-grid gap-2" to="/programs">
					<Button variant="info" size="lg">
						ProgramPage
					</Button>
				</Link> */}





            </Form>
        </div>
    );
};

export default EditProgramPage;
