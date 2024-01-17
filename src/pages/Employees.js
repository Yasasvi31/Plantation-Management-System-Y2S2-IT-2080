import React from "react";

import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import NewEmployeeForm from "../components/AddNewEmployee";

export default function Employees() {
    return (
        <div className="flex-col">
            {/* Navbar */}
            <div className="border-b sticky top-0 z-10">
                <Navbar />
            </div>
            <div className="flex">
                {/* Fixed Sidebar */}
                <div className="fixed h-full">
                    <SideBar/>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 ml-72  overflow-x-hidden overflow-y-auto">
                    {/* Content to be stacked to the right of the Sidebar */}

                    <NewEmployeeForm/>
                    {/* Add more content components as needed */}
                </div>
            </div>
        </div>
    );
}
