import React from "react";
import { Link } from 'react-router-dom';

import SideBar from "../../../components/SideBar";
import Navbar from "../../../components/utility/Navbar";
import CropNavigation from "../../../components/cropManagement_home/CropNavigation";
import ChemicalList from "../../../components/cropManagement_home/CropInputComponents/ChemicalList";
import BackButton from "../../../components/utility/BackButton";
import Breadcrumb from "../../../components/utility/Breadcrumbs";

const breadcrumbItems = [
    { name: 'Crop', href: '/crop/home' },
    { name: 'Crop Input', href: '/crop/chemical/view' },
];

export default function ViewChemicalPage() {

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-10">
                <Navbar/>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="grid sm:grid-cols-6 w-full">
                    <div className="col-span-1 sticky left-0 top-0 z-50">
                        <SideBar/>
                    </div>
                    <div className="col-span-5">
                        <CropNavigation/>
                        <div className="flex flex-row ">
                            <BackButton/>
                            <Breadcrumb items={breadcrumbItems}/>
                        </div>
                        <div className="flex justify-center mt-4 left-16">
                            <a href="/crop/input/planting/view">
                                <button
                                    id="plantingButton"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l-lg hover:bg-gray-400 h-12"
                                >
                                    Planting
                                </button>
                            </a>
                            <button
                                id="chemicalButton"
                                className="bg-emerald-500 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-800 h-12">Agrochemical
                            </button>
                        </div>
                        <div id="chemicalList">
                            <ChemicalList/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    );
};