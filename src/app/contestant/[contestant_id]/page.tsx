"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import LaserCutQueueListForContestant from "@/components/LaserCutQueueListForContestant";
import ThreeDPQueueListForContestant from "@/components/ThreeDPQueueListForContestant"
import Map from "@/components/Map";

export default function contestant() {
    const router = useRouter();
    const pathname = usePathname();
    console.log();
    return (
        <>
        <Map />
        <LaserCutQueueListForContestant/>
        <ThreeDPQueueListForContestant/>
        <div className="h-full m-2 flex flex-col items-center justify-center">
            <div className="flex flex-row justify-between">
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push("/")}
                >登出</button>
            </div>
        </div>
        </>
    )
}