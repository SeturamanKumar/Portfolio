import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Projects.css';

function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return(
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2 className="projects-title">My Projects</h2>
                <div className="project-list">
                    {projects.map(project => (
                        <Link to={`/project/${project.slug}`} key={project._id} className="project-link">
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default Projects;