import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';

export default function Appointment() {
    const [serviceList, setServiceList] = useState([]);
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = Cookies.get('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/appointment/list`, {
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

    const handleEdit = async (appointmentId, updatedData) => {
        try {
            if (!updatedData.scheduledTime) {
                setError('Please set a time');
                return;
            }
            const token = Cookies.get('access_token');
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}api/doctor/${appointmentId}/appointment/accept`, updatedData, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            setError('Successfully accept the appointment');
    
            // Update serviceList with new data
            const updatedServiceList = serviceList.map(appointment => {
                if (appointment.id === appointmentId) {
                    return {
                        ...appointment,
                        scheduledTime: updatedData.scheduledTime // Update scheduledTime
                    };
                }
                return appointment;
            });
            setServiceList(updatedServiceList);
    
        } catch (error) {
            console.error("Failed to accept appointment:", error);
            setError('Failed to accept appointment');
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <SideMenu />
                <div className="flex-grow p-8">
                    <h1 className="text-2xl font-bold mb-4">Pending Appointment List</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Appointment Date</th>
                                    <th className="border px-4 py-2">Appointment Time</th>
                                    <th className="border px-4 py-2">Disease</th>
                                    <th className="border px-4 py-2">Scheduled Time</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Give Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceList.map((appointment, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="border px-4 py-2">{appointment.id}</td>
                                        <td className="border px-4 py-2">{appointment.appointment_date}</td>
                                        <td className="border px-4 py-2">{appointment.appointment_time}</td>
                                        <td className="border px-4 py-2">{appointment.disease}</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="time"
                                                className="border rounded px-2 py-1"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{appointment.status}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(appointment.id, { scheduledTime: inputValue })}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Save
                                            </button>
                                        </td>
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
