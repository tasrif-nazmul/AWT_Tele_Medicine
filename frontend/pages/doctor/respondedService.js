import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const [serviceList, setServiceList] = useState([]);
    const [error, setError] = useState('');
    const [editedService, setEditedService] = useState(null);
    const router = useRouter();
    const token = Cookies.get('access_token');

    useEffect(() => {
        if (!token) {
            router.push('/');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/service/list/completed`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = response.data;
            setServiceList(data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch data');
        }
    };

    const handleEditClick = (service) => {
        setEditedService(service);
        updateService(service);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <SideMenu />
                <div className="flex-grow p-8">
                    
                        <h1 className="text-2xl font-bold mb-4">Responded Service List</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                            <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">ID</th>
                                    <th className="border border-gray-200 px-4 py-2">Date</th>
                                    <th className="border border-gray-200 px-4 py-2">Disease</th>
                                    <th className="border border-gray-200 px-4 py-2">Response Time</th>
                                    <th className="border border-gray-200 px-4 py-2">Doctor Description</th>
                                    <th className="border border-gray-200 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceList.map((eService, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="border border-gray-200 px-4 py-2">{eService.id}</td>
                                        <td className="border border-gray-200 px-4 py-2">{eService.requestDate}</td>
                                        <td className="border border-gray-200 px-4 py-2">{eService.disease}</td>
                                        <td className="border border-gray-200 px-4 py-2">{eService.responseTime}</td>
                                        <td className="border border-gray-200 px-4 py-2">{eService.doctorDescription}</td>
                                        <td className="border border-gray-200 px-4 py-2">{eService.status}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   
                </div>
            </div>
            <Footer />
        </div>
    );
}
