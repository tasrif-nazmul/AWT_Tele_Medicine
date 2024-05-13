import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter email');
            return;
        }
        
        if (!password) {
            setError('Please enter password');
            return;
        }

        try {
            const loginData = { email, password };
            // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/auth/login`, loginData);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/auth/login`, 
                loginData, 
                { withCredentials: true } // Pass withCredentials as part of the config object
            );

            
            const data = response.data;
            console.log("Token: ", data);

            // Check if the response indicates successful login
            if (data && data.access_token) 
                {
                setError('');
                // Save access token in cookie
                Cookies.set('access_token', data.access_token, { expires: 1 }); // Expires in 1 day
                // return response;
    
                
                // window.location.href = '/doctor/dashboard';
                router.push('/doctor/dashboard');
                // window.location.href = '/';
                
            console.log("Data: ",data)
            } 
            
            else 
            {
                setError('Invalid username or password');
            }
        } 

        catch (error) 
        {
            console.error(error);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="btn w-full">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
