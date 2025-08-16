import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Projects.css';

interface Project {
  _id: string;
  title: string;
  description: string;
  slug: string;
  language: string;
}

function Projects(): React.JSX.Element {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loadingMessage, setLoadingMessage] = useState("Loading projects...");
    const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

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
                return data;

            } catch (error) {
                console.error('An Error Occured During The Fetch Operation:', error);
                setLoadingMessage('Error: Could Not Connect to The Server');
                return;
            }

        };
        
        fetchProjects();

    }, []);
    
    const languages = ['All', ...Array.from(new Set(projects.map(p => p.language)))];
    const filteredProjects = selectedLanguage === 'All' ? projects : projects.filter(project => project.language === selectedLanguage)

    return(
        <section id="projects" className="projects">
            <div className="projects-container">
                <h2 className="projects-title">My Projects</h2>
                <div className="filter-container">
                    {languages.map(lang => (
                        <button
                            key={lang}
                            className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                            onClick={() => setSelectedLanguage(lang)}>
                            {lang}
                        </button>
                    ))}
                </div>
                <div className="project-list">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(project => (
                            <Link to={`/project/${project.slug}`} key={project._id} className="project-link">
                                <div className="project-card">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <span className="project-language">{project.language}</span>
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