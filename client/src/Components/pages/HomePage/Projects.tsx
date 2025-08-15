import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Projects.css';

interface Project {
    _id: string;
    title: string;
    description: string;
    slug: string;
}

function Projects(): React.JSX.Element {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
            .then(response => response.json())
            .then((data: Project[]) => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return(
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2 className="projects-title">My Projects</h2>
                <div className="project-list">
                    {projects.map(project => (
                        <Link to={`/project/${project.slug}`} key={project._id} className="project-link">
                        <div className="project-card">
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