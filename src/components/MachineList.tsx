import React, { useContext } from "react";
import RequestCardForMachine from "./RequestCardForMachine"
import { RequestContext } from "@/context/Request";
import prisma from "../../prisma/client";
export type MachineListProps = {
    index: number;
}

export default async function MachineList({ index }: MachineListProps) {
    const { requests } = useContext(RequestContext);
    // const requestList = await prisma.request.findMany();
    const testRequest = {
        filename: "test1",
        type: "3DP",
        comment: "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
        status: "waiting",
    };

    return (
        <>
        <div className="m-1 w-1/2 h-full flex flex-col">
            <h3 className="text-2xl font-bold">機器{index}</h3>
            <div id={`machine${index}`} className="min-h-60 flex flex-col items-center justify-start bg-white rounded border-2 border-black overflow-y-auto">
                <div className="w-full sticky top-0 bg-white z-10">
                    <div className="g-3 w-full flex flex-row items-center justify-between border-b-2 border-black">
                        <p className="text-sm">檔案名稱</p>
                        <p className="text-sm">列印備註</p>
                        <p className="text-sm">完成列印</p>
                    </div>
                </div>
                <RequestCardForMachine information={testRequest}/>
                {/* {requests.map((request) => {
                    if (request.number === index)   {
                        return (
                            <RequestCardForMachine information={request}/>
                        )
                    } else {
                        return null;
                    }
                })} */}
                {/* {
                    requestList.map((request)=>(
                        <RequestCardForMachine information={{
                            filename:request.filename,
                            type:request.type,
                            comment:"temp",//request.comment,
                            status:request.status
                        }}></RequestCardForMachine>
                        )
                    )
                } */}
            </div>
        </div>
        </>
    )
}