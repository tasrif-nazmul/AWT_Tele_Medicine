import Footer from "../Components/footer";
import Navbar from "../Components/navbar";
import SideMenu from "../Components/sideMenu";

export default function Dashboard(){

    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-grow">
                <SideMenu/>
                <div className="flex-grow flex items-center justify-center">
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

                        {/* Placeholder for Appointments */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Appointments</h3>
                            {/* Display appointment cards or list */}
                            <div className="border rounded-md p-4 bg-white shadow">
                                <p className="text-gray-600">You have 3 upcoming appointments.</p>
                                {/* Display upcoming appointments */}
                                <ul>
                                    <li>Appointment 1</li>
                                    <li>Appointment 2</li>
                                    <li>Appointment 3</li>
                                </ul>
                            </div>
                        </div>

                        {/* Placeholder for Patients */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Patients</h3>
                            {/* Display patient list or summary */}
                            <div className="border rounded-md p-4 bg-white shadow">
                                <p className="text-gray-600">You have 15 registered patients.</p>
                                {/* Display patient information */}
                                <ul>
                                    <li>Patient 1</li>
                                    <li>Patient 2</li>
                                    <li>Patient 3</li>
                                    {/* Display more patients */}
                                </ul>
                            </div>
                        </div>

                        {/* Placeholder for Messages */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Messages</h3>
                            {/* Display recent messages */}
                            <div className="border rounded-md p-4 bg-white shadow">
                                <p className="text-gray-600">You have 5 new messages.</p>
                                {/* Display message previews or notifications */}
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
            <Footer/>
        </div>
    )
}
