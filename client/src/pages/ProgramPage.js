import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const baseURL = "http://localhost:8000";

const ProgramPage = () => {

	let history = useNavigate();
	const [programs, setPrograms] = useState([]); 

    useEffect(() => {
        axios
          .get(
            `${baseURL}/programs`
          )
          .then((res) => setPrograms(res.data))
          .catch((error) => console.log(error));
    }, []);


	function setID(id, title, description) {
		history(    `${baseURL}/Programs`);
	}

  // function setID(id, title, description) {
  //     // Pass the data to the route you need
  //     history(`/edit`, { state: { id, title, description } });
  // }

  
  const idDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${baseURL}/programs/${id}`);
      setPrograms(programs.filter((program) => program.id !== id));
      history.push('/programs'); // Redirection vers la page /programs après suppression
    } catch (error) {
      console.error('Erreur :', error);
    }
  };


  return (

      <div style={{ margin: "5rem" }}>
        <h2>ProgramPage</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {programs.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>


                  {/* getting theid,title, and 
                    description for storing these
                    value in the jsx with 
                    onclick event */}
                  <td>
                    <Link to={`/podcasts/${item.id}`}>
                      <Button variant="info">
                        Show
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/edit`}>
                      <Button
                        onClick={(e) =>
                          setID(
                            item.id,
                            item.title,
                            item.description
                          )
                        }
                        variant="warning"
                      >
                        Update
                      </Button>
                    </Link>
                  </td>

                  {/* Using thr deleted function passing
                    the id of an entry */}
                  <td>
                  <Link to={`/programs/${item.id}`}>
                      <Button variant="danger"
                              onClick={(e) => { e.preventDefault(); idDelete(item.id); }}
                      >
                        Delete
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Button for redirecting to create page for
          insertion of values */}
        <Link className="d-grid gap-2" to="/programs/create">
          <Button variant="warning" size="lg">
            Create
          </Button>
        </Link>
      </div>
	);


}

export default ProgramPage