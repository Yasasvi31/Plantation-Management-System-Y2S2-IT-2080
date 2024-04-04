import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { InformationCircleIcon,PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { html2canvas } from 'html2canvas'; // Updated import
import jsPDF from 'jspdf';
import {useSnackbar} from "notistack";

const PlantingList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [plantingRecords, setPlantingRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedFieldFilter, setSelectedFieldFilter] = useState('All Fields');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/cropinput`)
            .then((response) => {
                const formattedRecords = response.data.data
                    .filter(record => record.type === "Planting")
                    .map(record => ({
                        ...record,
                        date: new Date(record.date).toLocaleDateString('en-GB')
                    }));
                setPlantingRecords(formattedRecords);
                setFilteredRecords(formattedRecords);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredRecords(
            plantingRecords.filter(record =>
                (selectedFieldFilter === 'All Fields' || record.field.toLowerCase() === selectedFieldFilter.toLowerCase()) &&
                (record.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.remarks.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        );
    }, [plantingRecords, searchQuery, selectedFieldFilter]);

    const handleDelete = (recordId) => {
        setRecordToDelete(recordId);
    };

    const confirmDelete = () => {
        if (recordToDelete) {
            axios
                .delete(`http://localhost:5555/cropinput/${recordToDelete}`)
                .then(() => {
                    setPlantingRecords(prevRecords =>
                        prevRecords.filter(record => record._id !== recordToDelete)
                    );
                    setRecordToDelete(null);
                    enqueueSnackbar('Record deleted successfully', { variant: 'success' });
                })
                .catch((error) => {
                    console.log(error);
                    enqueueSnackbar('Error deleting record', { variant: 'error' });
                });
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFieldFilterChange = (event) => {
        setSelectedFieldFilter(event.target.value);
    };

    const generatePDF = () => {
        const input = document.getElementById('planting-table');
        if (input) {
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('l', 'mm', 'b4');
                    pdf.addImage(imgData, 'PNG', 0, 0);
                    pdf.save('planting-list.pdf');
                })
                .catch((error) => {
                    console.error('Error generating PDF:', error);
                });
        } else {
            console.error('Table element not found');
        }
    };

    return (
        <div className="z-0">
            <div className="absolute left-80">
                <input
                    type="text"
                    placeholder="Search Planting"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-full px-3 py-1 pl-10"
                />
                <FaSearch className="absolute left-3 top-2 text-gray-400"/>
                <select
                    value={selectedFieldFilter}
                    onChange={handleFieldFilterChange}
                    className="ml-3 border border-gray-300 rounded-full px-8 py-1"
                >
                    {['All Fields', 'Field A', 'Field B', 'Field C', 'Field D', 'Field E', 'Field F', 'Field G'].map((field, index) => (
                        <option key={index} value={field}>{field}</option>
                    ))}
                </select>
            </div>
            <Link to="/crop/input/add">
                <button
                    className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 absolute top-14 right-10 mt-10 mr-24"
                >
                    Add New Planting <span aria-hidden="true">&rarr;</span>
                </button>
            </Link>

            <button
                onClick={generatePDF}
                className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 absolute top-14 right-10 mt-10 mr-5"
            >
                Print
            </button>

            <div className="overflow-x-auto">
                <table
                    id="planting-table"
                    className="w-10/12 bg-white shadow-md rounded-md overflow-hidden absolute top-1/3 left-64"
                >
                    <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                    <tr>
                        <th className="px-6 py-3">No</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Field Name</th>
                        <th className="px-6 py-3">Crop Type</th>
                        <th className="px-6 py-3">Variety</th>
                        <th className="px-6 py-3">Quantity</th>
                        <th className="px-6 py-3">Unit Cost</th>
                        <th className="px-6 py-3">Remarks</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRecords.map((record, index) => (
                        <tr className="hover:bg-gray-100 divide-y divide-gray-200" key={index}>
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{record.date}</td>
                            <td className="px-6 py-4">{record.field}</td>
                            <td className="px-6 py-4">{record.cropType}</td>
                            <td className="px-6 py-4">{record.variety}</td>
                            <td className="px-6 py-4">{record.quantity}</td>
                            <td className="px-6 py-4">{record.unitCost}</td>
                            <td className="px-6 py-4">{record.remarks}</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-between">
                                    <Link to={`/crop/input/planting/record/${record._id}`}
                                          className="font-medium text-blue-600  hover:underline">
                                        <InformationCircleIcon
                                            className="h-6 w-6 flex-none bg-gray-300 p-1 rounded-full text-gray-800 hover:bg-gray-500"
                                            aria-hidden="true"/>
                                    </Link>
                                    <Link to={`/crop/input/update/${record._id}`}>
                                        <PencilSquareIcon
                                            className="h-6 w-6 flex-none bg-blue-200 p-1 rounded-full text-gray-800 hover:bg-blue-500"
                                            aria-hidden="true"/>
                                    </Link>
                                    <button
                                        className="flex items-center"
                                        onClick={() => handleDelete(record._id)}
                                    >
                                        <TrashIcon
                                            className="h-6 w-6 flex-none bg-red-200 p-1 rounded-full text-gray-800 hover:bg-red-500"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {recordToDelete && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6">
                        <p className="text-lg font-semibold mb-4">Confirm Deletion</p>
                        <p className="text-sm mb-4">Are you sure you want to delete this record?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setRecordToDelete(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="text-white text-2xl">Loading...</div>
                </div>
            )}
        </div>
    );
};

export default PlantingList;