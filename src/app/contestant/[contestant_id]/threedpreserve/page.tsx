"use client"
import React, { useState, useRef, useContext } from "react";
import InputArea from "@/components/ui/InputArea";
import { useRouter, usePathname } from "next/navigation";
import { AccountContext } from "@/context/Account";
import { RequestContext } from "@/context/Request";
import useLaserCutRequest from "@/hooks/useLaserCutRequest";
import { Checkbox } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useThreeDPRequest from "@/hooks/useThreeDPRequest";
export default function reserve() {
    const { user } = useContext(AccountContext);
    const { sendRequest } = useContext(RequestContext);
    const fileRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const [type, setType] = useState("");
    const [filename, setFilename] = useState("");
    const [comment, setComment] = useState("");
    const [falseTitle, setFalseTitle] = useState(false);
    const [tooLong, setTooLong] = useState(false);
    const [NoteTooLong, setNoteTooLong] = useState(false);
    const [unselected, setUnselected] = useState(false);
    const [material, setMaterial] = useState([""]);
    const [loadBearing, setLoadBearing] = useState(false);
    const { postThreeDPRequest } = useThreeDPRequest();
    const group = "team1";
    // if(user?.permission!=='admin' && user?.permission!=='contestant'){
    //     if(!tooLong) {
    //         alert("Please login first!");
    //         setTooLong(true);
    //     }
    //     router.push('/');
    // }
    
    const handleSubmit = async () => {
        if(type === "") {
            setUnselected(true);
            return;
        } else {
            setUnselected(false);
        } if(!filename) {
            setFalseTitle(true);
            return;
        } else {
            setFalseTitle(false);
        } if(filename.length > 15) {
            setTooLong(true);
            return;
        } else {
            setTooLong(false);
        } if(comment.length > 60) {
            setNoteTooLong(true);
            return;
        }
        const pathTemp = pathname.split("/");
        const group = pathTemp[2];
        // try {
        //     sendRequest(request);
        // } catch (error) {
        //     alert("Sorry, something rong happened. Please try again later.");
        //     console.log(error);
        //     return;
        // }
        
        try{
            await postThreeDPRequest({
                group,
                filename,
                loadBearing,
                material,
                comment,
            })
        }catch(error){
            alert("Sorry, something rong happened. Please try again later.");
            console.log(error);   
        }
        
        
        // router.push(`/contestant/${group}`);
    }
    
    return (
        <div className="m-2 p-3 text-lg flex flex-col items-center justify-center justify-between">
            
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold w-1/4 text-right">隊伍編號：</p>
                <InputArea
                    editable={false}
                    value={group}
                    />
            </div>
            
            <div className="flex items-end w-2/6 h-5" />
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold flex-end w-1/4 text-right">機台類型：</p>
                <select 
                    className="p-1 h-8 border-black border-2 text-gray-800 rounded-lg bg-white focus:outline-none"
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    defaultValue="">
                    <option value="">--Select--</option>
                    <option value="3DP">3D列印機</option>
                    <option value="LCM">雷射切割機</option>
                </select>
            </div>
            
            <div className="flex items-end w-2/6 h-5">
                {unselected && <p className="ml-20 w-3/4  pl-5 text-sm text-red-500 ">請選擇借用機台類型</p>}
            </div>

            
            <div className="m-3 mb-0.5 w-2/6 flex items-center gap-2">
                <p className="font-bold w-1/4 text-right">檔案名稱：</p>
                <InputArea
                    ref={fileRef}
                    placeHolder={"file name"}
                    editable={true}
                    value={filename}
                    onChange={(e) => setFilename(e)}
                />
            </div>

            <div className="flex items-end w-2/6 h-5">
                {falseTitle && <p className="ml-20 w-3/4 pl-5 text-sm text-red-500">請輸入檔案名稱</p>}
                {tooLong && <p className="ml-20 w-3/4 pl-5 text-sm text-red-500">檔案名稱不可超過15字</p>}
            </div>
            <Checkbox onClick = {()=>setLoadBearing((prev) => (!prev))}></Checkbox>需要支撐
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">使用材料</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        defaultValue=""
                        label="使用材料"
                        onChange={(e)=>{setMaterial([(e.target.value)]);}}>
                        <MenuItem value={"PLA"}>PLA</MenuItem>
                        <MenuItem value={"others"}>others</MenuItem>
                    </Select>
            </FormControl>

            <div className="m-3 mb-0.5 w-2/6 flex gap-2">
                <p className="font-bold w-1/4 text-right">備註：</p>
                <textarea
                    ref={noteRef}
                    className="resize-none p-1 border-2 text-gray-800 border-black rounded-lg focus:border-gray-600 focus:outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <div className="flex items-end w-2/6 h-5">
                {NoteTooLong && <p className="ml-20 w-5/6 pl-5 text-sm text-red-500">備註不可超過60字</p>}
            </div>

            <div className="m-2 flex gap-2">
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={() => router.back()}
                >取消</button>
                <button
                    className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={handleSubmit}>登記</button>
            </div>

        </div>
    )
}