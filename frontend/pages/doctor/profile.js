import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';
import { useRouter } from 'next/router';

export default function Profile() {
    const [DrsProfile, DrProfile] = useState(null);
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State to manage modal visibility
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('access_token');

        if (!token) {
            router.push('/');
        } else {
            fetchData();
        }
    }, []);

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
            // Set initial form data
            setFormData(data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch data');
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Make API call to save the edited profile data
            const token = Cookies.get('access_token');
            await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/profile/update`, formData, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            // Reset form data and close edit mode
            setIsEditing(false);
            // Set success message
            setSuccessMessage('Profile updated successfully');
        } catch (error) {
            console.error("Failed to save profile data:", error);
            setError('Failed to save profile data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <SideMenu />
                <div className="flex-grow bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="sm:flex sm:items-center px-6 py-4">
                            <div className="sm:w-1/4">
                                <img src={DrsProfile?.image} alt="Profile" className="w-32 h-32 rounded-full mx-auto sm:mx-0" />
                            </div>
                            <div className="sm:w-3/4 sm:ml-6 mt-4 sm:mt-0">
                                <h1 className="text-3xl font-semibold text-gray-800">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData?.name}
                                            onChange={handleChange}
                                            className="text-gray-800 font-semibold border-b-2 border-gray-400 focus:outline-none"
                                        />
                                    ) : (
                                        DrsProfile?.name
                                    )}
                                </h1>
                                <p className="text-gray-600 text-lg mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData?.specialization}
                                            onChange={handleChange}
                                            className="text-gray-600 mt-2 border-b-2 border-gray-400 focus:outline-none"
                                        />
                                    ) : (
                                        DrsProfile?.specialization
                                    )}
                                </p>
               
                                {/* Display other profile information */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700 font-semibold">Degree:</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="degree"
                                                value={formData?.degree}
                                                onChange={handleChange}
                                                className="text-gray-600 mt-2 border-b-2 border-gray-400 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-600">{DrsProfile?.degree}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700 font-semibold">Experience:</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="experience"
                                                value={formData?.experience}
                                                onChange={handleChange}
                                                className="text-gray-600 mt-2 border-b-2 border-gray-400 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-600">{DrsProfile?.experience}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700 font-semibold">Contact No:</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={formData?.phoneNumber}
                                                onChange={handleChange}
                                                className="text-gray-600 mt-2 border-b-2 border-gray-400 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-600">{DrsProfile?.phoneNumber}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {isEditing ? (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                {successMessage && (
                                    <p className="text-green-500 mt-4 text-center">{successMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}
