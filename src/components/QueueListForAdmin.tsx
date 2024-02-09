'use client'
import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { RequestContext } from "@/context/Request";
import { AccountContext } from "@/context/Account";
import RequestCardForAdmin from "./RequestCardForAdmin";
import CommentDialog from "./CommentDialog";
import useRequest from "@/hooks/useLaserCutRequest";
import Status from "@/components/Status"

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { FormControl, TableHead, TableRow } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type indRequestForAdmin = {
    id: number
    groupname: number
    machine: number
    filename: string
    material: number[]
    finalMaterial: string
    status: string
    comment: string
}

export default function QueueListForAdmin() {
    const { requests } = useContext(RequestContext);
    const { user } = useContext(AccountContext);
    const [ requestList, setRequestList ] = useState<indRequestForAdmin[]>();
    const { getLaserCutRequest, putLaserCutRequestMachine,
    putLaserCutRequestMaterial, putLaserCutRequestStatus } = useRequest(); 
    const testRequest = {
        filename: "test1",
        type: "3DP",
        comment: "test1",
        status: "waiting",
    };
    const Button = require('@mui/material/Button').default
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [dialogString, setDialogString] = useState("");
    
    useEffect(() => {
        const gReq = async () => {
            try{
                const requestListInit = await getLaserCutRequest();
                const requestListJson:indRequestForAdmin[] = requestListInit["dbresultReq"];
                console.log(requestListJson)
                setRequestList(requestListJson);
            }
            catch(e){
                console.log(e);
            }
        }
        gReq();
    },[]);
    
    const handleMaterialChange = async (id: number, newFinalMaterial: string) => {
        try{
            await putLaserCutRequestMaterial({
                id,
                newFinalMaterial
            })
            console.log("successful test3")
        }catch(e){
            console.error(e);
        }
    }

    const handleMachineChange = async(id: number, newMachine: number) => {
        try{
            await putLaserCutRequestMachine({
                id,
                newMachine
            })
            console.log("successful test3")
        }catch(e){
            console.error(e);
        }
    }

    return (
        <>
        {/* <div className="m-2 max-h-[90vh] w-1/2 flex flex-col items-center justify-start bg-white rounded border-2 border-black overflow-y-auto">
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
            })} 
        </div> */}

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                </TableHead>
                <TableBody>
                    <TableRow key="head">
                        <TableCell>預約組別</TableCell>
                        <TableCell>檔案名稱</TableCell>
                        <TableCell>使用機台</TableCell>
                        <TableCell>板材志願序</TableCell>
                        <TableCell>最終板材</TableCell>
                        <TableCell>列印狀態</TableCell>
                        <TableCell>備註</TableCell>
                    </TableRow>
                    {
                        requestList?.map((request)=>(
                            // <RequestCard information={{
                            //     group:String(request.groupname),
                            //     filename:request.filename,
                            //     material:request.material,
                            //     status:request.status,
                            //     comment:request.comment

                            // }}></RequestCard>
                        <TableRow key={request.id}>
                            <TableCell>{String(request.groupname)}</TableCell>
                            <TableCell>{request.filename}</TableCell>
                            
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">機台編號</InputLabel>
                                        <Select
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            defaultValue={String(request.machine)}
                                            label="機台編號"
                                            onChange={(e)=>{handleMachineChange(request.id, Number(e.target.value));}}>
                                            <MenuItem value={0}>未安排</MenuItem>
                                            <MenuItem value={3}>已完成</MenuItem>
                                            <MenuItem value={1}>{Number(1)}</MenuItem>
                                            <MenuItem value={2}>{Number(2)}</MenuItem>
                                        </Select>
                                </FormControl>
                            </TableCell>

                            <TableCell sx={{whiteSpace:"pre"}}>{request.material.map(
                                (mat)=>(<p className={request.material.indexOf(mat)===0?"text-red-400":""}>{(request.material.indexOf(mat)+1)+'. '+mat}</p>))}</TableCell>
                            
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">板材種類</InputLabel>
                                        <Select
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            defaultValue={request.finalMaterial}
                                            label="板材種類"
                                            onChange={(e)=>{handleMaterialChange(request.id,e.target.value as string);}}
                                            >   
                                            {request.material.map((eachMaterial)=>(<MenuItem value={eachMaterial}>{eachMaterial}</MenuItem>))}
                                        </Select>
                                </FormControl>
                            </TableCell>

                            <TableCell><Status id={request.id} isAdmin={false} initialState="pending"></Status></TableCell>
                            <TableCell>
                                <Button onClick={()=>{setCommentDialogOpen(true); setDialogString(request.comment)}}>{request.comment}</Button>    
                            </TableCell>
                        </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <CommentDialog open={commentDialogOpen} comment={dialogString} onClose={() => setCommentDialogOpen(false)}/>
        </>
    )
}