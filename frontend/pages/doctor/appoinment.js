import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SideMenu from '../Components/sideMenu';

export default function Dashboard() {
    const [serviceList, setServiceList] = useState([]);
    const [error, setError] = useState('');

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
            setError('Failed to fetch data');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <SideMenu />
                <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="max-w-lg">
                        <h1 className="text-center mb-4"><b>Pending Appoinment List</b></h1>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Patient ID</th>
                                    <th>Disease</th>
                                    <th>Response Time</th>
                                    <th>Scheduled Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceList.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{appointment.id}</td>
                                        <td>{appointment.appointment_date}</td>
                                        <td>{appointment.appointment_time}</td>
                                        <td>{appointment.patient_id}</td>
                                        <td>{appointment.disease}</td>
                                        <td>{appointment.responseTime}</td>
                                        <td>{appointment.scheduledTime}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
