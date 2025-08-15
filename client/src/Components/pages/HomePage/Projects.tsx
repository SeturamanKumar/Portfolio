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
    const [loadingMessage, setLoadingMessage] = useState("Loading projects...");

    useEffect(() => {

        const fetchProjects = async () => {

            const apiUrl = `${process.env.REACT_APP_API_URL}/api/projects`;

            try {
                
                const response = await fetch(apiUrl);
    
                if(!response.ok){
                    throw new Error(`HTTP Error! status: ${response.status}`);
                }
                
                const data: Project[] = await response.json();
    
                if(data.length === 0){
                    setLoadingMessage("No Projects Have Been Added Yet.");
                }
                setProjects(data);

            } catch (error) {
                console.error('An Error Occured During The Fetch Operation:', error);
                setLoadingMessage('Error: Could Not Connect to The Server');
            }

        };

        fetchProjects();

    }, []);

    return(
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2 className="projects-title">My Projects</h2>
                <div className="project-list">
                    {projects.length > 0 ? (
                        projects.map(project => (
                            <Link to={`/project/${project.slug}`} key={project._id} className="project-link">
                                <div className="project-card">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>{loadingMessage}</p> 
                    )}
                </div>
            </div>
        </section>
    );
}

export default Projects;