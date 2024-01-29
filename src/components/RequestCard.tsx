import React from "react";
import { Tab, TableCell } from "@mui/material";
import TableRow from "@mui/material";

export type RequestCardProps = {
    information: {
        group: string;
        filename: string;
        material: number[];
        status: string;
        comment: string;
    };
    isSender?: boolean;
};

export default function RequestCard({ information, isSender }: RequestCardProps) {
    const materialList = ["3mm密集板","5mm密集板","3mm壓克力","5mm壓克力"]
            {/* <div
            className={`g-4 w-full h-12 flex items-center justify-between border-black border-b-2 ${
                isSender ? "bg-yellow-200" : ""
            }`}
        >
            <p className="text-lg font-bold">{information?.group}</p>
            <p className="text-lg font-bold">{information?.filename}</p>
            <p className="text-lg font-bold">{materialList[information?.material[1]]}</p>
            <p className="text-lg font-bold">{information?.status}</p>
            <p className="text-lg font-bold">{information?.comment}</p>
        </div> */}
    return (
        <>
            <TableRow>
                <TableCell>{information?.group}</TableCell>
                <TableCell>{information?.filename}</TableCell>
                <TableCell>{materialList[information?.material[1]]}</TableCell>
                <TableCell>{information?.status}</TableCell>
                <TableCell>{information?.comment}</TableCell>
            </TableRow>
        </>
    )
}