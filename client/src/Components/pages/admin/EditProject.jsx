import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditProject() {

    const { projectId } = useParams();
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        title: '',
        description: '',
        slug: '',
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => {
                setProjectData({
                    title: data.title,
                    description: data.description,
                    slug: data.slug,
                })
            })
            .catch(error => console.error("Error fetching project:", error));
    }, [projectId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            navigate('/admin');
        })
        .catch(error => console.error('Error updating project:', error));
    };

    return(
        <div className="admin-dashboard">
            <div className="admin-container">
                <h1 className="admin-title">Edit Project</h1>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={projectData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows='5'
                            value={projectData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={projectData.slug}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-edit">Save Changes</button>
                        <Link to='/admin' className="btn-cancel">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default EditProject;