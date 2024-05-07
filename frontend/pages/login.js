import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email, password };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/auth/login`, loginData);
            const data = response.data;
            setJsonData(data);
            setError('');
        } 
        catch (error) 
        {
            console.error(error);
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
            {jsonData && <p>{jsonData}</p>}
        </form>
    );
}
