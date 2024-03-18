import React from "react";
import { Link } from 'react-router-dom';

import SideBar from "../../../components/SideBar";
import Navbar from "../../../components/utility/Navbar";
import CropNavigation from "../../../components/cropManagement_home/CropNavigation";
import RotationList from "../../../components/cropManagement_home/RotationList";

export default function ViewRotation() {
    return (
        <div className="">
            <div className="border-b sticky top-0 z-10">
                <Navbar/>
            </div>
            <div className="">
                <div className="grid sm:grid-cols-7">
                    <div className="col-span-1 sticky left-0 top-0 z-20">
                        <SideBar/>
                    </div>
                    <div className="z-20">
                        <CropNavigation/>
                    </div>
                    <div className="">
                        <RotationList/>
                    </div>
                </div>
            </div>
        </div>
    );
};