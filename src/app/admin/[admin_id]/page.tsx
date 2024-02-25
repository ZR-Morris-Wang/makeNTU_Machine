'use client'
import React from "react";
import { useRouter } from "next/navigation";
import LaserCutQueueListForAdmin from "@/components/LaserCutQueueListForAdmin";
import ThreeDPQueueListForAdmin from "@/components/ThreeDPQueueListForAdmin";
import LaserCutMachineList from "@/components/LaserCutMachineList";
import ThreeDPMachineList from "@/components/ThreeDPMachineList";
import Map from "@/components/Map";
import useAdmin from "@/hooks/useAdmin";

export default function admin() {
    const router = useRouter();

    // const handleSave = () => {
    // }

    return (
        <>
            <Map />
            
            <LaserCutQueueListForAdmin/>
            <div className="h-7"></div>
            <div className="flex w-full justify-center content-start">
                <div className="flex w-4/5 justify-center">
                    <LaserCutMachineList index={1}/>
                    <LaserCutMachineList index={2}/>
                </div>
            </div>
            <div className="h-7"></div>
            <ThreeDPQueueListForAdmin/>
            <div className="h-7"></div>
            <div className="flex w-full justify-center content-start">
                <div className="flex w-4/5 justify-center">
                    <ThreeDPMachineList index={1}/>
                    <ThreeDPMachineList index={2}/> 
                </div>
            </div>
            <div className="h-5"></div>
            <div className="flex w-full justify-center content-start">
                <div className="flex w-4/5 justify-center">
                    <ThreeDPMachineList index={3}/>
                    <ThreeDPMachineList index={4}/> 
                </div>
            </div>
            <div className="h-9/10 w-1/2 m-2 flex flex-col items-center justify-top">
                <div className=" g-4 w-full flex flex-row items-end justify-end">
                    <button
                        className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => router.push("/")}
                    >登出</button>
                </div>
            </div>
        </>
    )
}