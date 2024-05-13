import React, { useState } from 'react';

const EditProfile = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="specialization" className="block text-gray-700 font-semibold">Specialization:</label>
                                <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} className="form-input mt-1 block w-full" />
                            </div>
                            {/* Add other fields as needed */}
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                <button type="button" onClick={onClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default EditProfile;
