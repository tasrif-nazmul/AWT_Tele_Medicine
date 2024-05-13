import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from "../Components/footer";
import Navbar from "../Components/navbar";
import SideMenu from "../Components/sideMenu";
import Auth from '../Components/auth';

export default function Dashboard() {
    const router = useRouter();
    const [token, setToken] = useState(null);

    return (
        <>
            <Auth setToken={setToken} />
            {token && (
                <div className="flex flex-col h-screen">
                    <Navbar />
                    <div className="flex flex-grow">
                        <SideMenu />
                        <div className="flex-grow flex flex-col">
                            <div className="max-w-lg mx-auto">
                                <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

                                {/* Appointment Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Appointments</h3>
                                    <div className="border rounded-md p-4 bg-white shadow">
                                        <p className="text-gray-600">You have 3 upcoming appointments.</p>
                                        <ul>
                                            <li>Appointment 1</li>
                                            <li>Appointment 2</li>
                                            <li>Appointment 3</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Patients Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Patients</h3>
                                    <div className="border rounded-md p-4 bg-white shadow">
                                        <p className="text-gray-600">You have 15 registered patients.</p>
                                        <ul>
                                            <li>Patient 1</li>
                                            <li>Patient 2</li>
                                            <li>Patient 3</li>
                                            {/* Display more patients */}
                                        </ul>
                                    </div>
                                </div>

                                {/* Messages Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Messages</h3>
                                    <div className="border rounded-md p-4 bg-white shadow">
                                        <p className="text-gray-600">You have 5 new messages.</p>
                                        <ul>
                                            <li>Message 1</li>
                                            <li>Message 2</li>
                                            <li>Message 3</li>
                                            {/* Display more messages */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}
