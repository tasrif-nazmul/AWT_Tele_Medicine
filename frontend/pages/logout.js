import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Profile() {
    const [DrsProfile, DrProfile] = useState(null); // Initialize state with null
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []); // Pass an empty dependency array to useEffect to run only once

    const fetchData = async () => {
        try {
            const token = Cookies.get('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/auth/logout`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = response.data;
            DrProfile(data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch data');
        }
    };

    const handleLogout = () => {
        // Clear authentication token
        Cookies.remove('access_token');
        // Redirect to login page
        router.push('/login');
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Profile information display */}
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
