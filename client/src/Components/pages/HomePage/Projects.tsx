import React, { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import './Projects.css';

interface Project {
  _id: string;
  title: string;
  description: string;
  slug: string;
  language: string;
  imageUrl?: string;
  githubUrl?: string;
  liveSiteUrl?: string;
  isEmbeddable?: boolean;
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
                } else {
                    setProjects(data);
                    setLoadingMessage('');
                }
            } catch (error) {
                console.error('An Error Occured During The Fetch Operation:', error);
                setLoadingMessage('Error: Could Not Connect to The Server');
            }
        };
        fetchProjects();
    }, []);
    
    const languages = useMemo(() => {
        const allLanguages = projects.flatMap(p => (p.language || '').split(',').map(lang => lang.trim()).filter(Boolean));
        return ['All', ...Array.from(new Set(allLanguages)).sort()];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if(selectedLanguage === 'All') {
            return projects;
        }
        return projects.filter(project => (project.language || '').split(',').map(lang => lang.trim()).includes(selectedLanguage));
    },[selectedLanguage, projects]);

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
                    {loadingMessage ? (
                        <p>{loadingMessage}</p>
                    ) : (
                        filteredProjects.length > 0 ? (
                            filteredProjects.map(project => (
                                <Link 
                                to={project.isEmbeddable ? `/embed/${project.slug}` : project.liveSiteUrl || project.githubUrl || '#'} 
                                key={project._id} 
                                className="project-link" 
                                target={project.isEmbeddable ? "" : "_blank"} 
                                rel="noopener noreferrer">
                                    {project.imageUrl && 
                                        <img src={project.imageUrl} alt={project.title} className="project-image-placeholder" />
                                    }
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <span className="project-language">{project.language}</span>
                                    <div className="project-card-links">
                                        {project.liveSiteUrl && <a href={project.liveSiteUrl} target="_blank" rel="noopener noreferrer">Live</a>}
                                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No projects found for "{selectedLanguage}"</p>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default Projects;