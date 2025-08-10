import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AdminDashboard.css';

function AdminDashboard(){

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const fetchProjects = () => {
        fetch('http://localhost:5001/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects: ", error));        
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = (projectId) => {
        if(window.confirm('Are you sure you want to delete this project?')){
            fetch(`http://localhost:5001/api/projects/${projectId}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                setProjects(projects.filter(project => project._id !== projectId));
            })
            .catch(error => console.error('Error deleting project:', error));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <div className="admin-dashboard">
            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="admin-title">Admin Dashboard</h1>
                    <div className="admin-header-actions">
                        <Link to='/admin/add' className="btn btn-add">Add New Project</Link>
                        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                    </div>
                </div>
                <p>Manage your portfolio projects.</p>
                <div className="project-management-section">
                    <h2>Existing Projects</h2>
                    <ul className="project-list-admin">
                        {projects.map(project => (
                            <li key={project._id}>
                                <span className="project-title">{project.title}</span>
                                <div className="project-actions">
                                    <Link to={`/admin/edit/${project._id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => handleDelete(project._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/" className="back-to-site-link">← Back to Main Site</Link>
            </div>
        </div>
    );

}

export default AdminDashboard;