import React from "react";

export type RequestCardProps = {
    information: {
        group: string;
        filename: string;
        type: string;
        status: string;
    };
    isSender?: boolean;
};

export default function RequestCard({ information, isSender }: RequestCardProps) {
    return (
        <>
        <div
            className={`g-4 w-full h-12 flex items-center justify-between border-black border-b-2 ${
                isSender ? "bg-yellow-200" : ""
            }`}
        >
            <p className="text-lg font-bold">{information?.group}</p>
            <p className="text-lg font-bold">{information?.filename}</p>
            <p className="text-lg font-bold">{information?.type}</p>
            <p className="text-lg font-bold">{information?.status}</p>
        </div>
        </>
    )
}