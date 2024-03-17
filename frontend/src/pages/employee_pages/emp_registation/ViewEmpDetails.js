import Navbar from "../../../components/utility/Navbar";
import SideBar from "../../../components/SideBar";
import Breadcrumb from "../../../components/utility/Breadcrumbs";
import React, {useState} from "react";
import BackButton from "../../../components/utility/BackButton";
import EmployeeNavbar from "../../../components/Employee/EmployeeNavbar";
import EmployeeList from "../../../components/Employee/Employee_register/EmployeeList";


export default function ViewEmpDetails() {


    const breadcrumbItems = [
        { name: 'Employees', href: '/employees' },
        { name: 'Registration', href: 'employees/registration' },
    ];


    return (
        <div className="">
            <div className=" sticky top-0 z-10">
                <Navbar/>
            </div>
            <div className="">
                <div className="grid sm:grid-cols-6 ">
                    <div className="  col-span-1 sticky top-0">
                        <SideBar/>
                    </div>

                    <div className="w-full col-span-5 flex flex-col ">
                        <EmployeeNavbar/>
                        <div className="flex flex-row ">
                            <BackButton/>
                            <Breadcrumb items={breadcrumbItems}/>

                        </div>
                        <div>
                            <EmployeeList/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}