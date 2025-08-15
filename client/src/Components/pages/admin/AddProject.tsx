import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ProjectFormData {
    title: string;
    description: string;
    slug: string;
}

function AddProject(): React.JSX.Element {

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState<ProjectFormData>({
        title: '',
        description: '',
        slug: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
            method: 'POST',
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
        .catch(error => console.error("Error adding project: ", error));
    };

    return(
        <div className="admin-dashboard">
            <div className="admin-container">
                <h1 className="admin-title">Add New Project</h1>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                        type="text"
                        id="title"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={projectData.description}
                        onChange={handleChange}
                        required
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
                        required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-add">Add project</button>
                        <Link to='/admin' className="btn-cancel">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default AddProject;