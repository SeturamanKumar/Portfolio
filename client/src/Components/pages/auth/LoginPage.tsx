import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage(): React.JSX.Element {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if(response.ok){
                localStorage.setItem('token', data.token);
                navigate('/admin');
            } else {
                setError(data.msg || 'An Error Occured. Please Try Again.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please try again later.');
            console.error('Login error:', err);
        }
    };



    return(
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <h1>Admin Login</h1>
                {error && <p className="auth-error">{error}</p>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required />
                    </div>
                    <button type="submit" className="btn-auth">Login</button>
                </form>
            </div>
        </div>
    );
    
}

export default LoginPage;