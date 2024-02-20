'use client'
import React from "react";
import { useRouter } from "next/navigation";
import LaserCutQueueListForAdmin from "@/components/LaserCutQueueListForAdmin";
import ThreeDPQueueListForAdmin from "@/components/ThreeDPQueueListForAdmin";
import LaserCutMachineList from "@/components/LaserCutMachineList";
import ThreeDPMachineList from "@/components/ThreeDPMachineList";
import Map from "@/components/Map";

export default function admin() {
    const router = useRouter();

    // const handleSave = () => {
    // }

    return (
        <>
            <Map />
            
            <div className="m-2 h-[90vh] flex items-top justify-start">
                <LaserCutQueueListForAdmin/>
                
                <div className="h-9/10 w-1/2 m-2 flex flex-col items-center justify-top">
                    <div className="w-full h-1/2 flex flex-col items-center justify-top">
                        <LaserCutMachineList index={1}/>
                        <LaserCutMachineList index={2}/>
                    </div>
                </div>
            </div>

            <div className="m-2 h-[90vh] flex items-top justify-start">
                <ThreeDPQueueListForAdmin/>
                <div className="h-9/10 w-1/2 m-2 flex flex-col items-center justify-top">
                    <div className="w-full h-1/2 flex flex-row items-center justify-top">
                        <ThreeDPMachineList index={1}/>
                        <ThreeDPMachineList index={2}/>
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-top">
                        <ThreeDPMachineList index={3}/>
                        <ThreeDPMachineList index={4}/>
                    </div>
                    <div className=" g-4 w-full flex flex-row items-end justify-end">
                        <button
                            className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => router.push("/")}
                        >登出</button>
                    </div>
                </div>
            </div>
        </>
    )
}