'use client'
import React, { useContext } from "react";
import { RequestContext } from "@/context/Request";
import { AccountContext } from "@/context/Account";
import RequestCardForAdmin from "./RequestCardForAdmin";

export default function QueueListForAdmin() {
    const { requests } = useContext(RequestContext);
    const { user } = useContext(AccountContext);
    
    const testRequest = {
        filename: "test1",
        type: "3DP",
        comment: "test1",
        status: "waiting",
    };

    return (
        <>
        <div className="m-2 max-h-[90vh] w-1/2 flex flex-col items-center justify-start bg-white rounded border-2 border-black overflow-y-auto">
            <div className="w-full sticky top-0 bg-white z-10">
                <div className="g-4 w-full flex flex-row items-center justify-between border-b-2 border-black">
                    <p className="ml-1 text-sm">檔案名稱</p>
                    <p className="text-sm">列印類型</p>
                    <p className="text-sm">列印備註</p>
                    <p className="text-sm">有問題？</p>
                </div>
            </div>
            <RequestCardForAdmin information={testRequest} />
            {/* {requests.map((request) => {
                if (request.status === "waiting") {
                    return (
                        <RequestCardForAdmin
                            key={request.id}
                            information={request}
                        />
                    )}
                    return null;
            })} */}
        </div>
        </>
    )
}