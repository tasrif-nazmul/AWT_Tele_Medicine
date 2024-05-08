import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import SideMenu from "../Components/sideMenu";

export default function ProfilePage() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                <SideMenu />
                <div className="flex-grow flex items-center justify-center">
                    <div className="max-w-lg mx-auto">
                        {/* Profile Picture */}
                        <div className="mb-8 flex justify-center">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" className="w-32 h-32 rounded-full" />
                        </div>
                        {/* Biodata */}
                        <div className="bg-white p-4 rounded-md shadow" w-500>
                            <h2 className="text-2xl font-bold mb-4">Biodata</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Biodata Fields */}
                                <div>
                                    <label className="block text-gray-600">Name:</label>
                                </div>
                                <div>
                                    <p className="mb-2">Nazmul Hasan</p>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Age:</label>
                                </div>
                                <div>
                                    <p>30</p>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Email:</label>
                                </div>
                                <div>
                                    <p className="mb-2">nazmul@example.com</p>
                                </div>
                                {/* Add more biodata fields */}
                                <div>
                                    <label className="block text-gray-600">Address:</label>
                                </div>
                                <div>
                                    <p>123 Street, City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
