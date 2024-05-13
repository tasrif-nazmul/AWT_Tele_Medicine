import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';

export default function ResponseAppoinment() {
    const [serviceList, setServiceList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = Cookies.get('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/completed/appointment/list`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = response.data;
            setServiceList(data);
        } catch (error) {
            console.error(error);
            setError('No appointment available');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <SideMenu />
                <div className="flex-grow p-8">
                    <h1 className="text-2xl font-bold mb-4">Responded Appointment List</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">ID</th>
                                <th className="border border-gray-200 px-4 py-2">Appointment Date</th>
                                <th className="border border-gray-200 px-4 py-2">Appointment Time</th>
                                <th className="border border-gray-200 px-4 py-2">Disease</th>
                                <th className="border border-gray-200 px-4 py-2">Scheduled Time</th>
                                <th className="border border-gray-200 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceList.map((appointment, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.id}</td>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.appointment_date}</td>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.appointment_time}</td>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.disease}</td>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.scheduledTime}</td>
                                    <td className="border border-gray-200 px-4 py-2">{appointment.status}</td>
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
