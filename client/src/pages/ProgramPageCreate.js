// Filename - pages/ProgramPageCreate.js

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const baseURL = "http://localhost:8000";

function CreateProgramPage() {
	// Making usestate for setting and
	// fetching a value in jsx
    const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");


	// Using useNavigation for redirecting to pages
	let history = useNavigate();

	// Function for creating a post/entry
	const handelSubmit = async(e) => {
		e.preventDefault(); // Prevent reload

		// Fetching a value from usestate and
		// pushing to javascript object
		
		if (title == "" || description == "") {

			alert("invalid input");
			return;
		}
       
        try {
            const result = await axios.post( `${baseURL}/programs`, {
                title:title, description: description
            });

        } catch (error) {
            console.error('Error sending POST request:', error);
        }

		// Redirecting to home page after creation done
		history("/programs");
	};

	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* Fetching a value from input textfirld 
					in a setname using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formFirstName"
				>
					<Form.Control
						onChange={(e) =>
							setTitle(e.target.value)
						}
						type="text"
						placeholder="Enter Title"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formLastName"
				>
					<Form.Control
						onChange={(e) =>
							setDescription(e.target.value)
						}
						type="text"
						placeholder="Enter Description"
						required
					/>
				</Form.Group>


				{/* handing a onclick event in button for
					firing a function */}
				<Button
					onClick={(e) => handelSubmit(e)}
					variant="primary"
					type="submit"
				>
					Submit
				</Button>

				{/* Redirecting back to home page */}
				<Link className="d-grid gap-2" to="/programs">
					<Button variant="info" size="lg">
						ProgramPage
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default CreateProgramPage;
