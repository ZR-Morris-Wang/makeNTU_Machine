'use client'
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { RequestContext } from "@/context/Request";
import { AccountContext } from "@/context/Account";
import RequestCard from "./RequestCard";
// import prisma from "../../prisma/client";
import useRequest from "@/hooks/useLaserCutRequest";
import { Contrail_One } from "next/font/google";
type indRequest = {
    groupname: number
    filename: string
    material: number[]
    status: string
    comment: string
}
export default function QueueList() {
    const { requests, setRequests } = useContext(RequestContext);
    const { user } = useContext(AccountContext);
    const [ requestList, setRequestList ] = useState<indRequest[]>();
    const { getLaserCutRequest } = useRequest();
    // useEffect(() => {
    //     const fetchRequests = async () => {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch(`api/reserve`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         if (!response.ok) {
    //             console.log(response);
    //         }
    //         setRequests(data);
    //     };
    //     fetchRequests();
    // }, []);
    
    useEffect(() => {
        const gReq = async () => {
            try{
                const requestListInit = await getLaserCutRequest();
                const requestListJson:indRequest[] = requestListInit["dbresultReq"];
                console.log(requestListJson)
                setRequestList(requestListJson);
            }
            catch(e){
                console.log(e);
            }
        }
        gReq();
    },[]);
    const testRequest = {
        group: "team1",
        filename: "test1",
        type: "3DP",
        status: "waiting",
    };
    const testUser1 = {
        name: "team1", 
        permission: "contestant",
    }
    const testUser2 = {
        name: "team2", 
        permission: "contestant",
    }

    return (
        <>
        <div className="m-2 relative flex flex-col items-center justify-start">
            <div className="max-h-[50vh] w-1/2 flex flex-col items-center justify-start bg-white rounded border-2 border-black overflow-y-auto">
                <div className="w-full sticky top-0 bg-white z-10">
                    <div className="g-4 w-full flex flex-row items-center justify-between border-b-2 border-black">
                        <p className="text-sm">預約組別</p>
                        <p className="text-sm">檔案名稱</p>
                        <p className="text-sm">使用板材</p>
                        <p className="text-sm">列印狀態</p>
                        <p className="text-sm">備註</p>
                        {/* By tim_2240 Maybe use a table?*/}
                    </div>
                </div>
                {/* <RequestCard information={testRequest} isSender={testRequest.group === testUser1.name}/>
                <RequestCard information={testRequest} isSender={testRequest.group === testUser2.name}/> */}
                {/* {requests.map((request) => {
                    if (request.status !== "finished") {
                        return (
                            <RequestCard
                                key={request.id}
                                information={request}
                                isSender={request.group === user?.name}
                            />
                        )}
                    return null;
                })} */}
                {
                    requestList?.map((request)=>(
                        <RequestCard information={{
                            group:String(request.groupname),
                            filename:request.filename,
                            material:request.material,
                            status:request.status,
                            comment:request.comment

                        }}></RequestCard>
                        )
                    )
                }
            </div>
        </div>
        </>
    )
}