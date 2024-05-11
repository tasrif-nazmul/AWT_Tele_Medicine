import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';

export default function Profile() {
    const [DrsProfile, DrProfile] = useState(null); // Initialize state with null
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []); // Pass an empty dependency array to useEffect to run only once

    const fetchData = async () => {
        try {
            const token = Cookies.get('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/profile`, {
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

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="sm:flex sm:items-center px-6 py-4">
                        <div className="sm:w-1/4">
                            <img src={DrsProfile?.image} alt="Profile" className="w-32 h-32 rounded-full mx-auto sm:mx-0" />
                        </div>
                        <div className="sm:w-3/4 sm:ml-6 mt-4 sm:mt-0">
                            <h1 className="text-3xl font-semibold text-gray-800">{DrsProfile?.name}</h1>
                            <p className="text-gray-600 text-lg mt-2">{DrsProfile?.email}</p>
                            <div className="mt-4">
                                <p className="text-gray-700 font-semibold">Specialization:</p>
                                <p className="text-gray-600">{DrsProfile?.specialization}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-700 font-semibold">Degree:</p>
                                <p className="text-gray-600">{DrsProfile?.degree}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-700 font-semibold">Experience:</p>
                                <p className="text-gray-600">{DrsProfile?.experience}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-700 font-semibold">Contact No:</p>
                                <p className="text-gray-600">{DrsProfile?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
            <Footer />
        </>
    );
}
