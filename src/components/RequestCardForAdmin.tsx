import React, { useState } from "react";
import CommentDialog from "./CommentDialog";

export type RequestCardProps = {
    information: {
        filename: string;
        type: string;
        comment: string;
        status: string;
    };
};

export default function RequestCard({ information }: RequestCardProps) {
    const [ dialogOpen , setDialogOpen ] = useState(false);
    
    const setRequestDead = () => {
    }

    return (
        <>
        <div className="g-4 w-full h-12 flex items-center justify-between bg-white border-2 border-black">
            <p className="ml-2 text-lg font-bold">{information?.filename}</p>
            <p className="ml-4 text-lg font-bold">{information?.type}</p>
            <button
                className="ml-4 w-12 h-full hover:bg-gray-200"
                onClick={() => setDialogOpen(true)}
            >
                <p className="text-lg font-bold whitespace-no-wrap overflow-hidden overflow-ellipsis">{information?.comment}</p>
            </button>
            <button
                className="m-3 bg-white text-black hover:text-white hover:bg-red-600 rounded border-black border-2"
                onClick={() => setRequestDead()}
            >
                <p className="text-sm">dead</p>
            </button>
        </div>
            
        <CommentDialog open={dialogOpen} comment={information.comment} onClose={() => setDialogOpen(false)}/>
        </>
    )
}